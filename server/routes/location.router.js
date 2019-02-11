const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Get all outlet locations
router.get('/', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated()) {
        console.log('authenticated', req.isAuthenticated());
        const queryText = `SELECT * FROM "location";`;
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            }).catch(error => {
                console.log('in outlet location GET ROUTER error', error);
            })
    } else {
        res.sendStatus(403);
    }
});

// Add outlet location
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.user);
    if (req.isAuthenticated()) {
        const newOutletLocation = req.body;
        const queryText = `INSERT INTO "location" ("location_name", "street_address", "city", "state", "zip", "county", "notes", "updated_by", "date_updated")
                           VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
        const queryValues = [
            newOutletLocation.locationName, 
            newOutletLocation.street, 
            newOutletLocation.city, 
            newOutletLocation.state, 
            newOutletLocation.zip, 
            newOutletLocation.county,
            newOutletLocation.notes,
            req.user.id,
            newOutletLocation.time,
        ];
        pool.query(queryText, queryValues).then(result => {
            res.sendStatus(204);
        }).catch(error => {
            console.log('in outlet location POST ROUTER error', error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403)
    }
});

// Delete outlet location
router.delete('/:id', (req, res) => {
    console.log('testing delete route', req.params.id);
    let id = req.params.id
    let queryText = `DELETE FROM "location" WHERE id = $1;`;
    pool.query(queryText, [id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in delete route', error);
        res.sendStatus(500)
    })
});

// Update outlet location


module.exports = router;