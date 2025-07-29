import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader?.split(" ")[1];
  // console.log("token", token);
  
  if (!token)
    return res.status(401).json({
      message: "unauthrozation",
    });

  //verivfy token
  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN);
    console.log("isian decode", decode);
    req.user = decode;

    next();
  } catch (error) {
    console.error("JWT Verify Error:", error.message);
    return res.status(403).json({ error: error.message });


  }
};
