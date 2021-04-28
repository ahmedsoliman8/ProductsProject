const auth = require('./authentication');
const permission = require('../models/permission.model');
class Authorization {
    static addPermission(username, url, method, res) {
        authentication.checkToken(req.headers["x-auth-token"]).then(auth => {
            if (auth.username == 'admin') {
                let permission = new permission({
                    username: username,
                    url: url,
                    method: method
                });
                permission.save().then(userDoc => {
                    return res.status(200).json({ msg: 'Permission Added Successfully', success: true });
                }).catch(err => {
                    return res.status(400).json({ msg: 'Permission Not Added', success: false, error: err });
                });

            } else {
                return res.status(401).json({ msg: 'acess Denied', success: false });
            }
        }).catch(err => {
            return res.status(500).json({ success: false, msg: "Invalid Authentication", error: err });

        });

    }

    static authorized(username, method, url, req, res, next) {
        //console.log(username);
        //console.log(method);
        //console.log(url);
        //console.log(permission);
        permission.find({
            $and: [{ $or: [{ username: username }, { username: "NormalUser" }] },
            { $or: [{ method: method }, { method: '*' }] },
            { $or: [{ url: url }, { url: '*' }] }]
        }).then(result => {
            //  console.log(result);
            if (result.length == 0) {
                return res.status(401).json({ msg: 'Unauthorizedd Method', success: false });

            } else {
                next();

            }
        }).catch(err => {
            return res.status(401).json({ msg: 'Unauthorized Method', success: false, error: err });
        });

    }


}

module.exports = Authorization;