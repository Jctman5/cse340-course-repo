import db from "./db.js";

async function getAllProjects() {
    const sql = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date,
            o.name AS organization_name
        FROM project p
        JOIN organization o
            ON p.organization_id = o.organization_id
        ORDER BY p.project_date;
    `;

    return await db.query(sql);
}

export {
    getAllProjects
};