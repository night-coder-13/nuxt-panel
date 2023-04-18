<!-- Please remove this file from your project -->
<template>
<!-- -->
    <form @submit.prevent="addProduct()" class="columns is-multiline" action="http://localhost/afam-wp/26-2/" method="get" enctype="multipart/form-data">
        <div class="field column is-two-thirds ">
            <label class="label">Name</label>
            <div class="control">
                <input class="input" name="name" :value="nameProduct" disabled  type="text" placeholder="Product Name" required>
            </div>
        </div>
        <div class="field column is-two-thirds">
            <label class="label">Category</label>
            <div class="control">
                <div class="select">
                <select name="category" @change="selectCat($event)" required>
                    <option>Select </option>
                    <option v-for="( cat , i) in category" :key="i" v-text="cat.title" :value="cat.id" ></option>
                </select>
                </div>
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
                <span class="file-name" v-text="fileName">
                    
                </span>
            </label>
        </div>
        <div class="field column is-two-thirds ">
        <label class="label">Hashtags</label>
        <div class="control ">
            <input class="input" v-model="hashtag" name="hashtag" type="text" placeholder="Hashtag1|Hashtag2|..." required>
            
        </div>
        <p class="has-text-danger m-1">*</p>
        </div>

        <div class="field column is-two-thirds is-grouped">
        <div class="control">
            <button type="submit" class="button is-link" >Submit</button>
        </div>
        <div class="control">
            <button class="button is-link is-light">Cancel</button>
        </div>
        </div>
    </form>
</template>

<script setup>
import Swal from 'sweetalert2';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const category = ref({});
const hashtag = ref();
const nameProduct = ref('select category');
const file = ref();
const fileName = ref();
const catId = ref(null);

onMounted(()=>{
    getCat()
})
function File(){
    fileName.value=file.value.files[0]['name']
}
async function getCat(){
    category.value = await axios.get('http://localhost/afam-panel/get-category')
    category.value = category.value.data
}
async function addProduct(){
    if(catId.value != null){
        var formData = new FormData();
        formData.append("image", file.value.files[0]);
        formData.append("title", nameProduct.value);
        formData.append("hashtag", hashtag.value);
        formData.append("cat_id", catId.value);
        let post = await axios.post('http://localhost/afam-panel/new-product', formData)
        if(post.data.status == false){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: post.data.text ,
            })
        }else{
            catId.value = null
            Swal.fire({
                icon: 'success',
                title: post.data.text,
            })
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please select category!',
        })
    }
    
}
async function selectCat(e ){
    let get = await axios.get('http://localhost/afam-panel/get-number-product/'+e.target.value)
    nameProduct.value = get.data.name
    catId.value = e.target.value
}

</script>
