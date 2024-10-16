<template>
  <section>
    <!-- Background animation spans -->
    <span v-for="index in 100" :key="index"></span>

    <!-- Sign-in form -->
    <div class="signin">
      <div class="content">
        <h2>Sign In</h2>
        <form @submit.prevent="handleLogin" class="form">
          <div class="inputBox">
            <input
              v-model="email"
              type="email"
              required
            />
            <i>Email</i>
          </div>
          <div class="inputBox">
            <input
              v-model="password"
              type="password"
              required
            />
            <i>Password</i>
          </div>
          <div class="links">
            <a href="#">Forgot password?</a>
            <a href="#">Sign Up</a>
          </div>
          <div class="inputBox">
            <input type="submit" value="Log In" />
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { login } from "../supabase"; // Ensure this path is correct

export default {
  name: "AuthView",
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");

    const handleLogin = async () => {
      try {
        const { error } = await login(email.value, password.value);
        if (error) {
          errorMessage.value = `Login Error: ${error.message}`;
        } else {
          alert("Login Successful");
          // Redirect or update authentication state here
        }
      } catch (err) {
        errorMessage.value = `An unexpected error occurred: ${err.message}`;
      }
    };

    return {
      email,
      password,
      handleLogin,
      errorMessage,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #000;
}

section {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  flex-wrap: wrap;
  overflow: hidden;
}

section::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(#000, #0f0, #000);
  animation: animate 5s linear infinite;
}

@keyframes animate {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

section span {
  position: relative;
  display: block;
  width: calc(6.25vw - 2px);
  height: calc(6.25vw - 2px);
  background: #181818;
  z-index: 2;
  transition: 1.5s;
}

section span:hover {
  background: #0f0;
  transition: 0s;
}

section .signin {
  position: absolute;
  width: 400px;
  background: #222;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  border-radius: 4px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.9);
}

section .signin .content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

section .signin .content h2 {
  font-size: 2em;
  color: #0f0;
  text-transform: uppercase;
}

section .signin .content .form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

section .signin .content .form .inputBox {
  position: relative;
  width: 100%;
}

section .signin .content .form .inputBox input {
  width: 100%;
  background: #333;
  border: none;
  outline: none;
  padding: 25px 10px 7.5px;
  border-radius: 4px;
  color: #fff;
  font-weight: 500;
  font-size: 1em;
}

section .signin .content .form .inputBox i {
  position: absolute;
  left: 0;
  padding: 15px 10px;
  font-style: normal;
  color: #aaa;
  transition: 0.5s;
  pointer-events: none;
}

section .signin .content .form .inputBox input:focus ~ i,
section .signin .content .form .inputBox input:valid ~ i {
  transform: translateY(-7.5px);
  font-size: 0.8em;
  color: #fff;
}

section .signin .content .form .links {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

section .signin .content .form .links a {
  color: #fff;
  text-decoration: none;
}

section .signin .content .form .links a:nth-child(2) {
  color: #0f0;
  font-weight: 600;
}

section .signin .content .form .inputBox input[type="submit"] {
  padding: 10px;
  background: #0f0;
  color: #000;
  font-weight: 600;
  font-size: 1.35em;
  letter-spacing: 0.05em;
  cursor: pointer;
}

section .signin .content .form .inputBox input[type="submit"]:active {
  opacity: 0.6;
}

.error-message {
  color: red;
  margin-top: -20px;
  margin-bottom: 20px;
  text-align: center;
}

@media (max-width: 900px) {
  section span {
    width: calc(10vw - 2px);
    height: calc(10vw - 2px);
  }
}

@media (max-width: 600px) {
  section span {
    width: calc(20vw - 2px);
    height: calc(20vw - 2px);
  }
}
</style>
