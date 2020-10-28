//Add your frontend url as a string to the whitelist to enable security
var whitelist = []; //ADD FRONTEND URL, NETLIFY
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.length === 0) {
      callback(null, true);
    } else {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
};

module.exports = corsOptions