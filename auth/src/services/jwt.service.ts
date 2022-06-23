import jwt from 'jsonwebtoken';
import { envVars } from '../config/env.config';

export type ROLE = "admin" | "visitor";

interface Payload {
    username: string;
    id: string;
    roles: string[]
}

class JwtService {

    constructor(private options: jwt.SignOptions & jwt.VerifyOptions) {

    }

    public sign(payload: Payload) {
        return jwt.sign(payload, envVars.JWT_SECRET, {
            ...this.options
        });
    }

    public verify(token: string) {
        try {
            return jwt.verify(token, envVars.JWT_SECRET, {
                ...this.options
            }) as Payload;
        } catch (error) {
            return null;
        }
    }
}

export default new JwtService({
    expiresIn: "15m"
});

