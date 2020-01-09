const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
    getUserIdByCreds,
    signToken,
    getUserIdByToken,
};

async function getUserIdByCreds(db, email, password) {
    const user = db.get("users").find({email}).value();
    if (!user) return false;
    const isPassCorrect = await checkPass(password, user.password);
    return isPassCorrect ? user.id : false;
}

async function signToken(id) {
    return jwt.sign({id}, "secret", {expiresIn: "24h"});
}

async function getUserIdByToken(token) {
    const verifyToken = jwt.verify(token, "secret", function (err, decoded) {
        return decoded;
    });
    return (verifyToken !== undefined ? verifyToken.id : false);
}

async function hashPass(password) {
    await bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            return hash;
        });
    });
}

async function checkPass(password, hash) {
    return bcrypt.compare(password, hash);
}
