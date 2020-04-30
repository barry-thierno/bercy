import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ImpotModule } from './impot/impot.module';

@Module({
  imports: [ImpotModule],
  providers: [AppService],
})
export class AppModule {}
