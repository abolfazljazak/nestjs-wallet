import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'src/config/typeorm.config';
@Module({
  imports: [TypeOrmModule.forRoot(TypeOrmConfig()), UserModule, WalletModule],
})
export class AppModule {}
