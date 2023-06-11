import { Model, DataTypes } from "sequelize";
import sequelize from "../database";

class Users extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Users",
  }
);

export default Users;
