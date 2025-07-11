import { IsOptional, IsIn, IsDateString } from 'class-validator';

export class SearchUserFilterDTO {
  @IsOptional()
  @IsIn(['pending', 'approved', 'rejected'])
  permission?: 'pending' | 'approved' | 'rejected';

  @IsOptional()
  @IsDateString()
  date?: string; // formato ISO: '2025-07-01'
}
