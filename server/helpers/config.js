// Configuration file - DO NOT COMMIT

const config = {
    version: 'v1',

    // DB
    admin: {
        name: 'admin',
        password: 'jlAnZ9lfnBwDcaRj',
        port: 3001
    },

    clinicUser: {
        name: 'clinic-data-manager',
        handler: 'clinic-data-handler',
        password: 'ubLN6209pL3crH7t'
    },

    userDataUser: {
        name: 'user-data-manager',
        handler: 'user-data-handler',
        password: 'SDwWvQIDVvnP2w26'
    },

    appointmentUser: {
        name: 'appointments-manager',
        handler: 'appointments-handler',
        password: 'yiV50SAc1ipFbJvb'
    },

    authorizationUser: {
        name: 'authorization-manager',
        handler: 'authorization-handler',
        password: 'oqsk92joOgqoqHOE'
    },

    // MQTT
    host: 'tcp:localhost:1883',


}

module.exports = config;