const pool = require("../config/db.config");

class ResponseGenratorService {
  constructor(req) {
    this.req = req;
    this.pageNo = parseInt(req.query.pageNo) || 1;
    this.pageSize = parseInt(req.query.pageSize) || 25;
    this.search = req.query.search || '';
    this.sort = req.query.sort || "created_at";
    this.sortDirection = req.query.sortDirection === 'asc' ? 'ASC' : 'DESC';
  }

async getPaginatedResponse({ 
  tableName, 
  searchColumns = [], 
  selectedColumns = ["*"],
  customSelectSQL = null,
  countFrom = null
}) {
  const offset = (this.pageNo - 1) * this.pageSize;
  const searchTerm = this.search;
  let sortField;
  if (customSelectSQL && this.sort === "created_at") {
    sortField = "e.created_at";
  } else if (this.sort === "created_at") {
    sortField = "created_at";
  } else {
    sortField = this.sort || "id";
  }
  const sortDirection = this.sortDirection?.toUpperCase() === "ASC" ? "ASC" : "DESC";

  let whereClause = "";
  const params = [];

  if (searchTerm && searchColumns.length > 0) {
    const likeClauses = searchColumns.map(col => `${col} LIKE ?`);
    whereClause = `WHERE ${likeClauses.join(" OR ")}`;
    searchColumns.forEach(() => params.push(`%${searchTerm}%`));
  }
  if (this.req.query.startDate && this.req.query.endDate) {
  const startDate = new Date(parseInt(this.req.query.startDate)).toISOString().slice(0, 10);
  const endDate = new Date(parseInt(this.req.query.endDate)).toISOString().slice(0, 10);

  if (whereClause) {
    whereClause += ` AND e.date BETWEEN ? AND ? `;
  } else {
    whereClause = `WHERE e.date BETWEEN ? AND ? `;
  }

  params.push(startDate, endDate);
}


  const dataSQL = customSelectSQL
    ? `${customSelectSQL} ${whereClause} ORDER BY ${sortField} ${sortDirection} LIMIT ? OFFSET ?`
    : `SELECT ${selectedColumns.join(", ")} FROM ${tableName} ${whereClause} ORDER BY ${sortField} ${sortDirection} LIMIT ? OFFSET ?`;

  const countSQL = `SELECT COUNT(*) as total FROM ${countFrom || tableName} ${whereClause}`;

  params.push(this.pageSize, offset);

  const [dataRows] = await pool.promise().execute(dataSQL, params);
  const [countRows] = await pool.promise().execute(countSQL, params.slice(0, -2));

  return {
    pageNo: this.pageNo,
    pageSize: this.pageSize,
    total: countRows[0]?.total || 0,
    result: dataRows || [],
  };
}

}

module.exports = ResponseGenratorService;
