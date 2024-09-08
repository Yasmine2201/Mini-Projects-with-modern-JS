import Controller from './chat/chat_controller.js';

const footerUserUI = document.querySelector('.footer-user');
const contactsListUI = document.querySelector('.contacts-list');

const chatHeaderUI = document.querySelector('.header-user');
const messageListUI = document.querySelector('.message-list');

const messageInputUI = document.getElementById('messageInput');
const sendButtonUI = document.querySelector('.input-container button');

const logout = document.querySelector('.logout-container');

document.addEventListener('DOMContentLoaded', () => {


    auth.onAuthStateChanged(currentUser => {

        if (currentUser) {           
            
            console.log("Current User UID:", currentUser.uid);
            
            const chatController = new Controller(currentUser.uid, footerUserUI,contactsListUI,
                                chatHeaderUI,messageListUI,sendButtonUI,messageInputUI);

           
            chatController.init();
            
            
            logout.addEventListener('click', () =>{
                auth.signOut().then(() => {
                    console.log("User signed out");
                    location.href = 'index.html';
                  }).catch((error) => {
                    console.error("Error signing out: ", error);
                  });
            })
        } 

        else console.log("No user is signed in.");
    })
   
});



