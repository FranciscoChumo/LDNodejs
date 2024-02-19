import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { UserModel } from "./UserModel.js";

export const CitaModel = sequelize.define("cita",{
    id:{
        autoIncrement:true,
        primaryKey:true,
        type: DataTypes.INTEGER,
    },
    medico:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    fechaHora:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
},
{
    timestamps:false
}
);

UserModel.hasMany(CitaModel, { foreignKey: "person_id" });
CitaModel.belongsTo(UserModel, { foreignKey: "person_id" });