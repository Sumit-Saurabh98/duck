import { User } from "@prisma/client";
import JWT from "jsonwebtoken"
import { JWTUser } from "../interfaces";

class JWTService{

    public static generateTokenForUser(user: User){
        const payload: JWTUser = {
            id: user?.id,
            email: user?.email
        }

        return JWT.sign(payload, process.env.JWT_SECRET!, {expiresIn: "7d"})
    }

    public static decodeToken(token: string){
        try {
            return JWT.verify(token, process.env.JWT_SECRET!) as JWTUser;
        } catch (error) {
            return null;
        }
    }
}

export default JWTService;