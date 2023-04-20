<!-- Please remove this file from your project -->
<template>
    <div>
        <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent ">
                <article class="tile is-child box has-background-grey-dark has-text-white-bis">
                    <p class="title has-text-white-bis" v-text="count"></p>
                    <p class="subtitle has-text-white-bis	">Members</p>
                </article>
            </div>
        </div>
        <div v-if="!sendemail">
            <table v-if="!loader" class="table is-fullwidth is-striped">
                <tbody>
                    <tr >
                        <td width="5%"><i class="fa fa-bell-o">id</i></td>
                        <td class="has-text-centered" >Name</td>
                        <td class="has-text-centered">Email</td>
                        <td class="has-text-centered">Company name</td>
                        <td class="has-text-centered">Phone</td>
                        <td class="has-text-centered">Country</td>
                        <td class="has-text-centered">
                            <a class="button mx-1 is-small is-primary">Opreation</a>
                        </td>
                    </tr>
                    <tr v-for="(c , i) in category" :key="i">
                        <td width="5%"><i class="fa fa-bell-o">-</i></td>
                        <td class="has-text-centered" v-text="c.name"></td>
                        <td class="has-text-centered" v-text="c.email"></td>
                        <td class="has-text-centered" v-text="c.company_name"></td>
                        <td class="has-text-centered" v-text="c.phone"></td>
                        <td class="has-text-centered" v-text="c.country"></td>
                        <td class="has-text-centered">
                            <!-- <a class="button mx-1 is-small is-primary" @click="VisitProduct(c.id)" :data-action="c.id">Visit</a> -->
                            <a class="button mx-1 is-small is-danger" @click="del(c.id)" :data-action="c.id">Delete</a>
                            <a class="button mx-1 is-small is-info" @click="SendEmail(c.email)" :data-action="c.id">Send email</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <form v-else @submit.prevent="addEmail()" class="columns is-multiline" enctype="multipart/form-data">
            <div class="field column is-two-thirds ">
                <p>Send email to : {{ user }}</p>
            </div>
            
            <div class="field column is-two-thirds ">
                <label class="label">Title</label>
                <div class="control">
                    <input class="input" v-model="form_Email.title" name="name" type="text" placeholder="Product Name" required>
                </div>
            </div>
            <div class="field column is-two-thirds">
                <label class="label">Content</label>
                <div class="control">
                    <textarea class="textarea" v-model="form_Email.content" placeholder="Description..."></textarea>
                </div>
            </div>
            <div class="field column is-two-thirds is-grouped">
                <div class="control">
                    <button type="submit" class="button is-link" >Submit</button>
                </div>
                <div class="control">
                    <button @click="SendEmail('-')" class="button is-link is-light">Cancel</button>
                </div>
            </div>
        </form>
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
const form_Email = ref({
    title : '',
    destination : '',
    content : '',
    date : '0000-00-00',
});

async function get(){
    category.value = await axios.get('http://localhost/afam-panel/show-newsletter')
    count.value = category.value.data.length 
    category.value = category.value.data
}
async function addEmail(){
    form_Email.value.destination = user.value
    let post = await axios.post('http://localhost/afam-panel/new-email',form_Email.value)
    Swal.fire({
        icon: 'success',
        title: post.data.text,
    })
    sendemail.value= !sendemail.value;
}

function SendEmail(email){
    sendemail.value= !sendemail.value;
    user.value = email;
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
    let post = await axios.post('http://localhost/afam-panel/delete-member/',{id : id})
    if(post.data.status == false){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: post.data.text,
        })
    }else{
        if(post.data.fields != undefined){
            count.value = post.data.fields.length 
        }
        Swal.fire({
            icon: 'success',
            title: post.data.text,
        })
        category.value = post.data.fields
    }
}


get()
</script>
