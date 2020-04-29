import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ImpotService } from './impot.service';
import { Observable, of } from 'rxjs';
import {
  Impot,
  ImpotResult,
  TranchesParAnnee,
  Tranche,
} from './impot.interface';
import { ApiBody } from '@nestjs/swagger';
import { ImpotCalculatorDto } from './impot.dto';

@Controller('impot')
export class ImpotController {
  constructor(private readonly impotService: ImpotService) {}

  @Post('calculImpot')
  calculImpot(@Body() impotDto: ImpotCalculatorDto): Observable<ImpotResult> {
    console.log(impotDto);
    return of(this.impotService.calculImpot(impotDto));
  }

  @Get('allTranches')
  findAllTranchesImpositions(): Observable<TranchesParAnnee> {
    return of(this.impotService.getAllTranches());
  }

  @Get('tranches/:annee')
  findOne(@Param('annee') annee: number): Observable<Tranche[]> {
    return of(this.impotService.getTranchesByAnnee(annee));
  }
}
