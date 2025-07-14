import { IsOptional, IsIn, IsDateString } from 'class-validator';

export class SearchUserFilterDTO {
  @IsOptional()
  @IsIn(['pending', 'approved', 'rejected'])
  permission?: 'pending' | 'approved' | 'rejected';

  @IsOptional()
  @IsDateString()
  startDate?: string; // formato ISO: '2025-07-01'

  @IsOptional()
  @IsDateString()
  endDate?: string; 

}
