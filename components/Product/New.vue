<!-- Please remove this file from your project -->
<template>
<!-- -->
    <form @submit.prevent="addProduct()" class="columns is-multiline" action="http://localhost/afam-wp/26-2/" method="get" enctype="multipart/form-data">
            <div class="field column is-two-thirds ">
                <label class="label">Name</label>
                <div class="control">
                    <input class="input" name="name" type="text" placeholder="Product Name" required>
                </div>
            </div>
            <div class="column file has-name is-boxed is-two-thirds">
                <label class="label">Image</label>
                <label class="file-label">
                    <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                        Choose a file…
                    </span>
                    </span>
                    <span class="file-name">
                    File name ...
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

            <div class="field column is-two-thirds">
            <label class="label">Category</label>
            <div class="control">
                <div class="select">
                <select name="category" required>
                    <option>Select </option>
                    <option v-for="( cat , i) in category" :key="i" v-text="cat.name" :value="cat.id" @click="selectCat(cat.id)"></option>
                </select>
                </div>
            </div>
            </div>

            <div class="field column is-two-thirds">
            <label class="label">Description</label>
            <div class="control">
                <textarea class="textarea" placeholder="Description..."></textarea>
            </div>
        </div>
        
        <!-- <div class="field column is-two-thirds">
            <label class="label">Is it visible to everyone?</label>
            <div class="control">
                <label class="radio">
                <input type="radio" checked name="question">
                Yes
                </label>
                <label class="radio">
                <input type="radio" name="question">
                No
                </label>
            </div>
        </div> -->

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

<script>
// import { create } from 'domain';
// import { computed } from 'vue';
import axios from 'axios';

    export default {
        data(){
            return{
                category:{},
                hashtag:'',
                file:'',
                catId: 0
            }
        },
        create(){
        },
        mounted: async function(){
            
            this.category = await axios.get('http://panel.mehdi-abasian.ir/wp-json/wl/v1/product_cat')
            this.category = this.category.data
            
            // console.log(this.category)
            // this.$store.dispatch('GetCategory');
            // console.log('lkkkkk')
        },
        methods:{
            async addProduct(){
                var formData = new FormData();
                var imagefile = document.querySelector('#file');
                formData.append("image", imagefile.files[0]);
                formData.append("url", 'test');
                console.log('>> formData >> ', formData);
                // if(this.catId != 0){
                    let post = await axios.post('http://localhost/afam-wp/26-2/', {
                        imgurl: 'test',
                        product_cat: this.catId,
                        hashtag: this.hashtag,
                        data: formData,
                    }
                     , {
                        headers: {
                        'Content-Type': 'multipart/form-data; charset=utf-8; boundary=" 5645855'
                        }
                    }
                    )
                    console.log(post.data)
                // }else{
                //     alert('لطفا یک دسته بندی محصول را مشخص کنید | Please specify a product category')
                // }
            },
            selectCat(id){
                this.catId = id
            },
        },
        computed:{
            loadeCategory(){
                return this.$store.getters.loadeCategory;
            }
        }
    }
</script>
