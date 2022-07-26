const db = require("../db");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
    const { username, email, password } = req.body;
    const isExisting = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (!(isExisting.rowCount === 0)) {
        throw new BadRequestError("User already exists.");
    }
    const user = await db.query("INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING *", [username, email, password]);
    res.status(StatusCodes.CREATED).json({ user: { username: user.rows[0].username, email: user.rows[0].email } });
}

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new BadRequestError("Please provide email and password.");
    }
    const user = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    if ((user.rowCount === 0)) {
        throw new UnauthenticatedError("Invalid Credentials...");
    }
    const isPasswordCorrect = await db.query("SELECT password FROM users WHERE password = $1", [password]);
    if ((isPasswordCorrect.rowCount === 0)) {
        throw new UnauthenticatedError("Invalid Credentials...");
    }
    res.status(StatusCodes.OK).json({ user: { username: user.rows[0].username, email: user.rows[0].email } });
}

module.exports = {
    register, login
}