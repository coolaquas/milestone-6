// const config = require ("./config.json");

module.exports = {
     getDBConnectionString: () => {
        return(`mongodb+srv://${config.username}:${config.username}@firstcluster-9xjfk.mongodb.net/${config.dbname}?retryWrites=true&w=majority`);
    }
}
