const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// GET all on site demographics for GENDER
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

// GET all on site demographics for RACE
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

// GET all on site demographics for AGE
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

// POST Demographics submitted
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.user);
    if (req.isAuthenticated()) {
        const newDemo = req.body;
        const queryText = `INSERT INTO "count" ("meal_count", "timestamp", "summer", "farm", "location_id", "gender_id", "race_id", "age_id")
                           VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
        const queryValues = [
            newDemo.value, 
            newDemo.time, 
            newDemo.summer,
            newDemo.farm, 
            newDemo.location,
            newDemo.selectedGender,
            newDemo.selectedRace,
            newDemo.selectedAge,
        ];
        pool.query(queryText, queryValues).then(result => {
            res.sendStatus(204);
        }).catch(error => {
            console.log('in demographics POST ROUTER error', error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403)
    }
});

module.exports = router; 