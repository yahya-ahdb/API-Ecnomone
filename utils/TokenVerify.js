const jwt = require("jsonwebtoken");
const { createError } = require("../utils/createError");

// exports.verifyToken = (req, res, next) => {
//   const authHeader = req.headers.token;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.JWT_SEC, (err, user) => {
//       if (err) res.status(403).json("Token is not valid!");
//       req.user = user;
//       next();
//     });
//   } else {
//     return res.status(401).json("You are not authenticated!");
//   }
// };

exports.verifyUser = (req, res, next) => {
  const Authorization = req.headers.authorization;
  if (Authorization) {
    const token = Authorization.split(" ")[1]
    
    jwt.verify(token, process.env.JWT_SEC, (err, decodedToken) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = decodedToken;
    if (decodedToken.id === req.params.id || decodedToken.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
}
};

exports.verifyAdmin = (req, res, next) => {
  const Authorization = req.headers.authorization;
  if (Authorization) {
    const token = Authorization.split(" ")[1]
    jwt.verify(token, process.env.JWT_SEC, (err, decodedToken) => {
      if (err) return next(createError(403, "Token is not valid!"));
      req.user = decodedToken;
      // next();
      console.log(decodedToken.isAdmin);
      if (decodedToken.isAdmin) {
        req.user =decodedToken
        next();
      } else {
        return next(createError(403, "You are not authorized!"));
      }
    });
  }
};