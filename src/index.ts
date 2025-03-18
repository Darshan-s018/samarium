import { serve } from '@hono/node-server';
import {PrismaClient} from '@prisma/client';
import { Hono } from 'hono';

const prismaClient = new PrismaClient;

await prismaClient.city.createMany({
  data: [
    {
    name : "Bangalore",
    countryCode: "572101",
    },
    {
      name: "Tumkur",
      countryCode:"572102",
    }
  ]

  });
const cities = await prismaClient.city.findMany();

console.log("Cities",cities);


// const app = new Hono();

// app.get('/', (c) => {
//   return c.json({message:"Hello, world!"},200);
// });

// serve({
//   fetch: app.fetch,
//   port: 3000
// }, (info) => {
//   console.log(`Server is running on http://localhost:${info.port}`);
// });


// const select = (parameters:{
//   tableName: string;
//   columns : string[]
// }) => {
//   const tableName = parameters.tableName;
//   const columns = parameters.columns.join(", ");

//   const sqlQuery = `SELECT ${columns} FROM ${tableName};`;
//   return sqlQuery;
// };

// const execute = (sqlQuery: string): void => {
//   const psqlCommand = `psql -U postgres -d mydb -c ${sqlQuery}`;
// };

// const sqlQuery = select({tableName: "users",columns: ["name","email"]});
// execute(sqlQuery);