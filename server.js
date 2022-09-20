import express, { application } from "express";
import connectDatabase from "./config/db";
import { check, validationResult } from "express-validator";

//initialize express application
const app = express();

//connect database
connectDatabase();

//connect middleware
app.use(express.json({ extended: false }));

// API Endpoints
/**
 * @route GET /
 * @desc Test endpoint
 */
app.get('/', (req, res) =>
  res.send('http get request sent to root api endpoint')
);

/**
 * @route POST api/users
 * @desc Register user
 */

app.post(
  '/api/users', 
  [
    check("name", "Please Enter Your Name").not().isEmpty(),
    check("email", "Please enter a valid email").not().isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 })
],
(req,res) => {
  const errors= validationResult(req);
  if (!errors.isEmpty()){
    return res.status(422).json({errors: errors.array()});
  }
  else {
    return res.send(req.body);
  }
}
);
app.post("/api/users", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

//connection listener
app.listen(3000, () => console.log("Express server running on port 3000."));
