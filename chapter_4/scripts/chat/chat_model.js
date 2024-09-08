export class ChatRoom {
    constructor(username, contactUsername){
        this.username = username;
        this.contactUsername = contactUsername;
        this.unsubscribeSent = null; 
        this.unsubscribeReceived = null;
    }
    async addChat(message){
        const chat = {
            senderUsername : this.username,
            receiverUsername : this.contactUsername,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            message
        }
        console.log("adding a message to the db...");
        const response = await db.collection('Chats').add(chat);
        console.log("finished adding a message to the db...");
        return response;
    }
    getChats(callback) {

        // Subscribe to messages sent by the current user to the contact
        this.unsubscribeSent = db.collection('Chats')
            .where('senderUsername', '==', this.username)
            .where('receiverUsername', '==', this.contactUsername)
            .orderBy('createdAt')
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === 'added') callback(change.doc.data());
                });
            });
    
        // Subscribe to messages sent by the contact to the current user
        this.unsubscribeReceived = db.collection('Chats')
            .where('senderUsername', '==', this.contactUsername)
            .where('receiverUsername', '==', this.username)
            .orderBy('createdAt')
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === 'added') callback(change.doc.data());
                });
            });
    }
   
    updateChatRoom(newContactUsername) {
        this.contactUsername = newContactUsername;
        if (this.unsubscribeSent && this.unsubscribeReceived) {
            this.unsubscribeSent();
            this.unsubscribeReceived();

            // Clear the references

            this.unsubscribeSent = null; 
            this.unsubscribeReceived = null;
            
        }
    }    
}

export class User{

    constructor(currentUID){
        this.currentUID = currentUID;
        this.username = null;
    }

    async findUsername(){
        const snapshot = await db.collection('Users').get();
        
        snapshot.forEach((doc) => {
            if (doc.id == this.currentUID) this.username = doc.data().username; })
        
        return this.username;
    }
    async fetchUsersExceptCurrent(){
        let users = [];
        const snapshot = await db.collection('Users').get();
        snapshot.forEach((doc) => {
            if (doc.id != this.currentUID) users.push(doc.data()) 
        })
        return users;
    }

}