const bcrypt = require("bcryptjs");
const shortid = require("shortid");

module.exports = {
    getNewUserId,
    checkUserEmail,
};

async function checkUserEmail(db, email) {
    return db.get("users").find({email}).value();
}

async function getNewUserId(db, login, email, password) {
    const hashPassword = await hashPass(password);

    const userId = shortid.generate();

    db.get("users")
        .push({
            id: userId,
            username: login,
            email: email,
            password: hashPassword,
        })
        .write();
    return userId;
}

async function hashPass(password) {
    return bcrypt.hash(password, 10);
}
