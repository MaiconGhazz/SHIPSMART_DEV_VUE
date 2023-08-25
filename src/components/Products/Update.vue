<template>
  <card>
    <h1>Cadastrar Contato</h1>
    <form>
      <input v-model="description" type="text" placeholder="Descrição" />
      <input v-model="price" type="text" placeholder="Valor" />
      <input v-model="profit_margin" type="text" placeholder="Margem de Lucro" />

      <button @click="update" type="button">Cadastra</button>
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
      description: '',
      price: '',
      profit_margin: '',
    }
  },
  mounted() {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    }
    this.$nextTick(function () {
      api.get('/products/' + this.$route.params.id, {
          headers: headers
        })
        .then((response) => {          
          if(response.data) {
            this.description = response.data.data.description;
            this.price = response.data.data.price;
            this.profit_margin = response.data.data.profit_margin;
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

      api.post('products/update/' + this.$route.params.id , this.$data, {
        headers: headers
      }).then((response) => {
        if (response.data) {
          window.location.href = '/products';
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