const allowedCors = {
  origin: [
    'domainname.students.nomoredomains.sbs',
    'http://domainname.students.nomoredomains.sbs',
    'https://domainname.students.nomoredomains.sbs',
    'api.mymesto.nomoredomains.xyz',
    'http://api.mymesto.nomoredomains.xyz',
    'https://api.mymesto.nomoredomains.xyz',
    'localhost:3000',
    'http://localhost:3000',
    'https://localhost:3000',

  ],
  credentials: true,

};


module.exports.cors = ((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;

  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('X-Server', 'test');
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
});
// const allowedCors = [
//   'http://domainname.students.nomoredomains.sbs',
//   'http://domainname.students.nomoredomains.sbs',
//   'https://api.mymesto.nomoredomains.xyz',
//   'http://api.mymesto.nomoredomains.xyz',
//   'localhost:3000',
//   'http://localhost:3000',
// ];
//
// module.exports = (req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';
//   const requestHeaders = req.headers['access-control-request-headers'];
//
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', true);
//   }
//
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.status(200).end();
//   }
//
//   next();
// };