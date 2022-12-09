// Configuration file - DO NOT COMMIT

const config = {
    version: 'v1',

    admin_runner: {
        name: 'admin-runner',
        handler: 'admin-runner-handler',
        password: process.env.CLOUD_MQTT_ADMIN_RUNNER_PASSWORD,
        port: 3001
    },

    admin_tester: {
        name: 'admin-tester',
        handler: 'admin-tester-handler',
        password: process.env.CLOUD_MQTT_ADMIN_TESTER_PASSWORD
    },

    database_tester: {
        name: 'testing-user',
        password: process.env.TESTING_DB_PASSWORD,
        mongoURI: 'mongodb+srv://' + this.name + ':' + this.password + '@cluster0.lj881zv.mongodb.net/ClinicTesting?retryWrites=true&w=majority'
    },

    clinicUser: {
        name: this.admin_runner.name,
        handler: 'ci-clinic-data-handler',
        password: this.admin_runner.password,
        test: {
            name: this.admin_tester.name,
            password: this.admin_tester.password,
            handler: this.admin_tester.handler
        },
        mongoURI: 'mongodb+srv://' + this.database_tester.name + ':' + this.database_tester.password + '@cluster0.lj881zv.mongodb.net/ClinicTesting?retryWrites=true&w=majority'
    },

    appointmentUser: {
        name: this.admin_runner.name,
        handler: 'ci-appointments-handler',
        password: this.admin_runner.password,
        test: {
            name: this.admin_tester.name,
            password: this.admin_tester.password,
            handler: this.admin_tester.handler
        },
        mongoURI: 'mongodb+srv://' + this.database_tester.name + ':' + this.database_tester.password + '@cluster0.lj881zv.mongodb.net/ClinicTesting?retryWrites=true&w=majority'
    },

    authorizationUser: {
        name: this.admin_runner.name,
        handler: 'ci-authorization-handler',
        password: this.admin_runner.password,
        test: {
            name: this.admin_tester.name,
            password: this.admin_tester.password,
            handler: this.admin_tester.handler
        },
        mongoURI: 'mongodb+srv://' + this.database_tester.name + ':' + this.database_tester.password + '@cluster0.lj881zv.mongodb.net/ClinicTesting?retryWrites=true&w=majority'
    },

    // MQTT
    host: process.env.CLOUD_MQTT_HOST
}

module.exports = config;