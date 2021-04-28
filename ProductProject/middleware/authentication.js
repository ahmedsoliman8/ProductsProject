const jwt = require("jsonwebtoken");

class Authentication {
    static createToken(TokenPayloadObject) {
        return new Promise((resolve, reject) => {
            try {
                const token = jwt.sign(TokenPayloadObject, process.env.JWT_KEY, { expiresIn: "3h" });
                resolve(token);
            }
            catch (ex) {
                reject(ex);
            }

        })

    }

    static checkToken(token) {
        return new Promise((resolve, reject) => {
            try {
                const decodeToken = jwt.verify(token, process.env.JWT_KEY);
                // console.log(decodeToken);
                resolve(decodeToken);
            }
            catch (ex) {
                reject(ex);
            }

        })

    }


}

module.exports = Authentication;