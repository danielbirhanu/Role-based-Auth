const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    // Check if authorization header exists
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header not found" });
    }

    // Check if the header starts with "Bearer"
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        // Check if token exists after "Bearer"
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        try {
            // Verify the token
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            console.log("The decoded user is: ", req.user);
            next(); // Proceed to the next middleware
        } catch (err) {
            // Token verification failed
            return res.status(400).json({ message: "Invalid token" });
        }
    } else {
        // If the token does not start with "Bearer"
        return res.status(401).json({ message: "Authorization header must start with 'Bearer'" });
    }
};

module.exports = verifyToken;
