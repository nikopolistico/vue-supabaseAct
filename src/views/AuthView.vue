<template>
  <section>
    <!-- Background animation spans -->
    <span v-for="index in 100" :key="index" class="background-span"></span>

    <!-- Sign-in form -->
    <v-container class="d-flex justify-center align-center fill-height">
      <v-card class="signin" elevation="8">
        <v-card-title class="title">Sign In / Sign Up</v-card-title>
        
        <v-form @submit.prevent="handleLogin" class="form">
          <v-text-field 
            v-model="email" 
            label="Email" 
            outlined
            color="primary"
            required
            dense
          ></v-text-field>
          <v-text-field 
            v-model="password" 
            label="Password" 
            type="password"
            outlined
            color="primary"
            required
            dense
          ></v-text-field>

          <div class="links">
            <v-btn @click="handleSignUp" color="primary" class="big-btn">Sign Up</v-btn>
            <v-btn @click="handleLogin" color="success" class="big-btn">Log In</v-btn>
          </div>

          <v-btn @click="handleLogout" color="error" class="logout-btn">Log Out</v-btn>

          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </v-form>
      </v-card>
    </v-container>
  </section>
</template>

<script>
import { ref } from 'vue';
import { signUp, login, logout } from '../supabase'; // Import Supabase authentication functions

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const handleSignUp = async () => {
      const { data, error } = await signUp(email.value, password.value);
      if (error) {
        errorMessage.value = `Sign Up Error: ${error.message}`;
      } else {
        alert('Sign Up Successful', data);
      }
    };

    const handleLogin = async () => {
      const { data, error } = await login(email.value, password.value);
      if (error) {
        errorMessage.value = `Login Error: ${error.message}`;
      } else {
        alert('Login Successful', data);
      }
    };

    const handleLogout = async () => {
      const { error } = await logout();
      if (error) {
        errorMessage.value = `Logout Error: ${error.message}`;
      } else {
        alert('Logged Out Successfully');
      }
    };

    return {
      email,
      password,
      handleSignUp,
      handleLogin,
      handleLogout,
      errorMessage,
    };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Orbitron', sans-serif; /* Futuristic robotic font */
}

section {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle, #2a2d34, #131519); /* Darker, tech-inspired background */
  overflow: hidden;
}

.background-span {
  position: absolute;
  width: 15px;
  height: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: move 6s infinite alternate;
}

@keyframes move {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(calc(100vw - 10px), calc(100vh - 10px));
  }
}

.signin {
  width: 400px;
  background: #202329; /* Darker background for the card */
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  color: #ffffff; /* White text for better contrast */
}

.title {
  font-size: 1.6em;
  color: #ffffff; /* White text */
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 20px;
}

.error-message {
  color: #ff3860;
  text-align: center;
  margin-top: 15px;
}

.links {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
}

.big-btn {
  width: 48%; /* Equal width for both buttons */
  font-size: 0.9em;
  padding: 10px 20px;
  border-radius: 25px; /* Rounded buttons for modern look */
  text-transform: uppercase;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.big-btn:hover {
  transform: scale(1.05); /* Slight hover effect for interactivity */
}

.logout-btn {
  width: 100%;
  margin-top: 10px;
  font-size: 0.8em;
  padding: 8px;
  border-radius: 25px;
  text-transform: uppercase;
  background-color: #ff3860;
  color: white;
}

@media (max-width: 600px) {
  .signin { 
    width: 90%;
  }
}
</style>
