import jwt from 'jsonwebtoken';
const JWT_SECRET = "emotionsPayload!@"
const fetchUser = (req, res, next) => {
    //get the user from the jwt token and add 'id' to the reqeust
    const token = req.header('auth-token');
    if (!token) {
        return res.send(401).json({ error: "Please authenticate using a valid token." });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.send(401).json({ error: "Please authenticate using a valid token." });
    }

}
export default fetchUser;