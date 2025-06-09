const pool = require("../config/db.config");

async function createCategory(category) {
    if (!category.name) {
        throw new Error('Category name is required');
    }

    const [result] = await pool.promise().execute(
        `INSERT INTO categories (name) VALUES (?)`,
        [
            category.name
        ]
    );
    return result.insertId;
}

async function getCategoryById(id) {
    const [rows] = await pool.promise().execute(
        `SELECT * FROM categories WHERE id = ? LIMIT 1`,
        [id]
    );
    return rows[0] || null;
}
async function deleteCategoryById(id) {
  const [result] = await pool.promise().execute(
    `DELETE FROM categories WHERE id = ?`,
    [id]
  );
  return result.affectedRows > 0;
}
async function getAllCategories() {
    const [rows] = await pool.promise().execute(
        `SELECT * FROM categories`
    );
    return rows;
}
async function updateCategory(id, category) {
    if (!category.name) {
        throw new Error('Category name is required');
    }

    const [result] = await pool.promise().execute(
        `UPDATE categories SET name = ? WHERE id = ?`,
        [
            category.name,
            id
        ]
    );
    return result.affectedRows > 0;
}

module.exports = {
    createCategory,
    getCategoryById,
    deleteCategoryById,
    getAllCategories,
    updateCategory
};
