
const User = require("../models/user.model");
const passport = require('passport')
const bcrypt = require("bcrypt");



function authController() {


    return {


        async postRegister(req, res,next) {
            const { name, email, password } = req.body;
      
            /*** validate request ***/
      
            if (!name || !email || !password) {
              /* 
                     if any error occurs but some fields are filled already 
                     then we can flash back only correct data 
                  */
             // res.json("error", "All fields are required");
              req.flash("name", name), 
              req.flash("email", email);
              return res.json({ msg :"All fields are required" ,status:501});
            }
      
            // check if email exists
      
            User.exists({ email: email }, (err, result) => {
              if (result) {
                //res.json("error", "Email already taken");
                //req.flash("name", name), req.flash("email", email);
                return res.json({msg:"This Mail is taken"});
              }
            });
      
            const hashPassword = await bcrypt.hash(password, 10); // hash password
      
            // Create a user
      
            const user = new User({
              // since both are same so we can write only name instead of name : name
      
              name,
              email,
              password: hashPassword,
            });
      
            user
              .save()
              .then(() => {
                //login
                return res.json({ msg :"User is registered successfully " , status:200});
              })
              .catch((err) => {
                req.flash("error", "Something went Wrong");
                return res.json({ msg:"something went wrong" , err});
              });
      
          },

        postLogin(req, res, next) {
            const { email, password }   = req.body

           // Validate request 
            if(!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    return res.status(501).json(err);
                }
                if(!user) {
                    req.next('error', info.message )
                    return res.status(500).json(info);
                }
                req.logIn(user, (err) => {
                    if(err) {
                      return res.status(501).json(err);
                    }
        
                    return res.status(200).json({msg:'You have Login Successfully'})
                })
            })(req, res, next)
        },
        
        logout(req, res) {
            req.logout()
            return res.redirect('/login')  
          }

    }
    



}


module.exports = authController;