<!-- Please remove this file from your project -->
<template>
     <div class="content">
        <div class="field ">
            <label class="label">Category</label>
            <div class="control">
                <div class="select">
                    <select @change="SelectCategory(5,$event)" name="category" required>
                        <option>Select </option>
                        <option @click="SelectCategory(cat.id)" v-for="( cat , i) in category" :key="i" v-text="cat.title" :value="cat.id"></option>
                    </select>
                </div>
            <p class="help is-danger">Please select your desired category</p>
            </div>
        </div>
        <table v-if="!loader" class="table is-fullwidth is-striped">
            <tbody v-if="product">
                <tr v-for="(p , i) in product" :key="i">
                    <td width="5%"><i class="fa fa-bell-o">-</i></td>
                    <td v-text="p.title"></td>
                    <td class="level-right">
                        <a class="button mx-1 is-small is-primary" @click="VisitProduct(p.id)" :data-action="p.id">Visit</a>
                        <a class="button mx-1 is-small is-danger" @click="del(p.id)" :data-action="p.id">Delete</a>
                        <a class="button mx-1 is-small is-info" @click="EditProduct(p.id)" :data-action="p.id">Edit</a>
                    </td>
                </tr>
            </tbody>
            <div v-else>
                <p>No products have been added</p>
            </div>
        </table>
        <section v-else class="hero is-medium  ">
            <div class="hero-body">
                <p class="subtitle is-align-content-center is-flex is-justify-content-center h-6">
                    loading ...
                </p>
            </div>
        </section>
        
    </div>
</template>

<script setup>
import axios from 'axios';
import Swal from 'sweetalert2';
import { ref } from 'vue';

const loader = ref();
const product = ref({});
const category = ref({});
const catId = ref(0);

async function getCat (){
    category.value = await axios.get('http://localhost/afam-panel/get-category')
    category.value = category.value.data
}
getCat()
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
    let post = await axios.post('http://localhost/afam-panel/delete-product/',{id : id , cat_id : catId.value})
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
        product.value = post.data.fields
    }
}
function EditProduct(id){
    alert(id)
}
async function SelectCategory(id , e){
    loader.value = true
    product.value = await axios.get('http://localhost/afam-panel/get-product/'+e.target.value)
    product.value = product.value.data;
    loader.value = false
    catId.value = e.target.value
}

</script>
