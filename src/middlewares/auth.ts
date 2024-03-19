import { RequestHandler } from "express";
import { createToken, validatePassword, validateToken } from '../services/auth'


export const validateLogin: RequestHandler = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(403).json({ error: "Access Denied" })
    }

    const token = req.headers.authorization.split(' ')[1];

    if (!validateToken(token)) {
        return res.status(403).json({ error: "Access Denied" })
    }

    next();
}