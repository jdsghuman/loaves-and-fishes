const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Get reports will need to change !!
router.get('/', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated()) {
        console.log('authenticated', req.isAuthenticated());
        const queryText = `SELECT RYAN MUNDY PLEASE UPDATE;`;
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            }).catch(error => {
                console.log('in reports GET error', error);
            })
    } else {
        res.sendStatus(403);
    }
});

// MULTIPLE GET ROUTES may be needed!!


module.exports = router;