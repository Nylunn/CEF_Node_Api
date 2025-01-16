const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

exports.checkJWT = async (req, res, next) => {
     let token = req.cookies.token;
     try {
        const user = jwt.verify(token, SECRET_KEY);
        req.user = user;
        next();
     } catch (err) {
        res.clearCookie("token");
        return res.redirect("/");
     }
    };
