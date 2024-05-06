

export const EnvConfiguration=()=>({

    evironment:process.env.NODE_ENV || 'dev',
    database: process.env.MONGODB_DATABASE,
    userName: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    mongodb: process.env.MONGO_DB,
    port: process.env.PORT || 3001,

})