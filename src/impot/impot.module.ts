import { Module } from '@nestjs/common';
import { ImpotController } from './impot.controller';
import { ImpotService } from './impot.service';

@Module({
  controllers: [ImpotController],
  providers: [ImpotService],
})
export class ImpotModule {}
