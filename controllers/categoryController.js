import { Category } from "../models/categoryModel.js";

// Create new Category
export const createCategory = async(req, res) => {
    try {
        const category = new Category(req.body);
        const savedCategory = await category.save();
        res.status(201).send(savedCategory);
    } catch (error) {
        res.status(500).send('Error creating category: ' + error.message);
    }
}

// Get all Categories
export const getCategories = async(req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).send(categories);
    } catch (error) {
        res.status(500).send('Error getting categories: ' + error.message);
    }
}

// Get a Category by ID
export const getCategoryById = async(req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) 
            res.status(404).send('Category not found');
    } catch (error) {
        res.status(500).send('Error getting category: ' + error.message);
    }
}