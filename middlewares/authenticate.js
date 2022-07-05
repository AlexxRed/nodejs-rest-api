const jwt = require("jsonwebtoken");

const {User} = require("../models/user");

const {createError} = require("../services/createError");

/*
1. Извлечь из заголовков запроса заголовок authorization.
2. Разделить его на 2 слова.
3. Проверить, равно ли первое слово "Bearer".
3.1. Если нет - отправить 401 ответ.
4. Проверить, валиден ли токен.
4.1. Если нет - отправить 401 ответ.
5. Проверить, есть ли в базе пользователь с таким id.
5.1. Если нет - отправить 401 ответ.
6. Добавить в объект request найденного пользователя:
req.user = user;
7. Передать обработку дальше.
*/

const {SECRET_KEY} = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    try {
        if(bearer !== "Bearer") {
            throw createError(401);
        }
        try {
            const {id} = jwt.verify(token, SECRET_KEY);
            const user = await User.findById(id);
            if(!user || !user.token){
                throw createError(401);
            }
            req.user = user;
            next()
        } catch (error) {
            error.status = 401;
            throw error;
        }
    } catch (error) {
        next(error);
    }
}

// const authenticate = async (req, res, next) => {
//     const {authorization = ""} = req.headers;
//     const [bearer, token] = authorization.split(" ");
//     try {
//         if (bearer !== "Bearer") {
//         throw createError(401);
//         }
//         const {id} = jwt.verify(token, SECRET_KEY);
//         const user = await User.findById(id);
//         if (!user || !user.token) {
//         throw createError(401);
//         }
//         req.user = user;
//         next();
//     } catch (error) {
//         if (error.message === "Invalid signature") {
//         error.status = 401;
//         }
//         next(error);
//     }
// };

module.exports = authenticate;