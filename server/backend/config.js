// Configuration file - DO NOT COMMIT

const config = {
// DB
    admin: {
        name: 'admin',
        password: 'jlAnZ9lfnBwDcaRj'
    },

    clinicUser: {
        name: 'clinic-data-manager',
        password: 'ubLN6209pL3crH7t',
        port: 3001
    },

    userDataUser: {
        name: 'user-data-manager',
        password: 'SDwWvQIDVvnP2w26',
        port: 3002
    },

    appointmentUser: {
        name: 'appointments-manager',
        password: 'yiV50SAc1ipFbJvb',
        port: 3003
    },

    authorizationUser: {
        name: 'authorization-manager',
        password: 'oqsk92joOgqoqHOE',
        port: 3004
    },

// MQTT
    host: 'tcp:localhost:1883',

}

module.exports = config;