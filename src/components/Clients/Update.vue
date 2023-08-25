<template>
  <card>
    <h1>Cadastrar Contato</h1>
    <form>
      <input v-model="name" type="text" placeholder="Nome" />
      <select v-model="type" style="width: 100%;height: 35px;border-radius: 5px;">
        <option disabled value="">Selecione</option>
        <option value="cpf">CPF</option>
        <option value="cnpj">CNPJ</option>
      </select>
      <input v-model="document" style="margin-top: 7px;" type="text" placeholder="E-mail de Contato" />

      <button @click="update" style="margin-top: 20px;" type="button">Cadastra</button>
    </form>
  </card>
</template>

<script>
import axios from 'axios';
import api from '../../services/api.ts';

export default {
  name: 'Update',
  data() {
    return {
      name: '',
      type: '',
      document: '',
    }
  },
  mounted() {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    }
    this.$nextTick(function () {
      api.get('/clients/' + this.$route.params.id, {
          headers: headers
        })
        .then((response) => {
          console.log(response);
          if(response.data) {
            this.name = response.data.data.name;
            this.document = response.data.data.document;
            this.type = response.data.data.type;
          }
        }).catch((error) => {
          console.log(error)
        }, 1000)
    })
  },
  methods: {
    update() {
      const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }

      api.post('clients/update/' + this.$route.params.id , this.$data, {
        headers: headers
      }).then((response) => {
        if (response.data) {
          window.location.href = '/clients';
        }
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