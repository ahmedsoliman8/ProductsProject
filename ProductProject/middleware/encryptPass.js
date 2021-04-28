const bcrypt = require("bcrypt");
class EncryptPass {
    static CreateCipherPass(plainPass) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(plainPass, 10).then((hashPass) => {
                resolve(hashPass);
            }).catch((err) => {
                reject(err);
            })
        })
    }

    static comparePasswords(EncPass, PlainPass) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(PlainPass, EncPass).then(result => {
                if (result) {
                    return resolve(true);
                } else {
                    return reject(false);
                }
            }).catch(err => {
                return reject(err);
            })
        })
    }
}

module.exports = EncryptPass;