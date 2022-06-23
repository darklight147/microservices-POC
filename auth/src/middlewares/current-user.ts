import { NextFunction, Request, Response } from "express";
import jwtService from '../services/jwt.service'


export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    req.currentUser = null;
    
    const token = req.session!.jwt;

    if (token) {
        req.currentUser = jwtService.verify(token);
    }

    next();

}