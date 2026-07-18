-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);
-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');
CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL,

    CONSTRAINT fk_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);
INSERT INTO project
(organization_id, title, description, location, project_date)
VALUES

-- BrightFuture Builders (organization_id = 1)
(1,'Playground Renovation','Renovate a neighborhood playground.','Boise, ID','2026-08-10'),
(1,'Senior Center Repairs','Repair facilities at the senior center.','Meridian, ID','2026-08-22'),
(1,'Community Garden Build','Construct raised garden beds.','Nampa, ID','2026-09-05'),
(1,'Habitat Cleanup','Remove debris from vacant lots.','Caldwell, ID','2026-09-18'),
(1,'Park Pavilion Construction','Build a public picnic pavilion.','Eagle, ID','2026-10-02'),

-- GreenHarvest Growers (organization_id = 2)
(2,'School Garden Workshop','Teach students how to grow vegetables.','Boise, ID','2026-08-14'),
(2,'Tree Planting Day','Plant native trees throughout the city.','Meridian, ID','2026-08-29'),
(2,'Food Sustainability Fair','Educate the community on composting.','Nampa, ID','2026-09-12'),
(2,'Community Compost Project','Install neighborhood compost bins.','Caldwell, ID','2026-09-27'),
(2,'Urban Farming Class','Teach urban gardening techniques.','Eagle, ID','2026-10-10'),

-- UnityServe Volunteers (organization_id = 3)
(3,'Food Bank Drive','Collect food donations.','Boise, ID','2026-08-17'),
(3,'Homeless Shelter Meal','Prepare and serve dinner.','Meridian, ID','2026-08-31'),
(3,'Blood Donation Event','Coordinate community blood donations.','Nampa, ID','2026-09-15'),
(3,'School Supply Giveaway','Provide backpacks and school supplies.','Caldwell, ID','2026-09-30'),
(3,'Holiday Toy Drive','Collect toys for local children.','Eagle, ID','2026-10-15');
