/**
 * Compile an object with properties provided by environment variables.
 @return object with properties 'username', 'password', 'client_id', 'client_secret'
 */
export default {
    username: process.env.FLUENT_USERNAME,
    password: process.env.FLUENT_PASSWORD,
    clientId: process.env.FLUENT_CLIENT_ID,
    clientSecret: process.env.FLUENT_CLIENT_SECRET,
    fluentHostName: process.env.FLUENT_HOST_NAME
}
