const mongoose = require("mongoose")

/**
 * Mongoose client creation class
 */
class mongooseHandler {

    constructor(mongoURI) {
        this.mongooseClient = null;
        this.mongoURI = mongoURI;
    }

    /**
     * Asynchronous connection method which creates the mongoose client and returns the client object on resolution.
     *
     * @returns {Promise<unknown>}
     */
    async connect() {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                let logURI = this.mongoURI
                this.mongooseClient = mongoose.createConnection(this.mongoURI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });

                this.mongooseClient.set('debug', true)

                this.mongooseClient.on('error', (error) => {
                    console.error(`Failed to connect to MongoDB with URI: ${logURI}`);
                    console.error(error.stack);
                    process.exit(1);
                    reject(error)
                })

                this.mongooseClient.on('open', () => {
                    console.log(`Connected to MongoDB with URI: ${logURI}`);
                    resolve(this.mongooseClient)
                })
            }, 10000)
        })
    }

    /**
     * Creates a mongoose model on the connection instance.
     *
     * @param name Model name
     * @param schema Schema used for model
     * @returns {model} Mongoose model
     */
    model(name, schema) {
        return this.mongooseClient.model(name, schema)
    }

    /**
     * Closes current mongoose instance
     */
    close() {
        this.mongooseClient.close().then(() => {
            console.log("Closed mongoose client")
        })
    }
}

module.exports = mongooseHandler