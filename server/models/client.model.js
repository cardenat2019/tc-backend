const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Model = Sequelize.Model;

class Client extends Model {}
Client.init({
  id: {
      type: Sequelize.SMALLINT, 
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
  code:  {
    type: Sequelize.STRING,
    allowNull: false,
    },
  name:  {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  website: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  phone_number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'client',
  timestamps: false,
  freezeTableName: true,
  underscored: true
});

module.exports = Client;