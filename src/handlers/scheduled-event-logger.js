import { getAccessToken, getFluentEvents } from '../client/fluent-client.js'
/**
 * A Lambda function to log events data fetched from Fluent.
 */
export const scheduledEventLoggerHandler = async (event, context) => {
    // All log statements are written to CloudWatch by default. For more information, see
    // https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-logging.html
    console.info(JSON.stringify(event))

    try {
      // get access token from fluent
      let at = await getAccessToken()
      // get some Fluent event lines
      let fluentEvents = await getFluentEvents(at)
      if(!fluentEvents) {
        console.warn("No Fluent events read")
        return
      }
      if(fluentEvents) {
        console.debug("Fluent events count: " + fluentEvents.count)
        fluentEvents.results.forEach((fe, i) => {
          console.debug(`id: ${fe.id}; type: ${fe.type}; category: ${fe.category}.`)
        })
      }

    } catch(err) {
      console.error('Error calling Fluent. Details : ', err)
    }
}
