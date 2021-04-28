const user = require('../models/user.model');
const hashPass = require('../middleware/encryptPass');
const authentication = require("../middleware/authentication");

exports.getUsers = (req, res, next) => {
    user.find({}, { __v: false }).then(users => {
        res.status(200).json(users)
    }).catch(error => {
        res.status(500).json(error)
    })
}

exports.getUser = (req, res, next) => {
    user.find({ username: req.params.username }, { __v: false }).then(userData => {
        res.status(200).json(userData[0])
    }).catch(error => {
        res.status(500).json(error)
    })

}

exports.addUser = (req, res, next) => {
    hashPass.CreateCipherPass(req.body.password).then(encPass => {
        var userData = new user({ username: req.body.username, name: req.body.name, password: encPass, email: req.body.email, phone: req.body.phone, gender: req.body.gender });
        userData.save().then(userData => {
            authentication.createToken({ email: userData.email, username: userData.username })
                .then(token => {
                    res.status(200).json({ success: true, token: token })
                })
                .catch(() => {
                    res.status(200).json({ success: true, msg: "User Created but must be sigin" })
                })

        }).catch(error => {
            res.status(500).json({ msg: error["message"], success: false })
        })

    }).catch(error => {
        res.status(500).json({ msg: error["message"], success: false })
    })

}

exports.updateUser = (req, res, next) => {
    var userData = new user({ _id: req.body._id, username: req.body.username, name: req.body.name, password: req.body.password, email: req.body.email, phone: req.body.phone, gender: req.body.gender });
    user.findOneAndUpdate({ _id: req.body._id }, { $set: userData }).then(userData => {
        res.status(200).json({ success: true })
    }).catch(error => {
        res.status(500).json({ msg: error["message"], success: false })
    })
}

exports.isAdmin = (req, res, next) => {
    if (req.headers["x-auth-token"] != undefined) {
        authentication.checkToken(req.headers["x-auth-token"]).then(result => {
            if (result.username == 'admin') {
                res.status(200).json({ success: true, isAdmin: true });
            } else {
                res.status(200).json({ success: true, isAdmin: false });
            }
        }).catch(error => {
            res.status(500).json({ success: false, msg: "Invalid Authentication" });
            return;

        });

    } else {
        res.status(500).json({ success: false, msg: "Please Send x-auth-token" });
        return;
    }
}


exports.deleteUser = (req, res, next) => {
    user.findOneAndRemove({ _id: req.body._id }).then(userData => {
        res.status(200).json({ success: true })
    }).catch(error => {
        res.status(500).json({ msg: error["message"], success: false })
    })
}

exports.login = (req, res, next) => {
    user.findOne({ username: req.headers["username"] }, { __v: false }).then(userData => {
        //console.log(userData);
        if (userData != null) {
            // res.status(200).json({ success: true });
            hashPass.comparePasswords(userData.password, req.headers["password"]).then(result => {
                //console.log(result);
                if (result == true) {
                    authentication.createToken({ email: userData.email, username: userData.username })
                        .then(token => {
                            res.status(200).json({ success: true, token: token })
                        })
                        .catch(() => {
                            res.status(200).json({ success: false, msg: "Please Resign" })
                        })
                }
                else {
                    res.status(200).json({ success: false, msg: "UserName/Password Incorrect" })
                }
            }).catch(result => {
                res.status(200).json({ success: false, msg: "UserName/Password Incorrect" })
            })
        }
        else {
            res.status(200).json({ success: false, msg: "username not registered" })
        }
    }).catch(error => {
        res.status(500).json({ success: false, msg: "username not registered " });
    })

}
