<template>
  <card>
    <h1>Cadastrar Contato</h1>
    <form>
      <input @keyup="Search" id="cep" v-model="cep" type="text" placeholder="CEP" />
      <input id="city" v-model="city" type="text" placeholder="Cidade" />
      <input id="district" v-model="district" type="text" placeholder="Bairro" />
      <input id="address" v-model="address" type="text" placeholder="Endereço" />
      <input id="state" v-model="state" type="text" placeholder="Estado" />
      <select v-model="type" style="width: 100%;height: 35px;border-radius: 5px;">
        <option disabled value="">Selecione</option>
        <option value="residence">Residencial</option>
        <option value="work">Trabalho</option>
        <option value="charge">Pagamento</option>
      </select>
      
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
      cep: '',
      city: '',
      district: '',
      address: '',
      state: '',
      type: '',
    }
  },
  mounted() {
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    }
    this.$nextTick(function () {
      api.get('/address/get/' + this.$route.params.id, {
          headers: headers
        })
        .then((response) => {
          console.log(response);
          if(response.data) {
            this.cep = response.data.data.cep;
            this.city = response.data.data.city;
            this.district = response.data.data.district;
            this.address = response.data.data.address;
            this.state = response.data.data.state;
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
            
      api.post('address/update/' + this.$route.params.id , this.$data, {
        headers: headers
      }).then((response) => {
        if (response.data) {
          window.location.href = '/clients';
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    Search() {
      let url = 'https://cep.awesomeapi.com.br/json/' + document.getElementById('cep').value;
      axios.get(url).then((response) => {
        if (response.data) {
          this.city = response.data.city;
          this.district = response.data.district;
          this.address = response.data.address;
          this.state = response.data.state;
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