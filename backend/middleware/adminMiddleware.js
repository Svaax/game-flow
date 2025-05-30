import ApiError from '../errors/ApiError.js'

const admin = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        if (req.auth.role !== 'ADMIN') {
            throw new Error('Только для администратора')
        }
        next()
    } catch (e) {
        next(ApiError.forbidden(e.message))
    }
}

export default admin