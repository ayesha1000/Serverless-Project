
module.exports = (sequelize,type) =>{
    return sequelize.define('customer',{
        customer_id :{
            type: type.INTEGER,
            primaryKey: true
        },
        customer_name: type.STRING(45),
        customer_phoneno: type.STRING(45),
        customer_address: type.STRING(45),
        deletflag: {
            type: type.INTEGER,
            defaultValue: 0
        }

    },
    {
        timestamps: false,
        freezeTableName: true
    })
}