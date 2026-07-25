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

async function getCategoryById(id) {

    const sql = `
        SELECT
            category_id,
            category_name
        FROM category
        WHERE category_id = $1;
    `;

    const result = await db.query(sql, [id]);
    return result.rows[0];

}

async function getCategoriesForProject(projectId) {

    const sql = `
        SELECT
            c.category_id,
            c.category_name
        FROM category c
        JOIN project_category pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.category_name;
    `;

    const result = await db.query(sql, [projectId]);
    return result.rows;

}

async function getProjectsForCategory(categoryId) {

    const sql = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date AS date,
            p.organization_id
        FROM project p
        JOIN project_category pc
            ON p.project_id = pc.project_id
        WHERE pc.category_id = $1
        ORDER BY p.project_date;
    `;

    const result = await db.query(sql, [categoryId]);
    return result.rows;

}

export {
    getAllCategories,
    getCategoryById,
    getCategoriesForProject,
    getProjectsForCategory
};