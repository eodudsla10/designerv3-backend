import { sql, poolPromise } from '../config/sql.js';
import fs from 'fs/promises';

const jsonFilePath = './config/designer.meta.json';

const readJsonFile = async () => {
  try {
    const data = await fs.readFile(jsonFilePath, 'utf-8');
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    throw error;
  }
};

const SCENARIO_PAGE_REAL_TIME = async (req, res, next) => {
  try {
    const pool = await poolPromise; // 데이터베이스 연결을 나타내는 pool 객체를 얻음
    console.log('Connected to MSSQL'); // 연결이 성공적으로 이루어졌는지 확인하기 위한 로그

    // pool 객체를 통해 request 메서드 호출하여 실제 쿼리 실행
    const result = await pool.request()
      .input('A', sql.Numeric, '2')
      .query('select * from SCENARIO_PAGE');

    res.send(result);
  } catch (err) {
    console.log('에러 발생:', err); // 에러 로그 출력
    res.status(500).send(err.message);
  }
};

const META_DATE = async (req, res, next) => {
  try {
    const jsonData = await readJsonFile();
    res.json(jsonData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


const ctrl = { SCENARIO_PAGE_REAL_TIME, META_DATE };

export { ctrl };