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
const assignCategoryToProject = async(categoryId, projectId) => {
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async(projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
}
const createCategory = async (categoryName) => {
    const query = `
        INSERT INTO category (category_name)
        VALUES ($1)
        RETURNING category_id;
    `;

    const result = await db.query(query, [categoryName]);
    return result.rows[0].category_id;
};

const updateCategory = async (categoryId, categoryName) => {
    const query = `
        UPDATE category
        SET category_name = $1
        WHERE category_id = $2
        RETURNING category_id;
    `;

    const result = await db.query(query, [categoryName, categoryId]);

    if (result.rows.length === 0) {
        throw new Error('Category not found');
    }

    return result.rows[0].category_id;
};
export {

    getAllCategories,
    getCategoryById,
    getCategoriesForProject,
    getProjectsForCategory,
    updateCategoryAssignments,
    createCategory,
    updateCategory    
};