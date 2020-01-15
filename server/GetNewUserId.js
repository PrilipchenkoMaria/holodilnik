const bcrypt = require("bcryptjs");

module.exports = {
    getNewUserId,
    checkUserEmail,
};

async function checkUserEmail(db, email) {
    return await db.collection("users").findOne({email: email});
}

async function getNewUserId(db, login, email, password) {
    const hashPassword = await hashPass(password);
    const user = await db.collection("users").insertOne({
        username: login,
        email: email,
        password: hashPassword,
    });
    return user.insertedId;
}

async function hashPass(password) {
    return bcrypt.hash(password, 10);
}
