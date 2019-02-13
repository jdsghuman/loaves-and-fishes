const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('authenticated', req.isAuthenticated());
    const queryText = `SELECT SUM("count".meal_count) FROM "count"
    WHERE "count".timestamp BETWEEN $1 AND $2;`;
    pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('in reports GET error', error);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;