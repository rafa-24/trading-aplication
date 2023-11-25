export interface UserEmotionalLog {
    id:               number;
    fecha:            Date;
    estado_emocional: string;
    antes_tradear:    boolean;
    despues_tradear:  boolean;
    contenido:        string;
}
