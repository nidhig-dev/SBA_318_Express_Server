//This function checks if the user is a admin from the query parameter "role" in the url.
//If the user is not a admin, that route is denied to the user.
export function roleAuth() {
    return (req, res, next) => {
        // check role from query string for get,patch,update methods or from body if post method
        const role = (req.query["role"] || req.body.role||"").toLowerCase();
            if (role == "admin") {
                // role matches, continue to the route handler
                next();
            }
            else {
                const err = new Error("Permission Denied");
                err.status = 403;
                next(err);
            }
        
    };
}
