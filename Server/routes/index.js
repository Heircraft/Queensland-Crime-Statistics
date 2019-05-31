var express = require('express');
const mysql = require('mysql');

var router = express.Router();

const options = require('../knexfile.js');
const knex = require('knex')(options);

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

router.post('/register', function(req, res, next) {
   //hashing the password
   bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
         return res.status(500).json({
            message: "failed to hash the entered password - please try again"
         })
      } else {
         //storing the users information in the database
         knex('users').insert({email:`${req.body.email}`, password:`${hash}`})
         .then((reg) => {
            res.status(201).json({
               message: "yay! you've successfully registered your user account :)"
            });
            res.send(reg);
         })
         .catch((err) => {
            if (err.code === 'ER_DUP_ENTRY') {
               res.status(400).json({
                  message: 'oops! It looks like that user already exists :('
               });
            } 
            console.log(err);
         })
      }
   })

});

router.post('/login', function(req, res, next) {
   knex.select('id','email','password').from('users').where('email','=',`${req.body.email}`)
   .then((reg) => {
      var returnedEmail = reg.map(item => item.email)
      //if an email was returned as existing in database
      if (returnedEmail.length > 0) {

         var id = reg.map(item => item.id)
         var email = reg.map(item => item.email)
         var hashPassword = reg.map(item => item.password)
         //converting values from arrays to strings
         hashPassword = hashPassword.toString()
         email = email.toString()
         id = id.toString()
         //check against the password hash in the database
         bcrypt.compare(req.body.password, hashPassword, function(err, cryptRes) {
            if (cryptRes === true) {
               console.log('its getting here')
               const user = {
                  id: id,
                  email: email,
                  password: hashPassword
               }
               console.log(id);
               console.log(email);
               console.log(hashPassword);
               jwt.sign({user: user}, 'secret', { expiresIn: 86400 }, (err, token) => {
                  res.status(200).json({
                     token: token,
                     token_type: "Bearer",
                     expires_in: "86400"
                  })
               })
            } else {
               res.status(401).json({
                  message: "invalid login - bad password"
               });
            }
        });
      } else {
         res.status(401).json({
            message: "invalid login - bad password"
         });
      }
   })
   .catch((err) => {
      console.log(err);
   })
})

//THE SEARCH ROUTE
router.get('/search', verifyToken, function(req, res, next) {
   jwt.verify(req.token, 'secret', (err, authData) => {
      console.log(req.token)
      if (err) {
         res.status(401).json({
            message: "oh no! it looks like your authorization token is invalid..."
         });
      } else {
         if (req.query.offence.length == 0) {
            res.status(400).json({
               message: "oops! it looks like you're missing the offence query parm"
            });
         }
         var queryJson = {"offence":`${req.query.offence}`};
         var offenceStr = req.query.offence
         offenceStr = offenceStr.replace(/\s/g,'')
      
         
         //essentially making "where" statements below do nothing if the query param is null
         var area = 1;
         var areaCol = 1;
         if (req.query.area != null) {
            areaCol = 'offences.area';
            area = req.query.area;
            areaStr = {"area": `${area}`}
            Object.assign(queryJson, areaStr)
         }

         var age = 1;
         var ageCol = 1;
         if (req.query.age != null) {
            ageCol = 'offences.age';
            age = req.query.age;
            ageStr = {"age": `${age}`}
            Object.assign(queryJson, ageStr)
         }

         var gender = 1;
         var genderCol = 1;
         if (req.query.gender != null) {
            genderCol = 'offences.gender';
            gender = req.query.gender;
            genderStr = {"gender": `${gender}`}
            Object.assign(queryJson, genderStr)
         }

         var year = 1;
         var yearCol = 1;
         if (req.query.year != null) {
            yearCol = 'offences.year';
            year = req.query.year;y
            yearStr = {"year": `${year}`}
            Object.assign(queryJson, yearStr)
         }

         var month = 1;
         var monthCol = 1;
         if (req.query.month != null) {
            monthCol = 'offences.month';
            month = req.query.month;
            queryJson = queryJson + `, "month":"${month}"`
            monthStr = {"month": `${month}`}
            Object.assign(queryJson, monthStr)
         }

         knex.select({LGA:'areas.area'}).sum({total: offenceStr}).select('lat','lng')
         .from('offences').leftJoin('areas','areas.area','=','offences.area')
         .where(areaCol,'=',area)
         .where(ageCol,'=',age)
         .where(genderCol,'=',gender)
         .where(yearCol,'=',year)
         .where(monthCol,'=',month)
         .groupBy('areas.area') 
      
         .then((rows) => {
               res.status(200).json({
                  "query": queryJson, "result": rows
               });
         })
         .catch((err) => {
            console.log(err);
            res.json({
               message: "didn't work"
            });
         })
      }
   })
});

//ALL THE HELPER ROUTES
 router.get('/offences', function(req, res, next) {
   knex.from('offence_columns').distinct("pretty")
      .then((rows) => {
         var data = rows.map(item => item.pretty)
         res.json({"offences": data});
      })
      .catch((err) => {
         console.log(err);
      })
});

router.get('/areas', function(req, res, next) {
   knex.from('areas').distinct("area")
      .then((rows) => {
         var data = rows.map(item => item.area)
         res.json({"areas": data});
      })
      .catch((err) => {
         console.log(err);
      })
});

router.get('/ages', function(req, res, next) {
   knex.from('offences').distinct("age")
      .then((rows) => {
         var data = rows.map(item => item.age)
         res.json({"ages": data});
      })
      .catch((err) => {
         console.log(err);
      })
});

router.get('/genders', function(req, res, next) {
   knex.from('offences').distinct("gender")
      .then((rows) => {
         var data = rows.map(item => item.gender)
         res.json({"genders": data});
      })
      .catch((err) => {
         console.log(err);
      })
});

router.get('/years', function(req, res, next) {
   knex.from('offences').distinct("year")
      .then((rows) => {
         var data = rows.map(item => item.year)
         res.json({"years": data});
      })
      .catch((err) => {
         console.log(err);
      })
});

//this is for helping with other functions
 router.get('/api/offences/:location', function(req, res, next) {
   knex.from('offences').select("*").where('area','=',req.params.location)
      .then((rows) => {
         res.json({"Error" :false, "Message" : "Success", "Offences" : rows});
      })
      .catch((err) => {
         console.log(err);
         res.json({"Error" :true, "Message" : "Error executing MySQL query"});
      })
 });


//verify token
function verifyToken(req, res, next) {
   const bearerHeader = req.headers['authorization']
   if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next()
   } else {
      res.status(401).json({
         message: "oh no! it looks like your authorization token is invalid..."
      });
   }
}
 
module.exports = router;
// var area = 1;
// var areaCol = 1;
// if (area !== null) {
//    areaCol = 'offences.area';
//    area = req.query.area;
//    queryJson = queryJson + `{area: ${area}},`
// }

// var age = 1;
// var ageCol = 1;
// if (age !== null) {
//    ageCol = 'offences.age';
//    age = req.query.age;
//    queryJson = queryJson + `{age: ${age}},`
// }

// var gender = 1;
// var genderCol = 1;
// if (gender !== null) {
//    genderCol = 'offences.gender';
//    gender = req.query.gender;
//    queryJson = queryJson + `{gender: ${gender}},`
// }

// var year = 1;
// var yearCol = 1;
// if (year !== null) {
//    yearCol = 'offences.year';
//    year = req.query.year;
//    queryJson = queryJson + `{year: ${year}},`
// }

// var month = 1;
// var monthCol = 1;
// if (month !== null) {
//    monthCol = 'offences.month';
//    month = req.query.month;
//    queryJson = queryJson + `{month: ${month}},`
// }