const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const adminAuth = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

        if (decoded.exp * 1000 < Date.now()) {
            return res.status(401).json({ message: "Unauthorized: Token has expired" });
        }

        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Forbidden: Admin access required" });
        }

        req.admin = decoded; // Attach admin info to request object
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Unauthorized: Token has expired" });
        }
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = adminAuth;
