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

    const result = await db.query(sql);
    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM project
        WHERE organization_id = $1
        ORDER BY project_date;
      `;

      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

async function getUpcomingProjects(number_of_projects) {
    const sql = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date AS date,
            p.organization_id,
            o.name AS organization_name
        FROM project p
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE p.project_date >= CURRENT_DATE
        ORDER BY p.project_date ASC
        LIMIT $1;
    `;

    const result = await db.query(sql, [number_of_projects]);
    return result.rows;
}

async function getProjectDetails(id) {
    const sql = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.location,
            p.project_date AS date,
            p.organization_id,
            o.name AS organization_name
        FROM project p
        JOIN organization o
            ON p.organization_id = o.organization_id
        WHERE p.project_id = $1;
    `;

    const result = await db.query(sql, [id]);
    return result.rows[0];
}

// Export the model functions
export {
    getAllProjects,
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails
};