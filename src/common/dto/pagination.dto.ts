import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Max, Min } from "class-validator";

export class PaginationDto {
    @Type(()=>Number)
    @IsPositive()
    @Min(1)
    @Max(300)
    @IsOptional()
    limit?:number;

    @Type(()=>Number)// Realizar una comversion
    @IsPositive()
    @Min(1)
    @IsOptional()
    page?:number
}
