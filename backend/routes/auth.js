import express from 'express';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fetchUser from '../middleware/fetchUser.js';
const router = express.Router();
const JWT_SECRET = "emotionsPayload!@"
const isStrongPassword = (value) => {//function to check if password is strong or not. Lifted straight from gpt.
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!regex.test(value)) {
        throw new Error('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number.');
    }
    return true;
};
// Define routes


//ROUTE 1
//create a user using POST on "/api/auth/createUser". No login required to perform this 
router.post('/createUser', [
    //middleware for inpu validation
    body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').custom(isStrongPassword)
], async (req, res) => {
    
    let success = false;
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) { //means some error occured so send the status code 400 along with the error
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        console.log(req.body);//just for us to see 
        //extract all fields
        let name = req.body.name;
        let email = req.body.email;
        let user = await User.findOne({ email: email });//check if user with that email id exists in our database or not
        if (user) {
            return res.status(400).json({ success, error: 'Email is already taken.' });//means person with that email already exists
        }
        let password = req.body.password;
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with the hashed password
        user = new User({ name: name, email: email, password: hashedPassword });
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        console.log(authtoken);
        await user.save();
        success = true;
        return res.json({ success, authtoken });//this means user got saved successfully so you can send status code 200 
    }
    catch (err) { //means error occured 
        console.log(err);
        return res.status(500).send('Internal server error.')
    }

});


//ROUTE 2
//authenticate a user using POST on "/api/auth/login". No login required to perform this
router.post("/login", [body('email').isEmail().withMessage('Enter a valid email'),
body('password').exists().withMessage('Password cannot be blank!')
], async (req, res) => {
    let success = false;
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) { //means some error occured so send the status code 400 along with the error
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        const { email, password } = req.body;//destructure the email and password from request's body
        let user = await User.findOne({ email: email });//check if user with that email id exists in our database or not
        if (!user) {
            console.log('hey');
            return res.status(404).json({ success, err: "Invalid credentials" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);//checking if password matches or not
        if (!isPasswordMatch) {//means password doesn't match!
            return res.status(404).json({ success, error: "Invalid credentials" }) //send invalid credentials message
        }
        //means credentials are correct!
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        console.log(authtoken);
        return res.json({ success, authtoken ,name:user.name});//this means user got saved successfully so you can send status code 200 
    }
    catch (err) {//means some error occured!
        console.log(err);
        return res.status(500).send('Internal server error.')
    }
});

//ROUTE 3
//get logged in user details using POST on "/api/auth/getuser". Login required to perform this!
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        console.log(req);
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        return res.send(user);

    } catch (error) {
        //means some error occured!
        console.log(error);
        return res.status(500).send('Internal server error.')
    }
})


export default router;
