export interface AuthTokenResult {
    id:             number;
    nombre_usuario: string;
    iat:            number;
    exp:            number;
}

export interface ValidateToken {
    id:             number;
    nombre_usuario: string;
    isExpired: boolean;
}
