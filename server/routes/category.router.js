const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const moment = require('moment')

// Get all outlet categories
router.get('/', (req, res) => {
    let sql = `SELECT "meal_outlet_category".id, "meal_outlet_category".category_name, "meal_outlet_category".sub_category,
              "meal_outlet_category".notes, "meal_outlet_category".active, "meal_outlet_category".updated_by, "meal_outlet_category".date_updated, "outlet_sub_category".category_name AS "sub_category_name", "person"."name" FROM "meal_outlet_category"
              LEFT JOIN "outlet_sub_category" ON "meal_outlet_category".sub_category = "outlet_sub_category".id
              LEFT JOIN "person" ON "meal_outlet_category".updated_by = "person".id
              ORDER BY "meal_outlet_category".category_name ASC;`;
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
    if (req.user.admin) {
        const newOutletCategory = req.body;
        const queryText = `INSERT INTO "meal_outlet_category" ("category_name", "sub_category", "notes", "updated_by", "date_updated")
                           VALUES($1, $2, $3, $4, $5);`;
        const queryValues = [
            newOutletCategory.categoryName,
            newOutletCategory.selectedSubCategory, 
            newOutletCategory.notes, 
            req.user.id,
            moment().format(),
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
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    if(req.user.admin) {
        console.log('testing delete route', req.params.id);
        let id = req.params.id
        let queryText = `DELETE FROM "meal_outlet_category" WHERE id = $1;`;
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

// Update outlet category
router.put('/:id', rejectUnauthenticated, (req, res) => {
    if (req.user.admin) {
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