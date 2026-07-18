import db from "./db.js";

async function getAllCategories() {

    const sql = `
        SELECT
            category_id,
            category_name
        FROM category
        ORDER BY category_name;
    `;

    return await db.query(sql);

}

export {
    getAllCategories
};