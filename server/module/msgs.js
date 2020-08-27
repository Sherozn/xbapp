module.exports = function(sequelize,DataTypes){
    const msgs =  sequelize.define(
        'msgs',
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            context:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'context'
            },
            keyword:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'keyword'
            },
            key_type:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue:0,
                field: 'key_type'
            },
            context_type:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue:0,
                field: 'context_type'
            },
            as_type:{
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue:0,
                field: 'as_type'
            }
        },
        {
            timestamps: true
        }
    );


    return msgs
}