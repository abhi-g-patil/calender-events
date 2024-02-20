const createError = require('http-errors');
var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
 
// display user page
router.get('/get', function(req, res, next) {
    dbConn.query('SELECT * FROM events ORDER BY id desc',function(err,rows) {
        if(err) {
            res.send({error: err});   
        } else {
            // render to views/users/index.ejs
            res.send(rows);
        }
    });
});
 
// display user page
router.post('/add', function(req, res, next) {
    let { title, start, end } = req.body;

    if(!title || !start || !end) {
        return res.status(400).send({ error: 'title/Dates are required.' });
    }

    var form_data = { title, start, end };
    
    // insert query
    dbConn.query('INSERT INTO events SET ?', form_data, function(err, result) {
        if (err) {
            res.send({ error: err })
        } else {
            res.status(200).send({ success: 'Event successfully added', event: result });
        }
    })
})

// display edit event page
// router.get('/edit/(:id)', function(req, res, next) {

//     let id = req.params.id;
   
//     dbConn.query('SELECT * FROM events WHERE id = ' + id, function(err, rows, fields) {
//         if (err) {
//             res.send({ error: err })
//         }
         
//         // if user not found
//         if (rows.length <= 0) {
//             res.status(404).send({ error: 'no event found' });
//         }
//         // if user found
//         else {
//             // render to edit.ejs
//             res.status(200).send({ eventData: rows });
//         }
//     })
// })

// update user data
// router.put('/update/:id', function(req, res, next) {

//     let id = req.params.id;
//     let { title, description, startDate: start, endDate: end } = req.body;

//     if(!title || !start || !end) {
//         return res.status(400).send({ error: 'update details are required.' });
//     }

//     var form_data = { title, description, start, end };
//     // update query
//     dbConn.query('UPDATE events SET ? WHERE id = ' + id, form_data, function(err, result) {
//         //if(err) throw err
//         if (err) {
//             res.send({ error: err })
//         } else {
//             req.send({ success: 'Event successfully updated' });
//         }
//     })
// })
   
// delete event
router.delete('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    dbConn.query('DELETE FROM events WHERE id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            res.send({ error: err })
        } else {
            res.send({ success: 'successfully deleted! event ID = ' + id });
        }
    })
})

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  next(createError(404));
});

module.exports = router;