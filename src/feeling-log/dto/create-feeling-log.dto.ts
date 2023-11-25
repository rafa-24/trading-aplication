import { User } from "src/entity/user.entity";

export class CreateFeelingLogDto {
    fecha: Date;
    estado_emocional: string;
    antes_tradear: boolean;
    despues_tradear: boolean;
    contenido: string;
    user: User;
}
