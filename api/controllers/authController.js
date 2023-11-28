const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const {models}=require('../models/index')

module.exports = {
 
    async test(req,res){
     res.status(200).json('is ok')
    },

    async register(req, res) {

        try {
            const { email, password ,name,mobile } = req.body;
            // Check user enters all fields
            if (!email || !password) return res.status(400).json({ message: "Please provide email and password" });
            // Check the user enters the right formatted email
            const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(email) === false) return res.status(400).json({ message: "Incorrect email format" });
            // Check user password length is more than 8 characters
            if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters long" });

            // create new User object to be saved in Database
        
            // Check if user already exist
            const user = await models.User.findOne({where:{email:email}})
            if (user) return res.status(400).json({ message: "Email already registered. Please Login" });
            const newUser = await models.User.create({email:email,password:password,name:name,mobile:mobile});

            let {role}=newUser;
            // Generate Password Hash
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) throw err;
                    // Add hashed password to new user object
                    newUser.password = hash;
                    //Save user to DB
                    req.body.role?newUser.role=req.body.role:newUser.role=role
                    // create json web token and send it back to client side
                   const token= jwt.sign({ email:email}, config.development.JWT_SECRET, { expiresIn: "1d" });
                    console.log(token);
                    newUser.token=token;
                   const user= await newUser.save();
                    res.json({
                       newUser:user

                    })

                })
            });

        } catch (err) {
            throw err;
        }
    },

    async login(req, res) {

        

        // return;
        // {
        //     "driver_id": 1,
        //     "vehicle_id": 1,
        //     "line": "12",
        //     "floor": "31",
        //     "stock_id":1,
        //     "product_id":1,
        //     "location":"sadat abad",
        //     "floorHeight":"1",
        //     "code":"211234561111111111",
        //     "driverName":"peyman",
        //     "typeofReceiveCar":"samand",
        //     "depletionBy":"fgggg",
        //     "introductionRequirements":"fghj",
        //     "typeofUnloadingCar":"trac",
        //     "boxCountEmpty":"1",
        //     "pallet":"2",
        //     "vendorName":"bjm",
        //     "articleCode":"11111",
        //     "description":"this is message",
        //     "expirationDate":"2023-12-24T20:30:00.000Z",
        //     "production_date":"2023-11-24T20:30:00.000Z"
        //   }
        try {

            const { mobile, password } = req.body;

            // Check user enters all fields
            if (!mobile || !password) return res.status(400).json({ message: "لطفا نام کاربری و رمز عبور را وارد نمایید" });
            // Check for correct mobile
            const user = await models.User.findOne({ where: { mobile:mobile } });
            // if mobile not found
            if (!user) return res.status(400).json({ message: "لطفا نام کاربری و رمز عبور را بررسی نمایید"  })
            // if mobile found compare hashed password with incoming password
            
            // console.log({mobile})
            
            const match= bcrypt.compare(password, user.password);
            if(!match){
                res.status(400).json('پسورد درست نیست')
            }

            const token= jwt.sign({ userId:user.id }, config.development.JWT_SECRET, { expiresIn: 60 * 60 });
            user.token=token
            res.json({
                user:user
            })

        } catch (err) {
            console.log(err);
        }
    },
    // get user information
    async getUser(req, res) {
        try {
            // find user by id
            const user = await models.User.findById(req.userId)
                // return all info but password
                .select("-password");
            // send info to client
            res.json(user)
        } catch (err) {
            throw err;

        }
    }

};

