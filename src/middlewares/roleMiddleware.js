const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // Check if the user exists in the request object
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized, no user information" });
        }

        // Check if the user's role is allowed
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied: insufficient permissions" });
        }

        // Proceed to the next middleware
        return next();
    };
};

module.exports = authorizeRoles;
