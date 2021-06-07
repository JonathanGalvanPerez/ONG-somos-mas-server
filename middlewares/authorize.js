const jwt = require("express-jwt");
const secret = process.env.TOKEN_SECRET;

module.exports = authorize;

function authorize(roles = []) {
  // roles puede ser un string o un array de strings
  if (typeof roles === "number") {
    roles = [roles];
  }
  return [
    // middleware que desencriptan el auth token y lo guarda en req.user
    jwt({ secret, algorithms: ["HS256"] }),

    // autoriza en base a los roles
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.roleId)) {
        // user's role is not authorized
        return res.status(401).json({ message: "Unauthorized" });
      }

      // autenticacion y autorizacion completada!
      next();
    },
  ];
}
