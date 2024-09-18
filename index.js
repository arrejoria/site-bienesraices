import express from "express"; // detalle importante, las dependencias o archivos que se instalan no requieren extension ej .js
import csrf from "csurf";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"; // Los archivos que se crean en la app si lo requieren al importarse
import propertiesRoutes from "./routes/propertiesRoutes.js"; // Los archivos que se crean en la app si lo requieren al importarse
import db from "./config/db.js";
import { cookie } from "express-validator";

//crear app
const app = express();

// Conexion a la db
try {
  await db.authenticate();
  db.sync();
  console.log("Conexion realizada con la base de datos");
} catch (error) {
  console.error(error);
}

// Habilitar la lectura de datos en formormularios
app.use(express.urlencoded({ extended: true }));

// Habilitar Cookie Parser
app.use(cookieParser());

// Habilitar CSRF
app.use(csrf({ cookie: true }));

// Habilitar Pug
app.set("view engine", "pug");
app.set("views", "./views");

// Public Folder
app.use(express.static("public"));

// Routing (middleware)
app.use("/auth", userRoutes);
app.use("/", propertiesRoutes);

// Middleware to handle page not found
app.use((req, res, next) => {
  res.status(404).render("httpStates/404", { pageTitle: "404 Not Found", message: "Lo sentimos, la pagina que estás buscando no existe" });
});

// Middleware to handle server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("httpStates/500", { pageTitle: "500 ERROR", message: "Lo sentimos, ha ocurrido un problema en el servidor. Ya estamos trabajando en una solución" });
});
// Definir un puerto y arrancar el proyecto
const port = process.env.BACKEND_PORT || 3000;
const backendUrl = process.env.BACKEND_URL;
app.listen(port, () => {
  console.log(
    `El servidor esta funcionando en el puerto ${backendUrl}:${port}`
  );
});
