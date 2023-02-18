import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import UserModal from '../models/User.js'

/* REGISTER USER */
export const signup = async (req, res) => {
    const {
        email,
        password,
    } = req.body;
    try {
        
        console.log(req.body);

        const oldUser = await UserModal.findOne({ email });

        if (oldUser) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new UserModal({
            email,
            password: passwordHash,
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        
        console.log(req.body);

        const oldUser = await UserModal.findOne({ email });

        if (!oldUser) return res.status(400).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign(
            { email: oldUser.email, id: oldUser._id }, 'test', 
            { expiresIn: '1h'},
        )
        res.status(200).json({ result: oldUser, token})

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}