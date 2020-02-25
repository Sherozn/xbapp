module.exports = function(sequelize,DataTypes){
    const product =  sequelize.define(
        'product',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            imgUrl:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'imgUrl'
            },
            name:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name'
            },
            note:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'note'
            },
            price:{
                type: DataTypes.FLOAT,
                allowNull: true,
                field: 'price'
            },
            buyUrl:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'buyUrl'
            },
            testUrl:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'testUrl'
            },
            as_type:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'as_type'
            },
            status:{
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue:0,
                field: 'status'
            }
        },
        {
            timestamps: true
        }
    );

    product.associate = (models) => {
      models.product.hasMany(models.product_type);
    };

    return product
}