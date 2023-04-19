<!-- Please remove this file from your project -->
<template>
    <div>
        <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent ">
                <article class="tile is-child box has-background-grey-dark has-text-white-bis">
                    <p class="title has-text-white-bis" v-text="count"></p>
                    <p class="subtitle has-text-white-bis	">Page</p>
                </article>
            </div>
        </div>
        <div v-if="!edit_catalog.status">
            <table v-if="!loader" class="table is-fullwidth is-striped">
                <tbody>
                    <tr >
                        <td width="5%"><i class="fa fa-bell-o">id</i></td>
                        <td class="has-text-centered" >Title</td>
                        <td class="has-text-centered">Image</td>
                        <td class="has-text-centered">
                            <a class="button mx-1 is-small is-primary">Opreation</a>
                        </td>
                    </tr>
                    <tr v-for="(c , i) in category" :key="i">
                        <td width="5%"><i class="fa fa-bell-o">-</i></td>
                        <td class="has-text-centered" v-text="c.title"></td>
                        <td class="has-text-centered"><img :src="'http://localhost/afam-panel/public/upload/'+c.image_url" width="100px" alt=""></td>
                        <td class="has-text-centered">
                            <!-- <a class="button mx-1 is-small is-primary" @click="VisitProduct(c.id)" :data-action="c.id">Visit</a> -->
                            <a class="button mx-1 is-small is-danger" @click="del(c.id)" :data-action="c.id">Delete</a>
                            <a class="button mx-1 is-small is-info" @click="editCatalog(c.id , c.image_url , c.title)" :data-action="c.id">Edit</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <form v-else @submit.prevent="update()" class="columns is-multiline" action="http://localhost/afam-wp/26-2/" method="get" enctype="multipart/form-data">
            
            
            <div class="field column is-two-thirds ">
                <label class="label">Title</label>
                <div class="control">
                    <input class="input" name="name" v-model="edit_catalog.title" type="text" placeholder="Product Name" required>
                </div>
            </div>
            <div class="column file has-name is-boxed is-two-thirds">
                    <label class="file-label">
                        <input type="file" id="file" class="file-input" ref="file" @change="File()" />
                        <span class="file-cta">
                        <span class="file-icon">
                            <i class="fas fa-upload"></i>
                        </span>
                        <span class="file-label">
                            Choose a file…
                        </span>
                        </span>
                        <span class="file-name" v-text="filename">
                            
                        </span>
                    </label>
                </div>
            <div class="field column is-two-thirds is-grouped">
                <div class="control">
                    <button type="submit" class="button is-link" >Submit</button>
                </div>
                <div class="control">
                    <button @click="editCatalog('-')" class="button is-link is-light">Cancel</button>
                </div>
            </div>

        </form>
        
    </div>
</template>

<script setup>
import axios from 'axios';
import { async } from 'q';
import Swal from 'sweetalert2';
import { ref } from 'vue';
const category = ref();
const count = ref();
const filename = ref();
const edit_catalog = ref({
    status:false,
    id:0,
    title:'',
    image_url:'',
});
const file = ref('');

async function get(){
    category.value = await axios.get('http://localhost/afam-panel/catalog')
    count.value = category.value.data.length 
    category.value = category.value.data
}
function editCatalog(id , image_url , title){
    edit_catalog.value.status = !edit_catalog.value.status;
    edit_catalog.value.id = id;
    edit_catalog.value.image_url = image_url;
    edit_catalog.value.title = title;
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
        if (result.dismiss != "cancel") {
            Delete(id)
        }
    })
}
async function Delete(id){
    let post = await axios.post('http://localhost/afam-panel/delete-catalog/',{id : id})
    count.value = post.data.length 
    if(post.data.status == false){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: post.data.text,
        })
        category.value = {}
    }else{
        Swal.fire({
            icon: 'success',
            title: 'Deleted!',
        })
        category.value = post.data
    }
}
function File(){
    filename.value = file.value.files[0]['name']
}
async function update(){
    let formData = new FormData()
    formData.append('file' , file.value.files[0])
    formData.append('title' , edit_catalog.value.title)
    formData.append('id' , edit_catalog.value.id)
    let post = await axios.post('http://localhost/afam-panel/update-catalog/',formData)
    if(post.data.status == false){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: post.data.text,
        })
    }else{
        edit_catalog.value.status = !edit_catalog.value.status;
        get()
        Swal.fire({
            icon: 'success',
            title: post.data.text,
        })
    }
}

get()
</script>
