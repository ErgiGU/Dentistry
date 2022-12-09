// Configuration file - DO NOT COMMIT

const config = {
    version: 'v1',

    // DB
    admin: {
        name: 'admin',
        handler: 'admin-handler',
        password: process.env.HIVE_MQ_CLOUD_PASSWORD,
        port: 3001
    },

    admin2: {
        name: 'admin2',
        handler: 'admin2-handler',
        password: process.env.HIVE_MQ_CLOUD_PASSWORD_2
    },

    testingUser: {
        name: 'testing-user',
        password: process.env.TESTING_DB_PASSWORD
    },

    clinicUser: {
        name: 'admin',
        handler: 'ci-clinic-data-handler',
        password: process.env.HIVE_MQ_CLOUD_PASSWORD
    },

    userDataUser: {
        name: 'admin',
        handler: 'ci-user-data-handler',
        password: process.env.HIVE_MQ_CLOUD_PASSWORD
    },

    appointmentUser: {
        name: 'admin',
        handler: 'ci-appointments-handler',
        password: process.env.HIVE_MQ_CLOUD_PASSWORD
    },

    authorizationUser: {
        name: 'admin',
        handler: 'ci-authorization-handler',
        password: process.env.HIVE_MQ_CLOUD_PASSWORD
    },

    // MQTT
    host: 'mqtts://ff6d5955b6414719bd620ead23095ebd.s2.eu.hivemq.cloud:8883'
}

module.exports = config;