const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true // ✅ Fix spelling
    },
    email: {
        type: String,
        required: true, // ✅ Fix spelling
        unique: true
    },
    password: {
        type: String,
        required: true // ✅ Fix spelling
    },
    role: {
        type: String,
        enum: ["buyer", "seller"],
        required: true // ✅ Fix spelling
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchpassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); 
};

module.exports = mongoose.model("User", userSchema);
