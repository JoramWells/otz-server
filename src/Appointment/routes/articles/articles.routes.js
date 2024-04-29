const express = require('express');
const {
  getAllArticles, getArticles, addArticles, editArticles, deleteArticles,
} = require('../../controllers/articles/atricles.controllers.');

const router = express.Router();

/**
 * @swagger
 * /appointments:
 *   get:
 *     summary: Get all publications
 *     responses:
 *       200:
 *         description: Returns all publications
 */
router.get('/fetchAll', getAllArticles);
router.get('/article/:id', getArticles);

/**
 * @swagger
 * /appointment:
 *   post:
 *     summary: Create a new appointment
 *     parameters:
 *       - in: body
 *         name: publication
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             content:
 *               type: string
 *         description: Publication object
 *     responses:
 *       201:
 *         description: Publication created successfully
 */
router.post('/add', addArticles);

/**
 * @swagger
 * /appointment/{id}:
 *   put:
 *     summary: Update an appointment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Publication ID
 *       - in: body
 *         name: publication
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             content:
 *               type: string
 *         description: Updated publication object
 *     responses:
 *       200:
 *         description: Publication updated successfully
 *       404:
 *         description: Publication not found
 */
router.put('/edit/:id', editArticles);

/**
 * @swagger
 * /appointment/{id}:
 *   delete:
 *     summary: Delete a publication by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Publication ID
 *     responses:
 *       200:
 *         description: Publication deleted successfully
 *       404:
 *         description: Publication not found
 */
router.delete('/delete/:id', deleteArticles);

module.exports = router;
