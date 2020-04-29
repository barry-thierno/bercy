import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImpotModule } from './impot/impot.module';

@Module({
  imports: [ImpotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
