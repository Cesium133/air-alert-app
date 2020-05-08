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
      // "SELECT * FROM airalert WHERE validdate + validtime = (select max(validdate + validtime ) FROM airalert) AND sitename = 'Copper View' ORDER BY aqsid",
      (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        console.log(results.rows);
        resolve(results.rows);
      }
    );
  });
};

const getMonitorPastAQIs = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT aqsid, validdate, validtime, pm25aqi, pm10aqi, ozoneaqi, no2aqi FROM airalert WHERE aqsid = '" +
        id +
        "' ORDER BY validdate + validtime",
      (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        console.log(results.rows);
        resolve(results.rows);
      }
    );
  });
};

module.exports = {
  getCurrentAQIs,
  getMonitorPastAQIs,
};
