import { PartialType } from '@nestjs/mapped-types';
import { CreateBatchStateDto } from './create-batch-state.dto';

export class UpdateBatchStateDto extends PartialType(CreateBatchStateDto) {}
