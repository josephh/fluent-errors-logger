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
      if(fluentEvents) console.debug("Fluent events [0] : " + fluentEvents.results[0].type)
      else console.debug("No Fluent events read")
      if(fluentEvents) console.debug("Fluent events start: " + fluentEvents.start)
      if(fluentEvents) console.debug("Fluent events count: " + fluentEvents.count)
      fluentEvents.results.forEach((item, i) => {
        console.debug(`id: ${item.id}; type: ${item.type}; accountId: ${item.accountId};
          retailerId: ${item.retailerId}; context.entityType: ${item.context.entityType}.`)
      })
    } catch(err) {
      console.error('Error calling Fluent. Details : ', err)
    }
}
