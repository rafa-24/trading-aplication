import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TypeTrader } from '../enum/typeTader';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  pais: string;

  @Column()
  correo: string;

  @Column()
  telefono: string;

  @Column()
  mercado_financiero: string;

  @Column()
  tipo_de_trader: TypeTrader;

  @Column()
  nombre_usuario: string;

  @Column()
  contraseña: string;
}
