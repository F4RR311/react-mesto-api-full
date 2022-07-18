const cors = require('cors');

const urlList = () => {
  const { NODE_ENV } = process.env;
  let list = [];
  if (NODE_ENV) {
    list = [
      'domainname.students.nomoredomains.sbs',
      'http://domainname.students.nomoredomains.sbs',
      'https://domainname.students.nomoredomains.sbs',
      'https://api.mymesto.nomoredomains.xyz',
      'http://api.mymesto.nomoredomains.xyz',

    ];
  } else {
    list = [
      'http://localhost:3000',
      'http://localhost:3001',
    ];
  }
  return list;
};

const allowedCors = {
  origin: urlList(),
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

module.exports = cors(allowedCors);
