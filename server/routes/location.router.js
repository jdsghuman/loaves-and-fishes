const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Get all outlet locations for onSiteHome
router.get('/', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated()) {
        console.log('authenticated', req.isAuthenticated());
        const queryText = `SELECT * FROM "location"
                           ORDER BY "location"."location_name" ASC;`;
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

// Get all outlet locations for Admin
router.get('/adminlocations', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated()) {
        console.log('authenticated', req.isAuthenticated());
        const queryText = `SELECT "location".id, "location".location_name, "meal_outlet_category".category_name, "location".street_address, "location".city, "location".state,
                          "location".zip, "location".county, "location".active, "location".notes, "person"."name", "location".date_updated FROM "location"
                          LEFT JOIN "location_outlet" ON "location".id = "location_outlet".location_id
                          LEFT JOIN "meal_outlet_category" ON "location_outlet".outlet_id = "meal_outlet_category".id
                          LEFT JOIN "person" ON "location".updated_by = "person".id
                          ORDER BY "location".location_name ASC;;`;
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            }).catch(error => {
                console.log('in Admin outlet location GET ROUTER error', error);
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
    pool.query(queryText, [id])
    .then((result) => {
        res.sendStatus(204);
    }).catch((error) => {
        console.log('error in delete route', error);
        res.sendStatus(500)
    })
});

// Update outlet location
router.put('/:id', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated()) {
        const reqId = req.params.id;
        const locationToUpdate = req.body;
        // const queryText = `UPDATE RYAN MUNDY PLEASE UPDATE;`;
        const queryValues = [
            locationToUpdate.location_name, // update with database column name 
            locationToUpdate.street_address, // update with database column name 
            locationToUpdate.city, // update with database column name 
            locationToUpdate.state, // update with database column name 
            locationToUpdate.zip, // update with database column name 
            locationToUpdate.county, // update with database column name 
            locationToUpdate.description, // update with database column name 
            locationToUpdate.notes, // update with database column name 
            locationToUpdate.status, // update with database column name 
            reqId
        ];
        pool.query(queryText, queryValues)
            .then((result) => {
                console.log(result);
                res.sendStatus(201);
            }).catch((error) => {
                console.log('in outlet location UPDATE ROUTER error', error);
                res.sendStatus(500)
            })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;