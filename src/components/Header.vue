<template>
    <div>
        <h1>
            Ladder Hero
        </h1>
        <h3>
            Login
        </h3>
    </div>
</template>

<script>
    export default {
        name: 'Header',
    }
</script>

<style scoped>
div {
    background-color: #2c3e50;
    text-align: left;
    color: #faf3e7;
    margin-bottom: 3rem;
    width: 100%;
    display: flex;
    align-items: center;
}
h1 {
    margin-left: 2.6rem;
    margin-bottom: 0;
    margin-top: 0;
    margin-right: 2rem;
    padding: 2rem 0 2.5rem;
    font-size: 2.5rem;
    display: inline-block;
    line-height: .7em;
}
h3 {
    display: inline-block;
    margin: 0;
}
h3:hover {
    color: #42b955;
    cursor: pointer;
    transition: all .3s ease;
}
</style>