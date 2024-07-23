import { register } from './register.service'

export const handleRegistration = async (credentials) => {
    try {
        await register(credentials)
    } catch (err) {
        throw new Error('Could not register')
    }
}