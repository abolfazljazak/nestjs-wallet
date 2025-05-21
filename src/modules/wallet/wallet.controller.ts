import { Body, Controller, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { DepositDto } from './dto/wallet.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('deposit')
  async deposit(@Body() depositDto: DepositDto) {
    return this.walletService.deposit(depositDto);
  }
}
