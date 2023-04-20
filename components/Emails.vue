<!-- Please remove this file from your project -->
<template>
    <div>
        <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent ">
                <article class="tile is-child box has-background-grey-dark has-text-white-bis">
                    <p class="title has-text-white-bis" v-text="count"></p>
                    <p class="subtitle has-text-white-bis	">Emails</p>
                </article>
            </div>
        </div>
        <div v-if="!sendemail">
            <table v-if="!loader" class="table is-fullwidth is-striped">
                <tbody>
                    <tr >
                        <td width="5%"><i class="fa fa-bell-o">id</i></td>
                        <td class="has-text-centered" >Title</td>
                        <td class="has-text-centered">destination</td>
                        <td class="has-text-centered">Date</td>
                        <td class="has-text-centered">
                            <a class="button mx-1 is-small is-primary">Opreation</a>
                        </td>
                    </tr>
                    <tr v-for="(c , i) in category" :key="i">
                        <td width="5%"><i class="fa fa-bell-o">-</i></td>
                        <td class="has-text-centered" v-text="c.title"></td>
                        <td class="has-text-centered" v-text="c.destination"></td>
                        <td class="has-text-centered" v-text="c.date"></td>
                        <td class="has-text-centered">
                            <!-- <a class="button mx-1 is-small is-primary" @click="VisitProduct(c.id)" :data-action="c.id">Visit</a> -->
                            <a class="button mx-1 is-small is-danger" @click="del(c.id)" :data-action="c.id">Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        
    </div>
</template>

<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref } from 'vue';
const category = ref();
const count = ref();
const sendemail = ref(false);
const user = ref('');

async function get(){
    category.value = await axios.get('http://localhost/afam-panel/show-email')
    count.value = category.value.data.length 
    category.value = category.value.data
}

function del (id){
    Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            Delete(id)
        }
    })
}
async function Delete(id){
    let post = await axios.post('http://localhost/afam-panel/delete-email',{id : id})
    count.value = post.data.fields.length 
    if(post.data == false){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: post.data.text,
        })
    }else{
        Swal.fire({
            icon: 'success',
            title: post.data.text,
        })
        category.value = post.data.fields
    }
}

get()

</script>
