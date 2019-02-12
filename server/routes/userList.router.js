const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * GET route template
 */
router.get('/', (req, res) => {
    let sql = `SELECT * FROM "person";`
    pool.query(sql).then((response) => {
        res.send(response.rows)
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })
});

/**
 * DELETE route template
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    if(req.user.admin) {
        console.log('testing delete route', req.params.id);
        let id = req.params.id
        let queryText = `DELETE FROM "person" WHERE id = $1;`;
        pool.query(queryText, [id]).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error in delete route', error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403);
    }
});

/**
 * PUT route template 
 */
router.put(`/:id`, rejectUnauthenticated, (req, res) => {
    if(req.user.admin) {
        const personId = req.params.id;
        console.log('person id ----', personId);
        const newStatus = false;
        const {name, username, email, status, admin } = req.body;
        console.log('in put route', req.body);
        const queryText = `UPDATE "person" SET "name"=$1, "username"=$2, "email"=$3, "status"=$4, "new"=$5, "admin"=$6 WHERE id=$7;`;
        pool.query(queryText, [name, username, email, status, newStatus, admin, personId])
        .then(result => {
            res.sendStatus(204);
        })
        .catch( (error) => {
            console.log(`Error in User update ${error}`);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
})// end of PUT route

module.exports = router;