import * as jwt from "jsonwebtoken";
import { AuthTokenResult, ValidateToken } from "src/auth/interface/response/jwtInterface";

export const useToken = (token: string): ValidateToken | string => {
    try {
        const decode = jwt.decode(token) as AuthTokenResult;

        const currentDate = new Date();
        const expiredDate = new Date(decode.exp);

        return {
            id: decode.id,
            nombre_usuario: decode.nombre_usuario,
            isExpired: +expiredDate <= +currentDate / 1000
        }        
    } catch (error) {
        return 'Token invalido';        
    }
}