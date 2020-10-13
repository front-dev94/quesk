
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/constants';

const Auth = (req, res, next) => {
  //get the token from the header if present
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};

export default Auth;