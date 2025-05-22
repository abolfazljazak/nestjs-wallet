import { Wallet } from '@entities/wallet.entity';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { DepositDto, WithdrawDto } from './dto/wallet.dto';
import { User } from '@entities/user.entity';
import { WalletType } from './enum/wallet.enum';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
    private userService: UserService,
    private dataSource: DataSource,
  ) {}

  async deposit(depositDto: DepositDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { fullname, mobile, amount } = depositDto;
      const user = await this.userService.createUser({ mobile, fullname });
      const userData = await queryRunner.manager.findOneBy(User, {
        id: user.id,
      });

      if (!userData) {
        throw new Error('User not found');
      }

      const newBalance = userData.balance + amount;

      await queryRunner.manager.update(
        User,
        { id: user.id },
        { balance: newBalance },
      );

      await queryRunner.manager.insert(Wallet, {
        amount,
        type: WalletType.Deposit,
        userId: userData.id,
        invoice_number: Date.now().toString(),
      });

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error);
    } finally {
      await queryRunner.release();
    }
  }

  async pyamentByWallet(withdrawDto: WithdrawDto) {
    const { productId, userId } = withdrawDto;
    const product = productList.find((p) => p.id === productId);
    if (!product) throw new NotFoundException('Product not found');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOneBy(User, {
        id: userId,
      });
      if (!user) throw new NotFoundException('User not found');
      if (product.price > user.balance)
        throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);

      const newBalance = user.balance - product.price;

      await queryRunner.manager.update(User, { id: userId }, { balance: newBalance });
      await queryRunner.manager.insert(Wallet, {
        amount: product.price,
        type: WalletType.Withdraw,
        userId,
        productId,
        reason: `Payment for ${product.name}`,
        invoice_number: Date.now().toString(),
      });
      await queryRunner.commitTransaction();

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }

    return {
      message: "payment order successfully"
    }
  }
}
