const express = require('express');
const app = express();
const port = 3001;

const retrieveAirQuality = require('./retrieveAirQuality');

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers'
  );
  next();
});

app.get('/current', (req, res) => {
  retrieveAirQuality
    .getCurrentAQIs()
    .then((response) => {
      //   console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log('ERROR', error);
      res.status(500).send(error);
    });
});

app.get('/monitor', (req, res) => {
  console.log('ID');
  console.log(req.query.id);
  retrieveAirQuality
    .getMonitorPastAQIs(req.query.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      console.log('ERROR', error);
      res.status(500).send(error);
    });
});
app.listen(process.env.PORT);
// app.listen(port, () => {
//   console.log(`App is running on port ${port}.`);
// });
