<!-- Please remove this file from your project -->
<template>
    <form class="columns is-multiline" action="" method="get" enctype="multipart/form-data">
        {{ $store.getters.loadeCategory }}
            <div class="field column is-two-thirds ">
                <label class="label">Name</label>
                <div class="control">
                    <input class="input" name="name" type="text" placeholder="Product Name" required>
                </div>
            </div>

            <div class="field column is-two-thirds ">
            <label class="label">Hashtags</label>
            <div class="control ">
                <input class="input" name="hashtag" type="text" placeholder="Hashtag1|Hashtag2|..." required>
                
            </div>
            <p class="has-text-danger m-1">Hashtag guide **********</p>
            </div>

            <div class="field column is-two-thirds">
            <label class="label">Category</label>
            <div class="control">
                <div class="select">
                <select name="category" required>
                    <option>Select </option>
                    <option v-for="( cat , i) in category" :key="i" v-text="cat.name" :value="cat.id"></option>
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
        
        <div class="field column is-two-thirds">
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

<script>
// import { create } from 'domain';
// import { computed } from 'vue';
import axios from 'axios';

    export default {
        data(){
            return{
                category:{}
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
        computed:{
            loadeCategory(){
                return this.$store.getters.loadeCategory;
            }
        }
    }
</script>
