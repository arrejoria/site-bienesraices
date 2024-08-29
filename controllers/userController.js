// Funcionalidades para el usuario

const loginForm = (req, res) => {
    res.render('auth/login', {
        pagina: 'Inicia Sesión',
        loginUrl: 'auth/login'
    });
}
const registerForm = (req, res) => {
    res.render('auth/register', {
        pagina: 'Crear Cuenta',
        registerUrl: 'auth/recuperar-password'
    });
}

const passwordLost = (req, res) => {
    res.render('auth/recuperar_password', {
        pagina: 'Recupera tu acceso a Bienes Raices',
        passwordLostUrl: 'auth/recuperar-password'
    });
}

export {
    loginForm,
    registerForm,
    passwordLost
}