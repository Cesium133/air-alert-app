const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'password',
  host: 'localhost',
  port: '5433',
  database: 'airalert',
});

const getCurrentAQIs = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM airalert WHERE validdate + validtime = (select max(validdate + validtime ) from airalert) ORDER BY aqsid',
      (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const getMonitorPastAQIs = () => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT validdate, validtime, pm25aqi, pm10aqi, ozoneaqi, no2aqi FROM airalert WHERE aqsid = '330099991' ORDER BY validdate + validtime",
      (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

module.exports = {
  getCurrentAQIs,
  getMonitorPastAQIs,
};
