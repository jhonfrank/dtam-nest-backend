import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UnitsModule } from './context/inventory/units/units.module';
import { CurrenciesModule } from './context/inventory/currencies/currencies.module';
import { CategoriesModule } from './context/inventory/categories/categories.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: process.env.DB_TYPE as any,
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: !!process.env.DB_SYNC,
        }),
        UnitsModule,
        CurrenciesModule,
        CategoriesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
