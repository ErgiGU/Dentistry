// Configuration file - DO NOT COMMIT
const admin_config = {
    admin_runner: {
        name: 'admin-runner',
        handler: 'admin-runner-handler',
        password: '3fg9AVxGC8fPJAk',
        port: 3001
    },

    admin_tester: {
        name: 'admin-tester',
        handler: 'admin-tester-handler',
        password: '3fg9AVxGC8fPJA7'
    },

    database_tester: {
        name: 'testing-user',
        password: 'Team-7Testing',
        mongoURI: 'mongodb+srv://' + 'testing-user' + ':' + 'Team-7Testing' + '@cluster0.lj881zv.mongodb.net/ClinicTesting?retryWrites=true&w=majority'
    }
}

const module_config = {
    version: 'v1',

    clinicUser: {
        name: 'clinic-data-manager',
        handler: 'clinic-data-handler',
        password: 'ubLN6209pL3crH7t',
        test: {
            name: 'test-clinic-data-manager',
            handler: 'test-clinic-data-handler',
            password: 'ubLN6209pL3crH7t'
        },
        mongoURI: 'mongodb+srv://' + 'clinic-data-manager' + ':' + 'ubLN6209pL3crH7t' + '@cluster0.lj881zv.mongodb.net/ClinicDB?retryWrites=true&w=majority'
    },

    appointmentUser: {
        name: 'appointments-manager',
        handler: 'appointments-handler',
        password: 'yiV50SAc1ipFbJvb',
        test: {
            name: 'test-appointments-manager',
            handler: 'test-appointments-handler',
            password: 'yiV50SAc1ipFbJvb'
        },
        mongoURI: 'mongodb+srv://' + 'appointments-manager' + ':' + 'yiV50SAc1ipFbJvb' + '@cluster0.lj881zv.mongodb.net/ClinicDB?retryWrites=true&w=majority'
    },

    authorizationUser: {
        name: 'authorization-manager',
        handler: 'authorization-handler',
        password: 'oqsk92joOgqoqHOE',
        test: {
            name: 'test-authorization-manager',
            handler: 'test-authorization-handler',
            password: 'oqsk92joOgqoqHOE'
        },
        mongoURI: 'mongodb+srv://' + 'authorization-manager' + ':' + 'oqsk92joOgqoqHOE' + '@cluster0.lj881zv.mongodb.net/ClinicDB?retryWrites=true&w=majority'
    },

    // MQTT
    host: 'tcp://127.0.0.1:1883',
    websocketUrl: 'ws://127.0.0.1:1884/mqtt',

}

const configServer = {
    admin_config,
    module_config
}

module.exports = configServer;
