import { EntityNames } from '@common/enum/entity.enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(EntityNames.User)
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  fullname: string;

  @Column()
  mobile: string;

  @Column({ type: 'numeric', default: 0 })
  balance: number;

  @CreateDateColumn()
  created_at: Date
}
