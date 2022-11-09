import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';

interface FindOneParams {
  id: string;
}

@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeeServices: CoffeesService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    console.log('REQUESTED > ', request.url);
    console.log('→ → CoffeesController created');
  }

  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<Coffee[]> {
    return await this.coffeeServices.findAll(paginationQuery);
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
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCoffeeDto: CreateCoffeeDto): Promise<Coffee> {
    return await this.coffeeServices.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) body: UpdateCoffeeDto) {
    return this.coffeeServices.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeeServices.remove(id);
  }
}
