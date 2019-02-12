const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// Get all sub-categories
router.get('/', rejectUnauthenticated, (req, res) => {
    if (req.user.admin) {
        console.log('authenticated', req.isAuthenticated());
        const queryText = `SELECT * FROM "outlet_sub_category";`;
        pool.query(queryText)
            .then(result => {
                res.send(result.rows);
            }).catch(error => {
                console.log('in sub-category GET error', error);
            })
    } else {
        res.sendStatus(403);
    }
});

// Add outlet sub-category
router.post('/', rejectUnauthenticated, (req, res) => {
    if (req.user.admin) {
        const newSubCategory = req.body;
        const queryText = `INSERT INTO "outlet_sub_category" ("category_name")
                           VALUES($1);`;
        const queryValues = [
            newSubCategory.subCategory,
        ];
        pool.query(queryText, queryValues).then(result => {
            res.sendStatus(204);
        }).catch(error => {
            console.log('in outlet sub-category POST ROUTER error', error);
            res.sendStatus(500)
        })
    } else {
        res.sendStatus(403)
    }
});

// Delete outlet sub-category
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    if (req.user.admin) {
        const reqId = req.params.id;
        console.log('route id: ', reqId);
        const queryText = `DELETE FROM "outlet_sub_category" WHERE id = $1;`;
        pool.query(queryText, [reqId])
            .then(result => {
                res.sendStatus(204);
            }).catch(error => {
                console.log('in outlet sub-category DELETE ROUTER error', error);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

// Update outlet sub-category
router.put('/:id', rejectUnauthenticated, (req, res) => {
    if (req.user.admin) {
        const subCategoryId = req.params.id;
        console.log('subcategory id ----', subCategoryId);
        const subCategoryToUpdate = req.body;
        console.log('checking req.body', subCategoryToUpdate);
        const queryText = `UPDATE "outlet_sub_category" 
                           SET "category_name" = $1
                           WHERE "id" = $2;`;
        const queryValues = [
            subCategoryToUpdate.subCategoryUpdated, 
            subCategoryId
        ];
        pool.query(queryText, queryValues)
            .then((result) => {
                console.log(result);
                res.sendStatus(201);
            }).catch((error) => {
                console.log('in outlet sub-category UPDATE ROUTER error', error);
                res.sendStatus(500)
            })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;