<template>
  <card>
    <h1>Cadastrar Contato</h1>
    <form>
      <input name="name" id="name" v-model="name" type="text" placeholder="Nome de Contato" />
      <input name="email" id="email" v-model="email" type="text" placeholder="E-mail de Contato" />
      <input name="tel" id="tel" v-model="tel" type="text" placeholder="Telefone de Contato" />
      <input @keyup="Search" name="cep" id="cep" v-model="cep" type="text" placeholder="CEP" />
      <input name="city" id="city" v-model="city" type="text" placeholder="Cidade" />
      <input name="district" id="district" v-model="district" type="text" placeholder="Bairro" />
      <input name="end" id="end" v-model="end" type="text" placeholder="Endereço" />
      <input name="state" id="state" v-model="state" type="text" placeholder="Estado" />

      <button @click="add" type="button">Cadastrar</button>
    </form>
  </card>
</template>

<script>
import axios from 'axios';
import api from '../services/api.ts';

export default {
  name: 'Update',
  data() {
    return {
      name: '',
      email: '',
      tel: '',
      cep: '',
      city: '',
      district: '',
      end: '',
      state: '',
    }
  },
  methods: {
    add() {
      const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }

      api.post('contact/create', this.$data, {
        headers: headers
      }).then((response) => {
        if (response.data) {
          window.location.href = '/home';
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    Search() {
      let url = 'https://cep.awesomeapi.com.br/json/' + document.getElementById('cep').value;
      axios.get(url).then((response) => {
        if (response.data) {
          document.getElementById('city').value = response.data.city;
          document.getElementById('district').value = response.data.district;
          document.getElementById('end').value = response.data.address;
          document.getElementById('state').value = response.data.state;
        }
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    },
  },
};
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