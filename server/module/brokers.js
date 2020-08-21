module.exports = function(sequelize,DataTypes){
    const brokers =  sequelize.define(
        'brokers',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            openid:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'openid'
            },
            isOrder:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue:false,
                field: 'isOrder'
            },
            nos:{
                type: DataTypes.STRING,
                allowNull: true,
                field: 'nos'
            }
        },
        {
            timestamps: true
        }
    );


    return brokers
}