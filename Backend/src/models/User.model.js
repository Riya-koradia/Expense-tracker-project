const pool = require('../config/db.config');
const { hashPass } = require('../utils/passEncDec.helper');

async function createUser(user) {
    if (!user.password) {
        throw new Error('Password is required');
    }
    const hashedPassword = await hashPass(user.password);
    const [result] = await pool.promise().execute(
        `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        [
            user.name,
            user.email,
            hashedPassword
        ]
    );
    return result.insertId;
}
async function updateUser(id, user) {

    let fields = [];
    let values = [];
    if (user.name !== undefined) {
        fields.push("name = ?");
        values.push(user.name);
    }
    if (user.email !== undefined && user.email !== "" && user.email !== null) {
        fields.push("email = ?");
        values.push(user.email);
    }
    if (fields.length === 0) return false; 
    values.push(id);
    const [result] = await pool.promise().execute(
        `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
        values
    );
    return result.affectedRows > 0;
}
async function findUserByEmail(email) {
    const [rows] = await pool.promise().execute(
        `SELECT * FROM users WHERE email = ? LIMIT 1`,
        [email]
    );
    return rows[0] || null;
}


async function findUserById(id) {
    const [rows] = await pool.promise().execute(
        `SELECT * FROM users WHERE id = ? LIMIT 1`,
        [id]
    );
    return rows[0] || null;
}
async function deleteUserById(id) {
  const [result] = await pool.promise().execute(
    `DELETE FROM users WHERE id = ?`,
    [id]
  );
  return result.affectedRows > 0;
}


module.exports = {
    createUser,
    updateUser,
    findUserByEmail,
    findUserById,
    deleteUserById
};
