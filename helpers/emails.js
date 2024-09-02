import nodemailer from "nodemailer";

const registerEmail = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const {name, email, token} = datos;
  const tokenUrl = `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT ?? 3000}/auth/confirmacion/${token}`

  await transport.sendMail({
    from: 'Bienes Raices',
    to: email,
    subject: 'Confirma tu nueva cuenta en Bienes Raices',
    text: 'Confirma tu cuenta en Bienes Raices',
    html: `
    <p>Hola ${name}, tu cuenta fue creada con exito!</p>

    <p>Ingresa al siguiente enlace para confirmar tu nueva cuenta en nuestro sitio: <a href="${tokenUrl}">confirmar cuenta</a></p>

    <p>Si no fuiste vos quien creo esta cuenta puedes ignorar este mensaje.</p>
    `
  })

  console.log(datos)
};


const passwordLostEmail = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const {name, email, token} = datos;
  const tokenUrl = `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}/auth/recuperar-password/${token}`

  await transport.sendMail({
    from: 'Bienes Raices',
    to: email,
    subject: 'Restablecer Password de tu cuenta en Bienes Raices',
    text: 'Restablecer Password de tu cuenta en Bienes Raices',
    html: `
    <p>Hola ${name}, más abajo encontrarás el enlace para reestablecer tu cuenta.</p>

    <p>Ingresando al siguiente enlace podrás reestablecer el password de tu cuenta en nuestro sitio: <a href="${tokenUrl}">Restablecer Password</a></p>

    <p>Si no solicitaste reestablecer el password puedes ignorar este mensaje.</p>
    `
  })

}

export { registerEmail, passwordLostEmail };
