const Sequelize = require("sequelize").Sequelize;

const sequelize = new Sequelize("node_playground", "root", "admin", {
    dialect: "mysql",
    host: "localhost",
});

module.exports = sequelize;
