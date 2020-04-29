import { ApiProperty } from '@nestjs/swagger';
import { Situation } from './impot.interface';

export interface ImpotResultDto {
  impotBrute: number;
  tauxImposition: number;
  nbParts: number;
}

export class ImpotCalculatorDto {
  @ApiProperty()
  salaireBrut: number;

  @ApiProperty({ enum: Situation })
  situation: Situation;

  @ApiProperty()
  nombreEnfants: number;

  @ApiProperty()
  annee: number;
}
