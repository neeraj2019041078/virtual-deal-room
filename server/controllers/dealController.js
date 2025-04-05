const Deal = require('../models/Deal');

exports.createDeal = async (req, res) => {
  try {
    if (req.user.role !== 'seller') {
      return res.status(403).json({ message: 'Only sellers can create deals.' });
    }

    const { title, description, price } = req.body;
    const file = req.file; // multer parses this

    const newDeal = new Deal({
      title,
      description,
      price,
      seller: req.user.id,
      status: 'Pending',
      filePath: file ? file.path : null // Store file path if file uploaded
    });

    await newDeal.save();
    res.status(201).json({ message: 'Deal created successfully', deal: newDeal });

  } catch (error) {
    console.error('❌ Error creating deal:', error);
    res.status(500).json({ message: 'Failed to create deal', error: error.message });
  }
};

exports.getAll=async(req,res)=>{
    try{
        const deals=await Deal.find().populate('seller buyer','username');
        res.status(201).json({deals})

    }
    catch(err){
        res.status(401).json({message:"Unable to Get Deals"})

    }
}

exports.acceptDeal=async(req,res)=>{
    try{
        const deal=await Deal.findById(req.params.id);
        if(!deal || !deal.status=='Pending'){
            return res.status(400).json({message:"Invalid Deal or AlReady Procced Deal"})
        }
        deal.buyer=req.user.id;
        deal.status="Completed";
        await deal.save();
        res.json({ message: 'Deal accepted successfully', deal });

    }
    catch(err){
        console.error(error);
    res.status(500).json({ message: 'Failed to accept deal' });

    }
}
exports.negotiateDeal = async (req, res) => {
    try {
      const { content } = req.body;
      const deal = await Deal.findById(req.params.id);
  
      if (!deal) return res.status(404).json({ message: 'Deal not found' });
  
      deal.status = 'In Progress';
      deal.messages.push({
        sender: req.user.id,
        content,
        type: 'price',
      });
  
      await deal.save();
      res.json({ message: 'Negotiation updated', deal });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to negotiate deal' });
    }
  };
  
  exports.cancelDeal = async (req, res) => {
    try {
      const deal = await Deal.findById(req.params.id);
      if (!deal) return res.status(404).json({ message: 'Deal not found' });
  
      deal.status = 'Cancelled';
      await deal.save();
  
      res.json({ message: 'Deal cancelled', deal });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to cancel deal' });
    }
  };
  exports.getDealMessages=async(req,res)=>{
    try{
        const deal=await Deal.findById(req.params.id).populate({
            path: 'messages.sender',
            select: 'username role'
          });
        if (!deal) return res.status(404).json({ message: 'Deal not found' });
        if (
            req.user.id !== deal.seller.toString() &&
            req.user.id !== (deal.buyer?.toString() || '')
          ) {
            return res.status(403).json({ message: 'Not authorized to view messages' });
          }
      
          res.status(200).json({ messages: deal.messages });

    }
    catch(error){
        console.error(error);
    res.status(500).json({ message: 'Failed to fetch messages', error: error.message });
    }
  }
  exports.replyToDeal = async (req, res) => {
    try {
      const deal = await Deal.findById(req.params.id);
      if (!deal) return res.status(404).json({ message: 'Deal not found' });
  
      if (req.user.role !== 'seller' || req.user.id !== deal.seller.toString()) {
        return res.status(403).json({ message: 'Only the seller of this deal can reply' });
      }
  
      const { content, newPrice } = req.body;
  
      if (!content) {
        return res.status(400).json({ message: 'Message content is required' });
      }
  
      // Add seller reply to messages
      deal.messages.push({
        sender: req.user.id,
        content,
        type: 'price' // or 'text'
      });
  
      // Optionally update price
      if (newPrice) {
        deal.price = newPrice;
      }
  
      await deal.save();
  
      res.status(200).json({
        message: 'Reply sent',
        updatedPrice: newPrice || deal.price,
        deal
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to send reply', error: error.message });
    }
  };