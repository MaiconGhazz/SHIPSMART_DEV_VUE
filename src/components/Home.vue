<template>
    <main>
        <h1>Bem vindo</h1>
        <div id="menu">
            <div class="button">
                <Router-link to="/clients"><button>Clientes</button></Router-link>
            </div>
            <div class="button">
                <Router-link to="/products"><button>Produtos</button></Router-link>
            </div>
        </div>
    </main>
</template>

<style>
#app {
    width: 100%;
}

#menu {
    display: flex;
}

.button {
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