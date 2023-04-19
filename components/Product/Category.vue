<!-- Please remove this file from your project -->
<template>
    <form class="columns is-multiline" @submit.prevent="submit()" enctype="multipart/form-data">
            <div class="field column is-two-thirds ">
                <label class="label">Title</label>
                <div class="control">
                    <input class="input" name="title" v-model="form.title" type="text" placeholder="Title" required>
                </div>
            </div>
            <div class="field column is-two-thirds">
                <label class="label">Symbol</label>
                <div class="control">
                    <input class="input" name="title" v-model="form.symbol" type="text" placeholder="Symbol" required>
                </div>
            </div>
            <div class="field column is-two-thirds">
                <label class="label">Description</label>
                <div class="control">
                    <textarea class="textarea" v-model="form.description" placeholder="Description..."></textarea>
                </div>
            </div>
            <div class="column file has-name is-boxed is-two-thirds">
                <label class="label">image</label>
                <label class="file-label">
                    <input class="file-input" ref="image" type="file" name="resume" @change="change(true)">
                    <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                        Choose a file…
                    </span>
                    </span>
                    <span class="file-name" v-text="form.n_i">
                    </span>
                </label>
            </div>
            <div class="column file has-name is-boxed is-two-thirds">
                <label class="label">background image</label>
                <label class="file-label">
                    <input class="file-input" ref="image_bg" type="file" name="resume" @change="change(false)">
                    <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                        Choose a file…
                    </span>
                    </span>
                    <span class="file-name" v-text="form.n_i_b">
                    </span>
                </label>
            </div>

            <div class="field column is-two-thirds is-grouped">
                <div class="control">
                    <button type="submit" class="button is-link">Submit</button>
                </div>
                <div class="control">
                    <button class="button is-link is-light">Cancel</button>
                </div>
            </div>
        </form>
</template>

<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref } from 'vue';

const image = ref();
const image_bg = ref();
const form = ref({
    title : '',
    symbol : '',
    description : '',
    n_i : 'name ...',
    n_i_b : 'name ...'
});
function change (status){
    if(status)
        form.value.n_i = image.value.files[0]['name']
    else
        form.value.n_i_b = image_bg.value.files[0]['name']
}
async function submit(){
    let formData = new FormData();
    formData.append('image',image.value.files[0])
    formData.append('image_bg',image_bg.value.files[0])
    formData.append('title',form.value.title)
    formData.append('symbol',form.value.symbol)
    formData.append('description',form.value.description)
    let post = await axios.post('http://localhost/afam-panel/new-category',formData);
    if(post.data.status == false){
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
        form.value = {
            title : '',
            symbol : '',
            description : '',
            n_i : 'name ...',
            n_i_b : 'name ...'
        }
    }
}
</script>
