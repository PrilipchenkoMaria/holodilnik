const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {secret} = require("../config");

module.exports = {
    getUserIdByCreds,
    signToken,
    getUserIdByToken,
};

async function getUserIdByCreds(db, email, password) {
    const user = await db.collection("users").findOne({email: email});
    if (!user) return false;
    const isPassCorrect = await checkPass(password, user.password);
    return isPassCorrect ? user._id : false;
}

async function signToken(id) {
    return jwt.sign({id}, secret, {expiresIn: "24h"});
}
async function getUserIdByToken (req){
    const token = getTokenFromReq(req);
    return await decodeToken(token);
}

function getTokenFromReq(req) {
    const {authorization} = req.headers;
    return authorization && authorization.substring(7);
}

async function decodeToken(token) {
    const verifyToken = jwt.verify(token, secret, function (err, decoded) {
        return decoded;
    });
    return (verifyToken !== undefined ? verifyToken.id : false);
}

async function checkPass(password, hash) {
    return bcrypt.compare(password, hash);
}
