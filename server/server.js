const express = require('express');
const dotenv = require('dotenv');
const router = require('../server/routes/router.js');
const app = express();
const { mongoose } = require('./models/employeemodel.js');
const cookieparser = require('cookie-parser');
dotenv.config({ path: '../server/config.env' });
const path = require('path');
app.use(cookieparser());
mongoose.connect(process.env.MONGO_URI, { dbName: 'RecruitmentDB' })
  .then(() => console.log('Database Connected!'))
  .catch(err => console.error('Database Connection Error:', err));

const dir = path.join(__dirname, '../frontend');
console.log(dir.toString());

app.use(express.static(path.join(dir, '/views')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

app.use('/joining', router);

app.get('/', (req, res) => {
  res.render(dir+'/views/html/index.ejs');
});

const PORT = process.env.PORT || 2000;
const HOST = process.env.HOST || 'localhost';
app.listen(PORT, HOST, () => console.log(`Server running on http://${HOST}:${PORT}`));