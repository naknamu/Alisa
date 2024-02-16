const config = {
    mongoURI: 
    process.env.NODE_ENV === "production" ? process.env.MONGO_URI : process.env.MONGO_URI_DEV
};

module.exports = {
    config
};