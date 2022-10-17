import axios from 'axios'
import ClientCredentials from './client-credentials.js'

const instance = axios.create({
  baseURL: `https://${ClientCredentials.fluentHostName}`,
  timeout: 30000
})

const getFluentEvents = async (accessToken) => {
  const params = new URLSearchParams()
  params.append('eventType', 'ORCHESTRATION_AUDIT')
  const config = {
    params: params,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': `application/json`
    }
  }
  const response = await instance.get('/api/v4.1/event', config)
  console.debug(`Get fluent events response status: ${response.status}`)
  return response.data
}

const getAccessToken = async () => {
  const params = new URLSearchParams()
  params.append('username', ClientCredentials.username)
  params.append('password', ClientCredentials.password)
  params.append('scope', 'api')
  params.append('client_id', ClientCredentials.clientId)
  params.append('client_secret', ClientCredentials.clientSecret)
  params.append('grant_type', 'password')
  const response = await instance.post('/oauth/token', params)
  console.debug(`Get access token response status: ${response.status}`)
  console.debug(`Access token: ${response.data.access_token}`)
  return response.data.access_token
}

/**
 * Do the work to assemble a POST request to send to Fluent's /oauth2/token.
 * @return                   Promise (from async)
 */
export { getAccessToken, getFluentEvents }
