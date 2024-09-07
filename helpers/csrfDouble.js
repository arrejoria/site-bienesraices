
import { doubleCsrf } from "csrf-csrf";


const doubleCsrfUtilities = doubleCsrf({
    getSecret: () => "Secret", // A function that optionally takes the request and returns a secret
    cookieName: "__Host-psifi.x-csrf-token", // The name of the cookie to be used, recommend using Host prefix.
    cookieOptions: {
      sameSite: "lax",  // Recommend you make this strict if posible
      path: "/",
      secure: true,
    },
    size: 64, // The size of the generated tokens in bits
    ignoredMethods: ["GET", "HEAD", "OPTIONS"], // A list of request methods that will not be protected.
    getTokenFromRequest: (req) => req.headers["x-csrf-token"], // A function that returns the token from the request
  });


  const {
    invalidCsrfTokenError, // This is just for convenience if you plan on making your own middleware.
    generateToken, // Use this in your routes to provide a CSRF hash + token cookie and token.
    validateRequest, // Also a convenience if you plan on making your own middleware.
    doubleCsrfProtection, // This is the default CSRF protection middleware.
  } = doubleCsrf(doubleCsrfUtilities);


  export {
    doubleCsrfProtection,

  }