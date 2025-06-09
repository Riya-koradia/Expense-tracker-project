// src/models/Expense.model.js
const pool = require("../config/db.config");

async function addExpense({ user_id, category, amount, date, description }) {
  const [result] = await pool.promise().execute(
    `INSERT INTO expenses (user_id, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`,
    [user_id, category, amount, date, description]
  );
  return result.insertId;
}

async function getExpenseById(id) {
  const [rows] = await pool.promise().execute(
    `SELECT e.*, u.name AS user_name, c.name AS category_name
     FROM expenses e
     LEFT JOIN users u ON u.id = e.user_id
     LEFT JOIN categories c ON c.id = e.category
     WHERE e.id = ? LIMIT 1`,
    [id]
  );
  return rows[0] || null;
}

async function deleteExpenseById(id) {
  const [result] = await pool.promise().execute(
    `DELETE FROM expenses WHERE id = ?`,
    [id]
  );
  return result.affectedRows > 0;
}

async function updateExpense(id, { user_id, category, amount, date, description }) {
  const [result] = await pool.promise().execute(
    `UPDATE expenses SET user_id = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`,
    [user_id, category, amount, date, description, id]
  );
  return result.affectedRows > 0;
}

async function getAllExpenses() {
  const [rows] = await pool.promise().execute(
    `SELECT * FROM expenses`
  );
  return rows;
}

async function getExpensesByFilters({ user_id, category, startDate, endDate }) {
  let sql = `SELECT * FROM expenses WHERE 1=1`;
  const params = [];

  if (user_id) {
    sql += ` AND user_id = ?`;
    params.push(user_id);
  }
  if (category) {
    sql += ` AND category = ?`;
    params.push(category);
  }
  if (startDate && endDate) {
    sql += ` AND date BETWEEN ? AND ?`;
    params.push(startDate, endDate);
  }

  const [rows] = await pool.promise().execute(sql, params);
  return rows;
}

module.exports = {
  addExpense,
  getExpenseById,
  deleteExpenseById,
  updateExpense,
  getAllExpenses,
  getExpensesByFilters,
};
