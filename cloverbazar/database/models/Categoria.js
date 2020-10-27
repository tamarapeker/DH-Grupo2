module.exports = (sequelize, dataTypes) =>{
    let alias = 'Categorias';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        nombre: dataTypes.STRING,
        imagen: dataTypes.STRING
    }
    let config = {
        tableName : 'categorias',
        timestamps : false
    }

    const Categoria = sequelize.define(alias,cols,config);

    Categoria.associate = function(models){
        Categoria.hasMany(models.Productos, {
            as: "productos",
            foreignKey: "categoria_id"
        });

    }
    return Categoria;
}