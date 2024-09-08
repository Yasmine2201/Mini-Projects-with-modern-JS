import { ChatRoom, User } from './chat_model.js';
import {UI} from './chat_ui.js';

class Controller{

    constructor(currentUID, footerUserUI, contactsListUI, chatHeaderUI, messageListUI, sendButtonUI,messageInputUI){
        this.currentUID = currentUID;
        this.footerUserUI = footerUserUI;
        this.contactsListUI = contactsListUI;
        this.chatHeaderUI = chatHeaderUI;
        this.messageListUI = messageListUI;
        this.sendButtonUI = sendButtonUI;
        this.messageInputUI = messageInputUI;
        this.currentUser = null;
        this.activeChatRoom = null;
        this.ui = null;
    }

    async init(){

        this.currentUser = new User(this.currentUID);
        this.ui = new UI(this.contactsListUI,this.footerUserUI);
        
        // Username displayed in the footer
        const username = await this.currentUser.findUsername();
        this.ui.addUserFooterUI(username);

        // List of contacts displayed
        const contactsList = await this.currentUser.fetchUsersExceptCurrent();
        contactsList.forEach(contact => this.ui.addContactUI(contact.username));

        // Default Chatroom created with contactUsername set to "default"
        this.activeChatRoom = new ChatRoom(username, "default contact"); 

        // Add Listeners
        this.addListeners();
    }

    async addListeners(){

        await this.contactsListUI.addEventListener('click', event => this.handleContactClick(event));

        this.sendButtonUI.addEventListener('click', event => this.handleSentButtonClick(event));
            
        this.messageInputUI.addEventListener('keydown', event => this.handleMessageEnter(event));
        
        this.footerUserUI.addEventListener('click', () => this.handleFooterUserClick());

    }

    async handleFooterUserClick() {
        // Get the profilePicInput element directly by its ID or query
        let profilePicInput = document.querySelector('#profilePicInput'); // The hidden file input element
        let profilePic = document.querySelector('#profilePic'); // The profile picture element (img)
    
        
        profilePicInput.addEventListener('change', (event) => {
            const file = event.target.files[0]; // Get the selected file
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageUrl = e.target.result;
                    profilePic.src = imageUrl; // Update the src of the avatar image
                };
                reader.readAsDataURL(file); // Read the file as a data URL
            }
        });
        
        // Trigger the file input click programmatically
        profilePicInput.click();
    }
    
    async handleContactClick(event){

        event.preventDefault(); 

        const contactItem = event.target.closest('.contact-item');
            
            if (contactItem) {

                const previouslySelected = this.contactsListUI.querySelector('.contact-item.selected');
                
                if (previouslySelected) previouslySelected.classList.remove('selected');

                contactItem.classList.add('selected');
               
                const contactUsername = contactItem.querySelector('.user-name').textContent;

                if (this.activeChatRoom.contactUsername !== contactUsername) {
                    
                    this.activeChatRoom.updateChatRoom(contactUsername);
                    this.ui.clearChatRoomUI(this.messageListUI);
                    this.ui.openChatRoom(this.activeChatRoom,this.chatHeaderUI,this.messageListUI);
                    
                    if (this.sendButtonUI.disabled || this.messageInputUI.disabled){
                    this.sendButtonUI.disabled = false;
                    this.messageInputUI.disabled = false;
                    }
                }     
                
            }
            else {
                console.log("User tried to click on a contact but failed ! Contact Item : ", contactItem);
            }
    }

    handleSentButtonClick(event){
        event.preventDefault(); 
            const message = this.messageInputUI.value.trim();
            if (message) {  
                console.log('Sending message:', message);
                this.activeChatRoom.addChat(message)
                .then(() => {
                    console.log("Added a new message");
                    this.messageListUI.scrollTo(0, this.messageListUI.scrollHeight);
                    this.messageInputUI.value = '';})
                .catch(error => console.log(error))
            } 
        }

    handleMessageEnter(event){
        if (event.key === 'Enter') {
            event.preventDefault(); 
            this.sendButtonUI.click(); 
            }
        }
    


}
export default Controller;