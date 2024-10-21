const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const register = async (req, res) => {
    try{
        const {username, password, role} = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({username, password: hashedPassword, role})
        await newUser.save()
        res.status(201).json(`User registered successfully with username ${username}`)
    } catch(err){
        res.status(500).json("Something went wrong")
    }
}

const login = async (req, res) => {
    try{
        const { username, password } = req.body
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json(`User with username ${username} not found`)
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json("Invalid credentials")
        }

        const token = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        res.status(200).json({token})
    } catch (err){
        res.status(500).json("Something went wrong")
    }
}

module.exports = {
    register,
    login
}