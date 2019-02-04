const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Get all on site demographics
router.get('/', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated()) {
        console.log('authenticated', req.isAuthenticated());
        const queryText = `SELECT RYAN MUNDY PLEASE UPDATE;`;
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            }).catch(error => {
                console.log('in on site GET error', error);
            })
    } else {
        res.sendStatus(403);
    }
});

// MAY NEED MORE GET ROUTES 


// Add on site count WILL NEED TO BE UPDATED 
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.user);
    if (req.isAuthenticated()) {
        const newCount = req.body;
        const queryText =
            `INSERT INTO RYAN MUNDY PLEASE UPDATE;`;
        const queryValues = [
            newCount.// update with database column name 
            newCount. // update with database column name 
            req.user.id
        ];
        pool.query(queryText, queryValues).then(result => {
            res.sendStatus(204);
        }).catch(error => {
            console.log('in outlet category POST ROUTER error', error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403)
    }
});

module.exports = router; 