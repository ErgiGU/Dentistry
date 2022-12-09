// Configuration file - DO NOT COMMIT

const config = {
    version: 'v1',

    admin: {
        name: 'admin',
        handler: 'admin-handler',
        password: process.env.CLOUD_MQTT_ADMIN_PASSWORD,
        port: 3001
    },

    admin2: {
        name: 'admin2',
        handler: 'admin2-handler',
        password: process.env.CLOUD_MQTT_ADMIN2_PASSWORD
    },

    testingUser: {
        name: 'testing-user',
        password: process.env.TESTING_DB_PASSWORD
    },

    clinicUser: {
        name: 'admin',
        handler: 'ci-clinic-data-handler',
        password: process.env.CLOUD_MQTT_ADMIN_PASSWORD
    },

    userDataUser: {
        name: 'admin',
        handler: 'ci-user-data-handler',
        password: process.env.CLOUD_MQTT_ADMIN_PASSWORD
    },

    appointmentUser: {
        name: 'admin',
        handler: 'ci-appointments-handler',
        password: process.env.CLOUD_MQTT_ADMIN_PASSWORD
    },

    authorizationUser: {
        name: 'admin',
        handler: 'ci-authorization-handler',
        password: process.env.CLOUD_MQTT_ADMIN_PASSWORD
    },

    // MQTT
    host: process.env.CLOUD_MQTT_HOST
}

module.exports = config;