const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Get all outlet categories
router.get('/', (req, res) => {
    let sql = `SELECT * FROM "meal_outlet_category";`
    pool.query(sql).then((response) => {
        res.send(response.rows)
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })
});

// Add outlet category
router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.user);
    if (req.isAuthenticated()) {
        const newOutletCategory = req.body;
        const queryText = `INSERT INTO "meal_outlet_category" ("category_name", "sub_category", "updated_by")
                           VALUES($1, $2, $3);`;
        const queryValues = [
            newOutletCategory.categoryname, // update with state name 
            newOutletCategory.sub_category, // update with state name 
            req.user.id
        ];
        pool.query(queryText, queryValues).then(result => {
            res.sendStatus(204);
        }).catch(error => {
            console.log('in outlet category POST ROUTER error', error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403)
    }
});

// Delete outlet category
router.delete('/:id', (req, res) => {
    console.log('testing delete route', req.params.id);
    let id = req.params.id
    let queryText = `DELETE FROM "meal_outlet_category" WHERE id = $1;`;
    pool.query(queryText, [id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in delete route', error);
        res.sendStatus(500)
    })
});

// Update outlet category
router.put('/:id', rejectUnauthenticated, (req, res) => {
    if (req.isAuthenticated()) {
        const reqId = req.params.id;
        const categoryToUpdate = req.body; 
        // const queryText = `UPDATE RYAN MUNDY PLEASE UPDATE;`;
        const queryValues = [
            categoryToUpdate.category_name, // update with database column name 
            categoryToUpdate.sub_category, // update with database column name 
            categoryToUpdate.notes, // update with database column name 
            reqId
        ];
        pool.query(queryText, queryValues)
            .then((result) => {
                console.log(result);
                res.sendStatus(201);
            }).catch((error) => {
                console.log('in outlet category UPDATE ROUTER error', error);
                res.sendStatus(500)
            })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;