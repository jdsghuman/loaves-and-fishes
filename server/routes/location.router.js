const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const moment = require('moment')

// Get all outlet locations
router.get('/', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated()) {
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

// Get all outlet locations for onSiteHome
router.get('/active', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated()) {
        const queryText = `SELECT * FROM "location"
        WHERE "location".active = true
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
        const queryText = `SELECT "location".id, "location".location_name, "location".street_address, "location".city, "location".state,
                          "location".zip, "location".county, "location".active, "location".notes, "person"."name", "location".date_updated FROM "location"
                          LEFT JOIN "person" ON "location".updated_by = "person".id
                          ORDER BY "location".location_name ASC;`;
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

// Get all outlet locations for Admin ---- COPY THIS FOR MANAGE LOCATIONS --------------- ******
router.get('/manageadminlocations', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated()) {
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
    if (req.user.admin) {
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
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    if (req.user.admin) {
        let id = req.params.id
        let queryText = `DELETE FROM "location" WHERE id = $1;`;
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

router.put('/:id', rejectUnauthenticated, (req, res) => {
    if(req.user.admin) {
        const reqId = req.body.id;
        const updatedLocation = req.body;
        const user = req.user.id;
        const dateUpdated = moment().format();
        const { location_name, street_address, city, state, zip, county, active, notes } = req.body;
        const queryString = `UPDATE "location" SET "location_name"=$1, "street_address"=$2, "city"=$3, "state"=$4, "zip"=$5, "county"=$6, "active"=$7, "notes"=$8, "updated_by"=$9, "date_updated"=$10 WHERE id=$11;`;
        pool.query(queryString, [location_name, street_address, city, state, zip, county, active, notes, user, dateUpdated, reqId])
            .then(result => {
                console.log(result);
                res.sendStatus(204);
            }).catch(error => {
                console.log(`Error in updated location ${error}`);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.get('/locationoutlet', rejectUnauthenticated, (req, res) => {
    const queryString = `SELECT * FROM "location_outlet";`;
    pool.query(queryString)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log(`Error on GET location_outlet ${error}`);
            res.sendStatus(500);
        });
});

router.put('/locationoutlet/:id', rejectUnauthenticated, (req, res) => {
    if(req.user.admin) {
        const location_id = req.body.id;
        const categories = req.body.categories;
        // DELETE WHERE ID = $1
        const deleteQuery = `DELETE from "location_outlet" WHERE "location_outlet".location_id = $1;`;
        pool.query(deleteQuery, [location_id])
            .then(result => {
                console.log(result);
                res.sendStatus(201);
            })
            .catch(error => {
                console.log(`Error making delete ${deleteQuery}, ${error}`);
                res.sendStatus(500);
            })

        // INSERT ALL LOCATIONS
        const updateQuery = `INSERT INTO "location_outlet" ("location_id", "outlet_id")
        VALUES($1, $2)`;
        categories.map(categoryId => {
            const insertUpdatedValues = [location_id, categoryId];
            pool.query(updateQuery, insertUpdatedValues);
        });

        res.sendStatus(201);
    } else {
        res.sendStatus(403);
    }
})

module.exports = router;