
const express =require("express");
const authController=require("../controllers/authControllers");
const protect=require("../middleware/authMiddleware")
const router=express.Router();
router.post("/regi",authController.register);
router.post("/logi",authController.login);
router.get("/profile", protect, (req, res) => {
    res.json({ message: "Profile data", user: req.user });
});



module.exports=router;