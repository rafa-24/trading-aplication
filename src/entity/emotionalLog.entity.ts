import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/entity/user.entity';

@Entity({name: 'emotionallog'})
export class EmotionalLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  fecha: Date;

  @Column({ type: 'varchar', nullable: false })
  estado_emocional: string;

  @Column({ type: 'boolean', nullable: true })
  antes_tradear: boolean;

  @Column({ type: 'boolean', nullable: true })
  despues_tradear: boolean;

  @Column({ type: 'text', nullable: false })
  contenido: string;

  // relacion muchos a uno
  @ManyToOne(() => User, (user) => user.emotionalLog)
  @JoinColumn({ name: 'user_id' }) 
  user: User;
}
