const regex = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

const allowedCors = [
  'localhost:3000',
  'http://localhost:3000',
  'localhost:3001',
  'http://localhost:3001',
  'https://localhost:3001',
  'domainname.students.nomoredomains.sbs',
  'http://domainname.students.nomoredomains.sbs',
  'https://domainname.students.nomoredomains.sbs',
  'https://api.mymesto.nomoredomains.xyz',
  'http://api.mymesto.nomoredomains.xyz',
];

module.exports = {regex, allowedCors};
