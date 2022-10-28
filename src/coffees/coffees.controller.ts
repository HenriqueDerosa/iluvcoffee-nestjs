import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

interface FindOneParams {
  id: string;
}

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeeServices: CoffeesService) {}
  @Get()
  async findAll(@Query() paginationQuery): Promise<Coffee[]> {
    const { limit, offset } = paginationQuery;
    // return `List of all coffees. Limit: ${limit}, offset ${offset}`;
    return await this.coffeeServices.findAll(limit, offset);
  }

  @Get(':id')
  async findOne(@Param() params: FindOneParams): Promise<Coffee> {
    const coffee = this.coffeeServices.findOne(params.id);

    if (!coffee) {
      throw new HttpException(
        `Coffee #${params.id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return coffee;
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  async create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    return await this.coffeeServices.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateCoffeeDto) {
    return this.coffeeServices.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeServices.remove(id);
  }
}
