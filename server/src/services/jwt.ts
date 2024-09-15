import { User } from "@prisma/client";
import { prismaClient } from "../clients/db";
import JWT from "jsonwebtoken"

class JWTService{

    public static generateTokenForUser(user: User){
        const payload = {
            id: user?.id,
            email: user?.email
        }

        return JWT.sign(payload, process.env.JWT_SECRET!, {expiresIn: "7d"})
    }
}

export default JWTService;