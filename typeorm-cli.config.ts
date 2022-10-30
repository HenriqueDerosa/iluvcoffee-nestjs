import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity';
import { SchemaSync1666917064344 } from 'src/migrations/1666917064344-SchemaSync';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres', // type of our database
  host: 'localhost', // database host
  port: 5432, // database host
  username: 'postgres', // username
  password: 'pass123', // user password
  database: 'postgres', // name of our database,
  entities: [Coffee, Flavor],
  migrations: [SchemaSync1666917064344],
});
