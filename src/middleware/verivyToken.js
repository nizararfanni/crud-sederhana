import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log("ini headers", req.headers);
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.sendStatus(401).json({
      message: "unauthrozation",
    });

  //verivfy token
  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = decode;
    console.log("isian decode",decode);

    next();
  } catch (error) {
    return res.status(403).json({ error: "Token tidak valid atau expired" });
  }
};
