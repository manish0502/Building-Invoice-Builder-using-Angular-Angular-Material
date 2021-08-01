const express= require('express');
const connectDB = require('../config/db');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const session = require('express-session'); 
const flash = require('express-flash');
var logger = require('morgan')
var passport = require('passport');


// Connect Database
connectDB();

// Intialize Middleware
app.use(logger('dev'))

app.use((error , req, res , next) =>{
    res.status(error.status || 500);
    return res.json({
        error:{
            message:error.message,
        }
    })
   next();
})
app.use(cors({
    origin: ['http://localhost:4200'],
    credentials:true
}));

app.use(session({

    name:'myname.sid',
    secret: 'keyboard',
    resave: false,
    saveUninitialized:false,
    cookie:
        {
            maxAge: 1000 * 60 * 60 * 24 ,
            httpOnly: false,
            secure: false

        }

}))


/*********************** Passport Configration ************************************/


const passportInit = require('../passport/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

/*********************** Using Flash as middleware ********************************/

app.use(flash());


app.use(bodyParser.json());
app.use(express.json({extended : false}));


app.get('/',(req , res)=>{
    res.send('API Running');
})

// Define Routes
 app.use('/api', require('.././routes/invoice'))
// app.use('/api/profile', require('./routes/api/profile'))
// app.use('/api/posts', require('./routes/api/posts'))


//Defing Port 
const PORT = process.env.PORT || 5000;

app.listen(PORT ,()=>{
    console.log(`server started on port ${PORT}`)
});