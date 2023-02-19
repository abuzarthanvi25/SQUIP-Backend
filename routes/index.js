let express = require("express");
let router = express.Router();
const jwt = require("jsonwebtoken");
const AuthenticationController = require("../controllers/AuthenticationController")
const ComplainController = require("../controllers/ComplainController")

let verifyToken = (request, response, next) => {
    // Get the auth header value
    const bearerHeader = request.headers["authorization"];
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
      // split at the space
      const bearer = bearerHeader.split(" ");
  
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      request.token = bearerToken;
      // Next middleware
  
      //STUB - If token is expired then also no API call will be accessible prompting for new login --> new token generation
      jwt.verify(request.token, "secretkey123", (err) => {
        if (err) {
          response.status(403).send("TOKEN EXPIRED");
          return;
        } else {
          next();
        }
      });
    } else {
      // Forbidden
      response.status(403).send("UNATHORIZED ACCESS");
    }
  };

//NOTE - TEST ROUTE
router.get("/", (req, res) => {
    res.json({
      message: "Test Route (UNPROTECTED)",
      status: true,
    });
  });

//ANCHOR - AUTH ROUTES
router.post("/api/signup", AuthenticationController.Signup)
router.post("/api/login", AuthenticationController.Login)

//ANCHOR - PLANT ROUTES
router.post("/api/complains", ComplainController.CreateComplain)
router.get("/api/complains", ComplainController.GetComplains)
router.get("/api/complains/:id", ComplainController.GetComplainById)
router.post("/api/category/complains", ComplainController.GetByCategory)
router.patch("/api/complains/:id", ComplainController.UpdateById)
router.delete("/api/complains/:id", ComplainController.DeleteConplainById)

module.exports = router;