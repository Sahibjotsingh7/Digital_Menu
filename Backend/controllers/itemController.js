const Item = require('../models/Item');

// Get all items (Public)
const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching items", error });
    }
};

// Add new item (Admin)
const addItem = async (req, res) => {
    try {
        const { name, type, price, isAvailable } = req.body;
        const newItem = new Item({ name, type, price, isAvailable });
        await newItem.save();
        res.status(201).json({ message: "Item added successfully", item: newItem });
    } catch (error) {
        res.status(500).json({ message: "Error adding item", error });
    }
};

// Update item (Admin)
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: "Item not found" });
        res.status(200).json({ message: "Item updated", item: updatedItem });
    } catch (error) {
        res.status(500).json({ message: "Error updating item", error });
    }
};

// Delete item (Admin)
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        await Item.findByIdAndDelete(id);
        res.status(200).json({ message: "Item deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting item", error });
    }
};

module.exports = { getAllItems, addItem, updateItem, deleteItem };
