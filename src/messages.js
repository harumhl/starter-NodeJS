/*
 * message.js
 * This file contains your bot code
 */

/*
 * Import dependencies
 */
const RecastAI = require('recastai')

/*
 * Import config
 */
const { recast } = require('./config')

/*
 * This function is the core of the bot behaviour
 */
const replyMessage = (message) => {
  try {
    /*
     * Instantiate Recast.AI SDK, just for request service
     */
    const request = new RecastAI.request(recast.token, recast.language)

    /*
     * Get text from message received
     */
    const text = message.content.attachment.content

    /*
     * Get senderId to catch unique conversation_token
     */
    const { senderId } = message

    /*
     * Call Recast.AI SDK, through /converse route
     */
    request.converse.textConverse(text, { conversationToken: senderId })
    .then(result => {
      /*
      * Here, you can add your own process.
      * Ex: You can call any external API
      * Or: Update your mongo DB
      * etc...
      */

      /*
      * Add each replies received from API to replies stack
      */
      result.replies.forEach(content => message.addReply({ type: 'text', content }))

      /*
      * Send all replies
      */
      message.reply()
      .then(() => {
        /*
         * Do some code after sending messages
         */
      })
    })
  } catch (err) {
    /*
     * If there is any error...
     */
    console.error('An error occured while handling message', err)
  }
}

module.exports = replyMessage