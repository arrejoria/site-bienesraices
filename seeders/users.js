import bcrypt from 'bcrypt'

const users = [
    {
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@correos.com',
        password: bcrypt.hashSync('qweqwe123', 10),
        confirmed: 1
    }
]

export default users