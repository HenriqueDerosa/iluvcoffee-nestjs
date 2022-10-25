import { Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    return this.coffees.find((item) => item.id === +id);
  }

  create(data) {
    this.coffees.push(data);
    return data;
  }

  update(id: string, data: UpdateCoffeeDto) {
    this.coffees = this.coffees.map((item) =>
      item.id === +id ? { ...item, ...data } : item,
    );

    return this.coffees;
  }

  remove(id: string) {
    this.coffees = this.coffees.filter((item) => item.id !== +id);
    return this.coffees;
  }
}
