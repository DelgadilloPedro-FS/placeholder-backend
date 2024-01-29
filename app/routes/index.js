const express = require("express");
const router = express.Router();



const user = require("./userRoutes")
const art = require("./artRoutes")

router.get("/",(req,res)=>{
    res.status(200).json({success:true, message:`${req.method} - request made`})
})

router.use("/users", user);
router.use("/arts", art)

module.exports = router;