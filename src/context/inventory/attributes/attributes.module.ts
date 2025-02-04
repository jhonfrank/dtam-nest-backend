import { Module } from '@nestjs/common';

import { AttributeValuesController } from './controllers/attribute-values.controller';
import { AttributesController } from './controllers/attributes.controller';
import { AttributeValuesService } from './services/attribute-values.service';
import { AttributesService } from './services/attributes.service';

@Module({
  controllers: [AttributesController, AttributeValuesController],
  providers: [AttributesService, AttributeValuesService],
})
export class AttributesModule {}
