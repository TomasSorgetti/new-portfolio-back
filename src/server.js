const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require('helmet');
const router = require("./routes/router");
const config = require("./config/config");
const { models } = require("./models/index.db");

const server = express();
const port = config.port || 8000;

// Middlewares
server.use(cors(
//   {
//   origin: 'http://example.com', // Permitir solo solicitudes de este dominio
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir solo estos métodos HTTP
//   allowedHeaders: ['Content-Type'] // Permitir solo estos encabezados
// }
));

//! Security middlewares production
server.use(helmet.hidePoweredBy()); // para que no sepan que se utiliza express
server.use(helmet.noSniff()); // Evita que los navegadores intenten adivinar el tipo de contenido
server.use(helmet.frameguard({ action: 'deny' })); // Protege contra ataques de clickjacking configurando el encabezado X-Frame-Options. 
server.use(helmet.xssFilter()); // Habilita el filtro de XSS en navegadores compatibles.
server.use(helmet.hsts({
    maxAge: 31536000, // 1 año
    includeSubDomains: true,
    preload: true
})); // Configura Strict-Transport-Security para forzar el uso de HTTPS.
server.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://trusted.cdn.com"],
        styleSrc: ["'self'", "https://trusted.cdn.com"],
        imgSrc: ["'self'", "data:", "https://trusted.cdn.com"]
    }
})); // Configura la política de seguridad del contenido (CSP) para controlar qué recursos pueden cargarse en tu aplicación.
server.use(helmet.referrerPolicy({ policy: 'no-referrer' })); // Configura el encabezado Referrer-Policy para controlar la información de referencia enviada en las solicitudes.
server.use(helmet.crossOriginOpenerPolicy({ policy: 'same-origin' })); // Configura el encabezado Cross-Origin-Opener-Policy para proteger la apertura de ventanas emergentes.
server.use(helmet.crossOriginResourcePolicy({ policy: 'same-origin' })); // Configura el encabezado Cross-Origin-Resource-Policy para proteger los recursos de solicitudes de otros orígenes.
server.use(helmet.expectCt({
    maxAge: 86400, // 1 día
    enforce: true
})); // Configura el encabezado Expect-CT para proteger contra ataques de falsificación de certificados.
//! End of Security middlewares production



server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Routes
server.use("/api", router);
server.use("/api/health", (req, res) => res.sendStatus(200));

// Middleware para manejar los errores
server.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: true,
    status: statusCode,
    message: err.message,
  });
});

models.sequelize
  .sync({ force: false })
  .then(() => {
    server.listen(port, () => {
      console.log(`- - - - - - - - - - - - - - -`);
      console.log(`Server listening on port ${port}`);
      console.log(`- - - - - - - - - - - - - - -`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  });
