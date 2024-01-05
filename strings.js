

export const BASE = {
    URI: "https://metoyou-api.vercel.app"
}
//? https://metoyou-api.vercel.app/
//? CREATE MESSAGE
// const newMessage = new Message({
//     recipientId: '123456789', // ID of the recipient user
//     senderId: '987654321', // ID of the sender user
//     messages: [
//       {
//         msgId: '1',
//         text: 'Hello',
//         attachment: 'https://example.com/image.jpg',
//       },
//     ],
//     responses: [],
//   });

//   newMessage.save()
//     .then((savedMessage) => {
//       console.log('Message saved:', savedMessage);
//     })
//     .catch((error) => {
//       console.error('Error saving message:', error);
//     });


//? RETRIEVE MESSAGE

// Message.find()
//      .then((messages) => {
//        console.log('Messages:', messages);
//      })
//      .catch((error) => {
//        console.error('Error retrieving messages:', error);
//      });

//?UPDATE MESSAGE

// const messageId = '1234567890'; // ID of the message to update

// Message.findByIdAndUpdate(messageId, { $push: { responses: { text: 'Thanks!' } } })
//   .then((updatedMessage) => {
//     console.log('Message updated:', updatedMessage);
//   })
//   .catch((error) => {
//     console.error('Error updating message:', error);
//   });


//? DELETE MESSAGE

// const messageId = '1234567890'; // ID of the message to delete

// Message.findByIdAndDelete(messageId)
//   .then(() => {
//     console.log('Message deleted');
//   })
//   .catch((error) => {
//     console.error('Error deleting message:', error);
//   });