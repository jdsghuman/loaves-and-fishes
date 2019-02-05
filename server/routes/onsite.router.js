const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Get all on site demographics for GENDER
router.get('/gender', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated()) {
        console.log('authenticated', req.isAuthenticated());
        const queryText = `SELECT * FROM "gender";`;
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            }).catch(error => {
                console.log('in on site GENDER GET error', error);
            })
    } else {
        res.sendStatus(403);
    }
});

// Get all on site demographics for RACE
router.get('/race', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated()) {
        console.log('authenticated', req.isAuthenticated());
        const queryText = `SELECT * FROM "race";`;
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            }).catch(error => {
                console.log('in on site RACE GET error', error);
            })
    } else {
        res.sendStatus(403);
    }
});

// Get all on site demographics for AGE
router.get('/age', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated()) {
        console.log('authenticated', req.isAuthenticated());
        const queryText = `SELECT * FROM "age";`;
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            }).catch(error => {
                console.log('in on site AGE GET error', error);
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