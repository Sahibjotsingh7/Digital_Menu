const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "securepassword123"
};

// Admin login
const adminLogin = (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Generate JWT Token with role "admin" and 12-hour expiration
        const token = jwt.sign(
            { username: ADMIN_CREDENTIALS.username, role: "admin" }, 
            process.env.JWT_SECRET, 
            { expiresIn: "12h" }
        );

        res.status(200).json({ message: "Admin authenticated successfully", token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
};

module.exports = { adminLogin };
