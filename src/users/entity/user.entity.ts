import { EmotionalLog } from 'src/entity/emotionalLog.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({name:'user'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ nullable: false })
  pais: string;

  @Column({ nullable: false })
  correo: string;

  @Column({ nullable: false })
  telefono: string;

  @Column({ nullable: false })
  mercado_financiero: string;

  @Column({ nullable: false })
  tipo_de_trader: string;

  @Column({ nullable: false })
  nombre_usuario: string;

  @Column({ nullable: false })
  contraseña: string;

  @Column({ type: 'text', nullable: true})
  foto_perfil: string;

  @Column({ type: 'varchar', nullable: true})
  descripcion_usuario: string;

  // Relacion uno a muchos
  @OneToMany(() => EmotionalLog, emotionalLog => emotionalLog.user)
  emotionalLog: EmotionalLog[];
}

    
