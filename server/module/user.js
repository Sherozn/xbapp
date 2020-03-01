module.exports = function(sequelize,DataTypes){
    const user =  sequelize.define(
        'user',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            name:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name'
            },
            password:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'password'
            },
            status:{
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue:0,
                field: 'status'
            }
        },
        {
            timestamps: false
        }
    );


    return user
}