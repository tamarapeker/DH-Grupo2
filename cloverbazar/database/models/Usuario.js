module.exports = (sequelize, dataTypes) =>{
    let alias = 'Usuarios';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        nombre: dataTypes.STRING,
        apellido: dataTypes.STRING,
        email: dataTypes.STRING,
        contrasena: dataTypes.STRING,
        direccion: dataTypes.STRING,
        telefono: dataTypes.STRING,
        estado: dataTypes.INTEGER
    }
    let config = {
        tableName : 'usuarios',
        timestamps : false
    }

    const Usuario = sequelize.define(alias,cols,config);

    Usuario.associate = function(models){
        Usuario.hasMany(models.Carritos, {
            as: "carritos",
            foreignKey: "usuario_id"
        });
    }


    return Usuario;
}