const stats = {};  

export function countRequests(req, res, next) {
    // get full route but ignore query params
    const route = req.originalUrl.split("?")[0];     
    // Check if the route already exists in the stats object
    if (stats[route] === undefined) {
        // If this route hasn’t been seen yet, initialize its count to 0
        stats[route] = 0;
    }
    // Increment the count for this route by 1
    stats[route] = stats[route] + 1;
    // log all stats
    console.log("Request counts:", stats); 
    next(); 
}
