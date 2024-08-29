import express from 'express'
import userRoutes from './routes/userRoutes.js'
//crear app
const app = express();

// Habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')


// Public Folder
app.use( express.static('public'))

// Routing (middleware)
app.use('/auth', userRoutes);


// Definir un puerto y arrancar el proyecto
const port = 3000;

app.listen(port, () => {
    console.log(`E; servidor esta funcionando en el puerto ${port}`);
})