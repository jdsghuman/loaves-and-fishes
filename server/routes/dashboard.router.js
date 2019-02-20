const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/**
 * GET route 
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT SUM("count".meal_count) FROM "count"
    WHERE "count".timestamp = $1;`;
      const queryValues = [
          moment().format()
    ];
    console.log('newCount ---- ', queryValues);
    pool.query(queryText, queryValues)
        .then(result => {
            console.log('checking', result.rows[0].sum);
            res.send(result.rows[0].sum);
        }).catch(error => {
            console.log('error in reports GET', error);
            res.sendStatus(500);
        })
});

router.get('/monthly', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT SUM("count".meal_count) FROM "count"
    WHERE "count".timestamp BETWEEN $1 AND $2;`;
      const queryValues = [
        moment().subtract(30, 'days').calendar(),
        moment().add(1, 'days').calendar()
    ];
    console.log('newCount ---- ', queryValues);
    pool.query(queryText, queryValues)
        .then(result => {
            console.log('checking', result.rows[0].sum);
            res.send(result.rows[0].sum);
        }).catch(error => {
            console.log('in monthly reports GET error', error);
            res.sendStatus(500);
        })
});


module.exports = router;