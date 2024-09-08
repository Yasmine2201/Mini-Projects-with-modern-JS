export class UI{
    constructor(contactsList, footerUser){
        this.contactsList = contactsList;
        this.footerUser = footerUser;
    }

    addContactUI(contactUsername){
        const html = 
        `<li class="contact-item">
            <div class="contact-info">
                <img src="images/human_${Math.floor(Math.random() * 10)}.png" alt="Avatar of human" class="user-avatar" />
                <span class="user-name">${contactUsername}</span>
            </div>
        </li>`;
    
        this.contactsList.innerHTML += html;
    }
    addUserFooterUI(username){
        const html = `
        <img id ="profilePic" src="images/human_${Math.floor(Math.random() * 10)}.png" alt="Avatar of human"class="user-avatar"/>
        <span class="user-name">${username}</span>
        `;
        this.footerUser.innerHTML += html;
    }
    
    openChatRoom(activeChatRoom, chatHeader, messageList){
        
        console.log("Opening a new ChatRoom ...");
        const Headerhtml = `
            <img src="images/human_${Math.floor(Math.random() * 10)}.png" alt="Avatar of contact"class="header-avatar" />
            <span class="user-name">${activeChatRoom.contactUsername}</span>
            `;

        chatHeader.innerHTML = Headerhtml;

        activeChatRoom.getChats((chat) =>{ 
            
            if (chat){
                let html = ``;
                if (chat.senderUsername == activeChatRoom.username) html = `<li class="message message-user">${chat.message}</li>`;
                else if (chat.senderUsername == activeChatRoom.contactUsername) html = `<li class="message message-responder">${chat.message}</li>`;
                
                messageList.innerHTML += html;  
            }
           
        })
    }
    clearChatRoomUI(messageList){
        messageList.innerHTML = '';
    }
}