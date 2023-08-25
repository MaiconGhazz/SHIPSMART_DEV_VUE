<template>
    <main>
        <div>
            <Router-link to="/home"><button style="margin: 0px 0 60px 0px;padding: 10px 40px;background: #18af06;color: white;">Home</button></Router-link>
        </div>
        <h1>Produtos</h1>
        <table>
            <thead>
                <tr>
                    <th>Codigo</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Margem de Lucro</th>
                    <th>Fornecedor</th>
                    <th>Codigo do Fornecedor</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items">
                    <td>{{ item.code }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.price }}</td>
                    <td>{{ item.profit_margin }}</td>
                    <td>{{ item.client[0].name }}</td>
                    <td>{{ item.code_client }}</td>
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
import api from '../../services/api.ts';

export default {
    name: 'Products',
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
            api.get('/products/', {
                headers: headers
            })
                .then((response) => {
                    this.items = response.data.products;
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

            api.post('products/delete', data, {
                headers: headers
            }).then((response) => {
                if (response.data) {
                    window.location.href = '/products';
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        update (id) {
            window.location.href = '/products/update/' + id;
        },
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