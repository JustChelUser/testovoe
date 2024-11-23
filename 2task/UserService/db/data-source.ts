import { config } from "dotenv"
import { DataSource, DataSourceOptions } from "typeorm"

config()
export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['dist/**/*entity.js'],
    synchronize: false,
    migrations:['dist/db/migrations/*.js'],
    logging:true,
}
const dataSource = new DataSource(dataSourceOptions);
export default dataSource