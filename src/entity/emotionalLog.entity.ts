import { User } from 'src/users/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'emotionalLog' })
export class EmotionalLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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
  @ManyToOne(() => User, user => user.emotionalLog)
  user: User;
}
