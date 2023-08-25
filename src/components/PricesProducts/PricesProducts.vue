<template>
    <main>
        <div>
            <Router-link to="/home"><button style="margin: 0px 0 60px 0px;padding: 10px 40px;background: #18af06;color: white;">Home</button></Router-link>
        </div>
        <h1 id="price">Tabela de Preços</h1>
        <table>
            <thead>
                <tr>
                    <th>Valor</th>
                    <th>Produto</th>
                    <th>Codigo do Produto</th>
                    <th>Cliente</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items">
                    <td>{{ item.price }}</td>
                    <td>{{ item.product }}</td>
                    <td>{{ item.code_product }}</td>
                    <td>{{ item.client }}</td>
                    <td>
                        <button @click="update(item.id)">Editar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>


<script>
import axios from 'axios';
import api from '../../services/api.ts';

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
            api.get('/prices/' + this.$route.params.id, {
                headers: headers
            })
                .then((response) => {
                    this.items = response.data.prices;
                    document.getElementById('price').innerHTML = 'Tabela de Preços de ' + response.data.client.name;
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

            api.post('prices/delete', data, {
                headers: headers
            }).then((response) => {
                if (response.data) {
                    window.location.href = '/prices/' + this.$route.params.id;
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        update (id) {
            window.location.href = '/prices/update/' + id;
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