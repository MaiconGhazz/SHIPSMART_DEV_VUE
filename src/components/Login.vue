<template>
  <card>
    <h1>Login</h1>
    <form>
      <input name="email" id="email" v-model="email" type="text" placeholder="E-mail" />
      <input name="password" id="password" v-model="password" type="password" placeholder="Password" />
      <button @click="login" type="button">Login</button>
    </form>
  </card>
</template>

<script setup>
import api from '../services/api.ts';

function login() {
    api.post('user/login', {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    }).then((response) => {
      localStorage.setItem('token', JSON.stringify(response.data.token) );
      if(response.data.token) {
        window.location.href = '/home';
      }
    }).catch((error) => {
      console.log(error);
    });
}

</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  color: rgb(68, 68, 185);
  font-weight: 700;
}

card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 20rem;
}

button {
  padding: 0.5rem;
  border: 1px solid rgb(68, 68, 185);
  border-radius: 4px;
  background-color: rgb(147, 147, 228);
  cursor: pointer;
  width: 17rem;
  color: rgb(68, 68, 185);
  font-weight: 700;
}

button:hover {
  background-color: #ddd;
}
</style>
