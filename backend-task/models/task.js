'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING
  }, {});
  Task.associate = function (models) {
    // associations can be defined here
  };
  return Task;
};