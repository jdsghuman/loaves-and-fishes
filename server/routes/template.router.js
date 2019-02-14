const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');

/**
 * GET route template
 */
router.get('/', (req, res) => {
    const queryText = `SELECT SUM("count".meal_count) FROM "count"
    WHERE "count".timestamp BETWEEN $1 AND $2;`;
      const queryValues = [
        moment().subtract(1, 'days').calendar(),
        moment().add(1, 'days').calendar()
    ];
    console.log('newCount ---- ', queryValues);
    pool.query(queryText, queryValues)
        .then(result => {
            console.log('checking', result.rows[0].sum);
            res.send(result.rows[0].sum);
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