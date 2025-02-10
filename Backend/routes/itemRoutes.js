const express = require('express');
const { getAllItems, addItem, updateItem, deleteItem } = require('../controllers/itemController');
const adminAuth = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getAllItems); // Public - View all items
router.post('/add', adminAuth, addItem); // Admin - Add item
router.put('/update/:id', adminAuth, updateItem); // Admin - Update item
router.delete('/delete/:id', adminAuth, deleteItem); // Admin - Delete item

module.exports = router;
