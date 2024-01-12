import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });

const config = {
    server: process.env.DB_DEV_SERVER,
    port: parseInt(process.env.DB_DEV_PORT, 10),
    options: { encrypt:false, database: process.env.DB_DEV_DATEBASE},
    authentication:{
        type:"default",
        options:{
            userName:process.env.DB_DEV_USERNAME,
            password:process.env.DB_DEV_PASSOWRD
        }
    }
};

//방법1. 변수화
// const poolPromise = new sql.ConnectionPool(config)
//   .connect()
//   .then(pool => {
//     console.log('Connected to MSSQL');
//     return pool;
//   })
//   .catch(err => {
//     console.log('Database Connection Failed! Bad Config:', err);
//     throw err;
//   });

//방법2. IIFE(즉시 실행 함수 표현식)
  const poolPromise = (async () => {
    try {
      const pool = await new sql.ConnectionPool(config).connect();
      console.log('Connected to MSSQL');
      return pool;
    } catch (err) {
      console.log('Database Connection Failed! Bad Config: ', err);
      throw err;
    }
  })();

export { sql, poolPromise };