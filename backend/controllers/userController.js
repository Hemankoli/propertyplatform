const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');

exports.register = async (req, res) => {
    const {name, email, password, confirmPassword} = req.body;
    if(password !== confirmPassword) return res.status(400).json({message: "Passwords do not match"});
    try {
        const existingUser = await UserModel.findOne({ email })
        if(existingUser) return res.status(400).json({message: "User already exists"});
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({ name, email, password: hashPassword });
        await newUser.save();
        return res.status(201).json({message: "User Registered Successfully!", user: newUser})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error Registering User' });       
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await UserModel.findOne({ email });
        if(!user) return res.status(400).json({message: "User Not Registered"});
        const passwordMatched = await bcrypt.compare(password, user.password);
        if(!passwordMatched) return res.status(401).json({message: "Please Enter Correct Password or Email!"});
        const token = jwt.sign({user_id: user?._id, role: user.role }, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('token', token, {httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000});
        return res.status(200).json({message: "Login Successful", user: {id: user._id, name: user.name, email: user.email, role: user.role}, token})
    } catch (error) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.logout = async (req, res) => {
    return res.clearCookie('token').json({success: true, message: "Logout Successfully!"})
}


exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        return res.status(200).json(users) 
    } catch (error) {
        return res.status(400).json({message: "Failed To Get Users!"})
    }
}