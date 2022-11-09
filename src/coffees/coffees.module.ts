import { Injectable, Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
// import { DatabaseModule } from 'src/database/database.module';
import { Event } from '../events/entities/event.entity';
import { DataSource } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import coffeesConfig from './coffees.config';

@Injectable({ scope: Scope.TRANSIENT })
export class CoffeeBrandsFactory {
  constructor() {
    console.log('→ → CoffeeBrandsFactory instantiated');
  }
  async create(dataSource: DataSource): Promise<string[]> {
    const coffeeBrands = await dataSource.query('SELECT * FROM flavor');
    return await Promise.resolve(
      coffeeBrands.map((item) => ({ ...item, name: `${item.name} brand` })),
    );
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig), // partial registration \ partial configuration
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    CoffeeBrandsFactory,
    // {
    //   provide: COFFEE_BRANDS,
    //   useFactory: (factory: CoffeeBrandsFactory, dataSource: DataSource) =>
    //     factory.create(dataSource),
    //   inject: [CoffeeBrandsFactory, DataSource],
    // },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
