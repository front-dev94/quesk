import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import Service from './service';
import { JWT_SECRET } from '../../config/constants';
import User from './../models/User';


class AuthService extends Service {
  constructor(model) {
    super(model);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  async login(req){
    const {email, password} = req.body;
    try {
        //  Find the user by their email address
        let user = await this.model.findOne({ email });

        if (!user)
            return {
                error: true,
                statusCode: 400,
                message: "User not found!"
            }
    
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return {
                error: true,
                statusCode: 400,
                message: "Incorrect password!"
            }
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET);
        
        return {
            error: false,
            statusCode: 200,
            data: {
                user,
                token
            }
        }

    } catch (e) {
        return {
            error: true,
            statusCode: 500,
            message: e.message
        }
    }
  }

  async signUp(req, res){
    try {
        const result = await this.model.findOne({email: req.body.email});

        if (result) {
            return res.status(404).send({ error: true, message: 'User already exists.'});
        }
        else {
            // Insert the new user if they do not exist yet
            let user = await this.model.create({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                questionScore: 0,
                answerScore: 0
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);

            user.save();

            const token = jwt.sign({ _id: user._id }, JWT_SECRET);

            return {
                error: false,
                statusCode: 200,
                data: {
                    user,
                    token
                }
            }
        }
    } catch (e) {
        return {
            error: true,
            statusCode: 500,
            message: e.message
        }
    }
  }
};

export default AuthService;