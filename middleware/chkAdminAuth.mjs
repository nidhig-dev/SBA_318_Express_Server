//This function checks if the user is a admin from the query parameter "role" in the url.
//If the user is not a admin, that route is denied to the user.
export function roleAuth() {
    let role;
    return (req, res, next) => {
            //console.log(req.query.role,req.body.role);
            if(typeof req.query?.role==="undefined"&&typeof req.body?.role==="undefined"){
                role="";
            }
            else{
             role = (req.query["role"] || req.body.role || " ").toLowerCase();
            }
            // check role 
            if (role == "admin") {
                // role matches, continue to the route handler
                console.log("Welcome Admin!");
                next();
            }
            else {
                console.log("Permission denied");
                const err = new Error("Permission Denied.You need to be an admin!");
                err.status = 403;
                next(err);
            }
        //} 
    };
}
