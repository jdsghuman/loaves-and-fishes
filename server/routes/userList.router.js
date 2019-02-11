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
// router.put(`/:id`, rejectUnauthenticated, (req, res) => {
//     if(req.user.admin) {
//         const personId = req.params.id;
//         const {admin, status } = req.body;
//         console.log('in put route', req.body);
//         const queryText = `UPDATE "person" SET "admin"=$1, "status"=$2 WHERE id=$3;`;
//         pool.query(queryText, [admin, status, personId ] )
//         .then(result => {
//             res.sendStatus(204);
//         })
//         .catch( (error) => {
//             console.log('error in PUT', error);
//             res.sendStatus(500);
//         })
//     } else {
//         res.sendStatus(403);
//     }
// })// end of PUT route

module.exports = router;