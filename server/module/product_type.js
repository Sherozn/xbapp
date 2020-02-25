module.exports = function(sequelize,DataTypes){
    const product_type =  sequelize.define(
        'product_type',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            productId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'productId'
            },
            type1:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'type1'
            },
            type2:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'type2'
            },
            as_sort:{
                type: DataTypes.INTEGER,
                allowNull: true,
                field: 'as_sort'
            }
        },
        {
            timestamps: true
        }
    );

    product_type.associate = (models) => {
      models.product_type.belongsTo(models.product);
    }


    return product_type
}