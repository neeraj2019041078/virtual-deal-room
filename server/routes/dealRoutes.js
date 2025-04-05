const express=require("express");
const router=express.Router();
const dealControl=require("../controllers/dealController");
const Protect=require("../middleware/authMiddleware");
const upload=require("../middleware/upload");
router.post("/create",Protect,upload.single('file'),dealControl.createDeal)
router.get("/deals",Protect,dealControl.getAll)
router.get("/:id/messages",Protect,dealControl.getDealMessages)
router.patch("/:id/reply",Protect,dealControl.replyToDeal)
router.put('/:id/accept', Protect, dealControl.acceptDeal);
router.put('/:id/negotiate', Protect, dealControl.negotiateDeal);
router.put('/:id/cancel', Protect, dealControl.cancelDeal);
module.exports=router;