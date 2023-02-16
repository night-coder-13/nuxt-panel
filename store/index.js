import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)
export default ()=>{
    const store = new Vuex.Store({
        state :{
            loadeCategory:[]
        },

        mutations :{
            getCategory(state , data){
                state.loadeCategory = data
            }
        },

        actions :{
            async GetCategory([commit]){
                try{
                    console.log('response.data')
                    const response = await axios.get('http://panel.mehdi-abasian.ir/wp-json/wl/v1/product_cat')
                    commit('getCategory',response.data)
                }catch(error){
                    console.log(error)
                }
                // commit('getCategory' , data);
            }
        },

        getters :{
            loadeCategory(state){
                return state.loadeCategory;
            }
        },
    })
    return store
}