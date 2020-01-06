const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
    getUserIdByCreds,
    signToken,
    isTokenValid,
};

function getUserIdByCreds(db, email, password) {
    const user = db.get("users").find({email}).value();

    return user && checkPass(password, user.password) ? user.id : false;
}

async function signToken(id) {
    jwt.sign({id}, "secret", {expiresIn: "24h"}, function (err, token) {
        return token;
    });
}

function isTokenValid(token) {
    const verifyToken = jwt.verify(token, "secret", function (err, decoded) {
        return decoded;
    });
    return (verifyToken !== undefined);
}

async function hashPass(password) {
    await bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            return hash;
        });
    });
}

async function checkPass(password, hash) {
    await bcrypt.compare(password, hash, function (err, res) {
        return res;
    });
}

