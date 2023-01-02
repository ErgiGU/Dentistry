// Dummy Configuration file - DO COMMIT
const admin_config = {
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
    }
}

const module_config = {
    version: 'v1',

    clinicUser: {
        name: admin_config.admin_runner.name,
        handler: 'ci-clinic-data-handler',
        password: admin_config.admin_runner.password,
        test: {
            name: admin_config.admin_tester.name,
            password: admin_config.admin_tester.password,
            handler: admin_config.admin_tester.handler
        },
        mongoURI: 'mongodb+srv://' + admin_config.database_tester.name + ':' + admin_config.database_tester.password + '@cluster0.lj881zv.mongodb.net/ClinicTesting?retryWrites=true&w=majority'
    },

    appointmentUser: {
        name: admin_config.admin_runner.name,
        handler: 'ci-appointments-handler',
        password: admin_config.admin_runner.password,
        test: {
            name: admin_config.admin_tester.name,
            password: admin_config.admin_tester.password,
            handler: admin_config.admin_tester.handler
        },
        mongoURI: 'mongodb+srv://' + admin_config.database_tester.name + ':' + admin_config.database_tester.password + '@cluster0.lj881zv.mongodb.net/ClinicTesting?retryWrites=true&w=majority'
    },

    authorizationUser: {
        name: admin_config.admin_runner.name,
        handler: 'ci-authorization-handler',
        password: admin_config.admin_runner.password,
        test: {
            name: admin_config.admin_tester.name,
            password: admin_config.admin_tester.password,
            handler: admin_config.admin_tester.handler
        },
        mongoURI: 'mongodb+srv://' + admin_config.database_tester.name + ':' + admin_config.database_tester.password + '@cluster0.lj881zv.mongodb.net/ClinicTesting?retryWrites=true&w=majority'
    },

    // MQTT
    host: process.env.CLOUD_MQTT_HOST
}

const config = {
    admin_config,
    module_config
}

module.exports = config;