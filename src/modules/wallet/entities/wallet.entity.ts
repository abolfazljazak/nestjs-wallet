import { EntityNames } from '@common/enum/entity.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WalletType } from '../enum/wallet.enum';
import { User } from '@entities/user.entity';
import { userInfo } from 'os';

@Entity(EntityNames.Wallet)
export class Wallet {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum: WalletType })
  type: string;

  @Column()
  invoice_number: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.transaction, { onDelete: 'CASCADE' })
  user: User;
}
