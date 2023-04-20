<!-- Please remove this file from your project -->
<template>
       <div>
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><a href="../">Dashboard</a></li>
                <li class="is-active"><a href="#" aria-current="page">Admin</a></li>
            </ul>
        </nav>
        <section class="hero is-info welcome is-small">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Hello, Admin.
                    </h1>
                    <h2 class="subtitle">
                        I hope you are having a great day!
                    </h2>
                </div>
            </div>
        </section>
        <section class="info-tiles pt-5">
            <div class="tile is-ancestor has-text-centered">
                <div class="tile is-parent ">
                    <article class="tile is-child box has-background-grey-dark has-text-white-bis">
                        <p class="title has-text-white-bis" v-text="numberMember"></p>
                        <p class="subtitle has-text-white-bis">Members</p>
                    </article>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child box has-background-grey-dark	">
                        <p class="title has-text-white-bis" v-text="numberProduct"></p>
                        <p class="subtitle has-text-white-bis">Products</p>
                    </article>
                </div>
                <div class="tile is-parent">
                    <article class="tile is-child box has-background-grey-dark	">
                        <p class="title has-text-white-bis" v-text="numberContactUs"></p>
                        <p class="subtitle has-text-white-bis">Contact</p>
                    </article>
                </div>
                
            </div>
        </section>
        
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';


const numberProduct = ref(0)
const numberMember = ref(0)
const numberContactUs = ref(0)

async function get (){
    let product = await axios.get('http://localhost/afam-panel/show-product')
    numberProduct.value = product.data.length
    let member = await axios.get('http://localhost/afam-panel/show-newsletter')
    numberMember.value = member.data.length
    console.log(member.data.length)
    let content = await axios.get('http://localhost/afam-panel/show-contact')
    numberContactUs.value = content.data.length
}
get()
</script>
