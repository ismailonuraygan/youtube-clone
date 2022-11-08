import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";
const EXPIRES_IN = process.env.EXPIRES_IN || "7d"
  
export function signJWT(payload: string | Buffer | object) {
    jwt.sign(payload, JWT_SECRET, {
        expiresIn:  EXPIRES_IN
    })
}

export function verifyJWT(token: string){
    try{
        const decoded = jwt.verify(token, JWT_SECRET)

        return decoded
    }catch(err){

    }
}