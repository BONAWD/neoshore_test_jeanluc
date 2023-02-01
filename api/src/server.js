const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const useRoutes = require('./routes/index')
const app = express();
dotenv.config();
const port = process.env.PORT || 5001;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    title: 'noeshore',
    status: 'App is working success',
  });
});
app.use('/api', useRoutes);
app.listen(port, () => console.log('app liste on port: ', port));