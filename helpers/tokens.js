import jwt from "jsonwebtoken";

const generarJwt = datos => jwt.sign( {id: datos.id}, 'process.env.JWT_SECRET',{ expiresIn: '1d' });
const generateId = () => Math.random().toString(32).substring(2) + Date.now().toString(32);



export {
    generarJwt,
    generateId
}