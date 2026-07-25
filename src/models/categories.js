import db from "./db.js";

async function getAllCategories() {

    const sql = `
        SELECT
            category_id,
            category_name
        FROM category
        ORDER BY category_name;
    `;

    const result = await db.query(sql);
    return result.rows;

}

export {
    getAllCategories
};