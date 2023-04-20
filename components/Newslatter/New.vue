<!-- Please remove this file from your project -->
<template>
    <div>
        <div class="tile is-ancestor has-text-centered">
            <div class="tile is-parent ">
                <article class="tile is-child box has-background-grey-dark has-text-white-bis">
                    <p class="subtitle has-text-white-bis">New email</p>
                </article>
            </div>
        </div>
        <form @submit.prevent="addEmail()" class="columns is-multiline" enctype="multipart/form-data">
            <div class="field column is-two-thirds ">
                <label class="label">Title</label>
                <div class="control">
                    <input class="input" name="name" v-model="form_Email.title" type="text" placeholder="Product Name" required>
                </div>
            </div>
            
            <div class="field column is-two-thirds">
                <label class="label">Recipients</label>
                <div class="control">
                    <div class="select">
                    <select name="category" v-model="form_Email.destination" required>
                        <option value="Contact_us">Contact us</option>
                        <option value="Newslatter">Newslatter</option>
                        <option value="Newslatter_&_Contact_us">Newslatter & Contact us</option>
                    </select>
                    </div>
                </div>
                </div>

                <div class="field column is-two-thirds">
                <label class="label">Content</label>
                <div class="control">
                    <textarea class="textarea" v-model="form_Email.content" required placeholder="Description..."></textarea>
                </div>
            </div>

            <div class="field column is-two-thirds is-grouped">
                <div class="control">
                    <button type="submit" class="button is-link" >Submit</button>
                </div>
            
            </div>
        </form>
    </div>
    
</template>

<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref } from 'vue';


const form_Email = ref({
    title : '',
    destination : '',
    content : '',
    date : '0000-00-00',
});

async function addEmail(){
    let post = await axios.post('http://localhost/afam-panel/new-email',form_Email.value)
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
    }
    console.log(post.data)
}

</script>
