const stats = {};  // store stats in memory

export function countRequests(req, res, next) {
    // get full route but  ignore query params
    const route = req.originalUrl.split("?")[0]; 

    // If route not seen before, initialize with 0
    stats[route] = (stats[route] || 0) + 1;

    console.log("Request counts:", stats);  // log all stats

    next(); // pass control to the next middleware or route handler
}
