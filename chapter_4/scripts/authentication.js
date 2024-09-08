class Authentication {

  initEventListeners() {
    const loginForm = document.querySelector('.login-form');
    const signUpForm = document.querySelector('.signup-form');

    if (loginForm) {
      // We're on login.html
      loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }
    
    if (signUpForm) {
      // We're on signup.html
      signUpForm.addEventListener('submit', (e) => this.handleSignup(e));
    }
  }

  async handleLogin(event) {
    event.preventDefault();
    const loginForm = event.target;
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      console.log('User signed in:', userCredential.user.uid);
      location.href = 'chat.html'; // Redirect after successful login
    } catch (error) {
      console.error('Error signing in:', error);
      this.displayError('login-error', "Error: Please check your entries");
    }
  }

  async handleSignup(event) {
    event.preventDefault();
    const signUpForm = event.target;
    const username = signUpForm.username.value;
    const email = signUpForm.email.value;
    const password = signUpForm.password.value;
    console.log("password",password);
    const confirmPassword = signUpForm.confirmpassword.value;
    console.log("confirmed password", confirmPassword);

    if (password !== confirmPassword) {
      this.displayError('signup-error', "Error: Passwords must be the same");
      return;
    }

    if (!this.checkPasswordStrength(password)) {
      this.displayError('signup-error', 'Error: Password is too weak');
      return;
    }

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const userData = {
        username,
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      await db.collection('Users').doc(userCredential.user.uid).set(userData);
      console.log('User', username, 'added to Firestore!');
      location.href = 'chat.html'; // Redirect after successful signup
    } catch (error) {
      console.error('Error signing up:', error);
      this.displayError('signup-error', 'Error while signing up ! Please report the problem');
    }
  }

  checkPasswordStrength(password) {
    // Criteria: at least 8 characters, one uppercase, one lowercase, one number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
  }

  displayError(elementId, message) {
    const errorContainer = document.getElementById(elementId);
    errorContainer.textContent = message;
  
  }
}

// Initialize Authentication class when the document is ready
document.addEventListener('DOMContentLoaded', () => new Authentication().initEventListeners());
