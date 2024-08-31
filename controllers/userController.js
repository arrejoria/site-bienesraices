import { check, validationResult } from 'express-validator';
import { where, Op } from 'sequelize';
import User from '../models/User.js';
import { generateId } from '../helpers/tokens.js';
import { registerEmail, passwordLostEmail } from '../helpers/emails.js';

// Funcionalidades para el usuario
const loginForm = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'Inicia Sesión',
        loginUrl: 'auth/login'
    });
}
const registerForm = (req, res) => {
    
    res.render('auth/register', {
        pageTitle: 'Crear Cuenta',
        nonce: req.csrfToken()
    });
}

const registerUser = async (req, res) => {

    // Extraer datos con desectructuracion 
    const { firstname, lastname, email, password, repeat_password } = req.body;

    // Validacion
    await check('firstname').notEmpty().withMessage('Nombre obligatorio').run(req)
    await check('lastname').notEmpty().withMessage('Apellido obligatorio').run(req)
    await check('email').isEmail().withMessage('El formato ingresado no es de un email').run(req)
    await check('password').isLength({min: 6}).withMessage('La contraseña debe contener minimo 6 caracteres').run(req)
    await check('repeat_password').equals(password).withMessage('Las contraseñas ingresadas deben ser iguales').run(req)

    let result = validationResult(req);

    // Verificar usuarios duplicados
    const userExist = await User.findOne({ where: { email }})

    if(userExist){
        return  res.render('auth/register', {
            pageTitle: 'Crear Cuenta',
            errores: [{ msg: 'Este Email ya se encuentra registrado'}],
            user: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                repeat_password: req.body.repeat_password
            }
        });
    }

    // Verificar si hay errores en result (not empty)
    if(!result.isEmpty()){

        // Errores
        return  res.render('auth/register', {
            pageTitle: 'Crear Cuenta',
            errores: result.array(),
            user: { // Objeto user para usar en la vista
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                repeat_password: req.body.repeat_password
            },
            nonce: req.csrfToken()
        });
    }

    // Crear datos del usuario en la tabla users
    const user = await User.create({
        firstname,
        lastname,
        email,
        password,
        token: generateId()
     });

     // Enviar email para confirmar creacion de cuenta
     registerEmail({
        name: user.firstname,
        email: user.email,
        token: user.token
     });

     // Mostrar mensaje de confirmacion
     res.render('templates/mensaje', {
        pageTitle: 'Cuenta creada con exito!',
        message: `Hemos enviado un correo de confirmacion a ${email}, presiona en el enlace para confirmar tu cuenta.`
     })
}

const confirmUser =  async (req, res, next) => {
    // Obtener routing param dinamico
    const {token} = req.params;
    let message, error, pageTitle = '';

   // Verificar validez del token
    const usuario = await User.findOne({ where: {token}});
   // Confirmar creacion de cuenta
    if(!usuario){
        // Verificar si el usuario ya confirmo para evitar actualizar el registro
        pageTitle = 'Error al confirmar tu cuenta'
        message = 'Oh! Algo no salió bien. Intenta de nuevo';
        error = true;
    }else{
        usuario.token = null;
        usuario.confirmed = true;
        await usuario.save();
    
        pageTitle = 'Cuenta confirmada con exito';
        message = 'Tu cuenta se verificó con exito';
    }

  
    // Renderizar vista con un mensaje dinamico
    return res.render('auth/confirmar-cuenta', {pageTitle, message, error})
}

const passwordLost = (req, res) => {
    res.render('auth/recuperar-password', {
        pageTitle: 'Recupera tu acceso a Bienes Raices',
        nonce: req.csrfToken(),
    });
}


const recoverUserPassword = async (req, res) => {
    
    // Validar input email
    await check('email').isEmail().withMessage('Verifica que hayas ingresado el email correctamente').run(req)

    const valResults = validationResult(req);
    let errors
    // Si hay errores en la validación mostrar errores
    if(!valResults.isEmpty()){
        errors = [{msg:'El Email ingresado no es valido'}]
    }

    // Buscar usuario en la base de datos
    const user = await User.findOne({ where: {email: req.body.email}})
    
    if(!user){
        return  res.render('auth/recuperar-password', {
            pageTitle: 'Crear Cuenta',
            errors: valResults.array(),
            nonce: req.csrfToken()
        });
    }


    // Generar y almacenar token del usuario
    const token = generateId();

    user.token = token;
    await user.save();
    
    // Enviar correo para restablecer password
    passwordLostEmail({
        name: user.firstname,
        email: user.email,
        token
    });
 
    // Renderizar un mensaje
    res.render('templates/mensaje', {
        pageTitle: 'Recuperación de Password',
        message: 'Recibias un correo con las instrucciones para reestablecer tu password.',
    })

}

const checkUserToken = async (req, res) =>{

    const token = req.params.token;
    const user = await User.findOne({ where: {token} })

    // Verificar si el token es valido
    if(!user){
        return  res.render('auth/confirmar-cuenta', {
            pageTitle : 'Error al confirmar tu cuenta',
            message : 'Oh! Hubo un error al validar tu información, intenta de nuevo.',
            error : true
        });
    }

    // Mostrar formulario para modificar el password
    res.render('auth/reset-password',{
        pageTitle: 'Reestablecer Password',
        errors,
        nonce: req.csrfToken()
    })
}

const newPassword = async (req, res) => {

    const { token } = req.params;
    const { password } = req.body;

    console.log(token + ' --- ' + password)

    return;
}


export {
    loginForm,
    registerForm,
    registerUser,
    confirmUser,
    passwordLost,
    recoverUserPassword,
    checkUserToken,
    newPassword
}