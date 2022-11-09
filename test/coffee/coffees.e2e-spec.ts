import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { CreateCoffeeDto } from '../../src/coffees/dto/create-coffee.dto';

describe('[Feature] Coffees - /coffees', () => {
  const coffee = {
    name: 'Shipwreck Roast',
    brand: 'Buddy brew',
    description: 'testing coffee crud',
    flavors: ['Vanilla', 'Chocolate'],
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          port: 5433,
          synchronize: true,
          autoLoadEntities: true,
        }),
        CoffeesModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    // coffeeRepository = moduleFixture.get<MockRepository>(getRepositoryToken(Coffee));
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  it('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED);
    // .then(({ body }) => {
    //   console.log({ body });
    //   const expected = jasmine.objectContaining({
    //     ...coffeesConfig,
    //     flavors: jasmine.arrayContaining(
    //       coffee.flavors.map((name) => jasmine.objectContaining({ name })),
    //     ),
    //   });
    //   expect(body).toEqual(expected);
    // });
  });
  it.todo('Get all');
  it.todo('Get one');
  it.todo('Update one');
  it.todo('Delete one');

  afterAll(async () => {
    await app.close();
  });
});
