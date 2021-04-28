const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let permissionSchema = new Schema({
    username: { type: String, required: true },
    method: { type: String, required: true },
    url: { type: String, required: true }
});


module.exports = mongoose.model("Permission", permissionSchema, "permissions");
