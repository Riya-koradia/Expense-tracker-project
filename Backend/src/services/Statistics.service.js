const pool = require("../config/db.config");

async function getTop3SpendDays(user_id) {
  const [rows] = await pool.promise().execute(
    `SELECT date, SUM(amount) as total
     FROM expenses
     WHERE user_id = ?
     GROUP BY date
     ORDER BY total DESC
     LIMIT 3`,
    [user_id]
  );
  return rows;
}

async function getMonthlyChange(user_id) {
  const [rows] = await pool.promise().execute(
    `SELECT DATE_FORMAT(date, '%Y-%m') as month, SUM(amount) as total
     FROM expenses
     WHERE user_id = ?
     GROUP BY month
     ORDER BY month DESC
     LIMIT 2`,
    [user_id]
  );

  if (rows.length < 2) return { changePercent: 0, amountChange: 0 };

  const [current, previous] = rows;
  const amountChange = current.total - previous.total;
  const changePercent = (amountChange / previous.total) * 100;

  return {
    currentMonth: current.month,
    previousMonth: previous.month,
    currentTotal: parseFloat(current.total),
    previousTotal: parseFloat(previous.total),
    amountChange: parseFloat(amountChange.toFixed(2)),
    changePercent: parseFloat(changePercent.toFixed(2)),
  };
}

async function getPrediction(user_id) {
  const [latestRows] = await pool
    .promise()
    .execute(`SELECT MAX(date) as latestDate FROM expenses WHERE user_id = ?`, [
      user_id,
    ]);

  let baseDate = new Date();
  if (latestRows[0]?.latestDate) {
    baseDate = new Date(latestRows[0].latestDate);
  }

  const monthsArr = [];
  for (let i = 2; i >= 0; i--) {
    const d = new Date(baseDate);
    d.setMonth(d.getMonth() - i);
    const monthStr = d.toISOString().slice(0, 7);
    monthsArr.push(monthStr);
  }

  const [rows] = await pool.promise().execute(
    `SELECT DATE_FORMAT(date, '%Y-%m') as month, SUM(amount) as total
     FROM expenses
     WHERE user_id = ?
     GROUP BY month`,
    [user_id]
  );

  const monthTotals = {};
  for (const row of rows) {
    monthTotals[row.month] = parseFloat(row.total) || 0;
  }

  const months = monthsArr.map((month) => ({
    month,
    total: monthTotals[month] ?? 0,
  }));

  const totalSum = months.reduce((sum, m) => sum + m.total, 0);
  const avg = totalSum / months.length;

  const currentMonthStr = monthsArr[monthsArr.length - 1];
  const currentMonthTotal = monthTotals[currentMonthStr] ?? 0;

  return {
    prediction: parseFloat(avg.toFixed(2)),
    months,
    currentMonthTotal: parseFloat(currentMonthTotal.toFixed(2)),
  };
}

async function getUserStatistics() {
 const [users] = await pool.promise().execute("SELECT id, name FROM users");
  const results = [];
  function delay(ms) { return new Promise(res => setTimeout(res, ms)); }
  for (const user of users) {
    const top3 = await getTop3SpendDays(user.id);
    const monthlyChange = await getMonthlyChange(user.id);
    const prediction = await getPrediction(user.id);
    results.push({
      userId: user.id,
      userName: user.name,
      top3SpendDays: top3,
      monthlyChange,
      prediction,
    });
    await delay(200); 
  }
  return results;
}

module.exports = {
  getTop3SpendDays,
  getMonthlyChange,
  getPrediction,
  getUserStatistics,
};
