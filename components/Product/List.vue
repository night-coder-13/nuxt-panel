<!-- Please remove this file from your project -->
<template>
     <div class="content">
        <div class="field ">
            <label class="label">Category</label>
            <div class="control">
                <div class="select">
                    <select @change="SelectCategory(5,$event)" name="category" required>
                        <option>Select </option>
                        <option @click="SelectCategory(cat.id)" v-for="( cat , i) in category" :key="i" v-text="cat.name" :value="cat.id"></option>
                    </select>
                </div>
            <p class="help is-danger">Please select your desired category</p>
            </div>
        </div>
        <table v-if="!loader" class="table is-fullwidth is-striped">
            <tbody>
                <tr v-for="(p , i) in product" :key="i">
                    <td width="5%"><i class="fa fa-bell-o">-</i></td>
                    <td v-text="p.title"></td>
                    <td class="level-right">
                        <a class="button mx-1 is-small is-primary" @click="VisitProduct(p.id)" :data-action="p.id">Visit</a>
                        <a class="button mx-1 is-small is-danger" @click="DeleteProduct(p.id)" :data-action="p.id">Delete</a>
                        <a class="button mx-1 is-small is-info" @click="EditProduct(p.id)" :data-action="p.id">Edit</a>
                    </td>
                </tr>
            </tbody>
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

<script>
import axios from 'axios';

export default {
    data(){
        return{
            loader:false,
            product:{},
            category:{},
        }
    },
    create(){
    },
    mounted: async function(){
        this.category = await axios.get('http://panel.mehdi-abasian.ir/wp-json/wl/v1/product_cat')
        this.category = this.category.data
    },
    computed:{
        loadeCategory(){
            return this.$store.getters.loadeCategory;
        }
    },
    methods:{
        VisitProduct(id){
            alert(id)
        },
        DeleteProduct(id){
            alert(id)
        },
        EditProduct(id){
            alert(id)
        },
        async SelectCategory(id , e){
            this.loader = true
            this.product = await axios.get('http://panel.mehdi-abasian.ir/wp-json/wl/v1/archive/'+e.target.value)
            this.product = this.product.data;
            this.loader = false
        }
    }
}
</script>
