const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    console.log(req.body)
    try {

        const { name, email, password } = req.body;

        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(409)
                .json({ message: 'User is alerady exist,you can login', success: false })
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup sucessfully",
                success: true
            })
    } catch (err) {
        console.log(err)
        res.status(500)
            .json({
                message: "internal server error",
                success: false,
                error: err
            })
    }
}
const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong'
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false })
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(403)
                .json({ message: errorMsg, success: false })
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_Token,
            { expiresIn: '24h' }
        )
        res.status(200)
            .json({
                message: "Login sucessfully",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        console.log(err)
        res.status(500)
            .json({
                message: "internal server error",
                success: false,
                error: err
            })
    }
}
module.exports = {
    signup, login
}