<template>
    <main>
        <h1>Agenda de contatos</h1>
        <div class="button">
            <Router-link to="/add"><button>Adicionar</button></Router-link>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>CEP</th>
                    <th>Cidade</th>
                    <th>Bairro</th>
                    <th>Endereço</th>
                    <th>Estado</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items">
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.tel }}</td>
                    <td>{{ item.cep }}</td>
                    <td>{{ item.city }}</td>
                    <td>{{ item.district }}</td>
                    <td>{{ item.end }}</td>
                    <td>{{ item.state }}</td>
                    <td>
                        <button @click="update(item.id)">Editar</button>
                        <button @click="deletar(item.id)">Excluir</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>


<script>
import axios from 'axios';
import api from '../services/api.ts';

export default {
    name: 'Update',
    data() {
        return {
            items: [],
        }
    },
    mounted() {
        const headers = {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
        }
        this.$nextTick(function () {
            api.get('/contact/', {
                headers: headers
            })
                .then((response) => {
                    this.items = response.data.contacts;
                }).catch((error) => {
                    console.log(error)
                }, 1000)
        })
    },
    methods: {
        deletar(id) {
            const data = {
                id: id
            };

            const headers = {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token'))
            }

            api.post('contact/delete', data, {
                headers: headers
            }).then((response) => {
                if (response.data) {
                    window.location.href = '/home';
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        update (id) {
            window.location.href = '/update/' + id;
        }
    },
};
</script>

<style>
#app {
    width: 100%;
}

.button {
    text-align: end;
    margin-bottom: 20px;
}

h1 {
    color: #5960ab;
    margin-bottom: 20px;
}

main {
    width: 90%;
    margin: 0 auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ccc;
    padding: 0.5rem;
}

th {
    background-color: #3d46ad;
    color: white;
}

td {
    text-align: center;
    background-color: #5960ab;
    color: white;
}

button {
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #ccc;
    cursor: pointer;
    margin: 0 10px;
}

button:hover {
    background-color: #aaa;
}
</style>