<template>
    <div>
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><a href="Dashboard">Dashboard</a></li>
                <li class="is-active"><a href="#" aria-current="page">Catalog</a></li>
            </ul>
        </nav>
        <section class="hero is-info welcome is-small">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Manage Catalog
                    </h1>
                    <h2 class="subtitle">
                        You can add and remove images!
                    </h2>
                </div>
            </div>
        </section>
        <section class="info-tiles pt-5">
            <form class="columns is-multiline" action="" method="get" enctype="multipart/form-data">
                <div class="field column is-two-thirds ">
                    <label class="label">Title</label>
                    <div class="control">
                        <input class="input" v-model="title" name="title" type="text" placeholder="Title" required>
                    </div>
                </div>
                <!-- <div class="field column is-two-thirds ">
                    <label class="label">Hashtag</label>
                    <div class="control">
                        <input class="input" name="hashtag" type="text" placeholder="Hashtag" required>
                    </div>
                </div> -->
                <div class="column file has-name is-boxed is-two-thirds">
                    <label class="file-label">
                        <input type="file" @input="pickFile" id="file" class="file-input" ref="fileInput" v-on:change="handleFileUpload()"/>
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

                <div class="field column is-two-thirds is-grouped">
                    <div class="control">
                        <button type="submit" @click.prevent="submit()" class="button is-link">Submit</button>
                    </div>
                    
                </div>
            </form>
            <img :src="previewImage" @click="selectImage" class="img" alt="">
        </section>
       
    </div>
    
  </template>
  
  <script>
import axios from 'axios';
import Swal from 'sweetalert2';

    export default {
      /*
        Defines the data used by the component
      */
      data(){
        return {
          title: '',
          file: '',
          post:'',
          previewImage: null

        }
      },
      computed:{
        async c_submitFile(){
           
           let formData = new FormData();

           formData.append('file', this.file);
 
           let post = await axios.post('http://localhost/afam-panel/upload-catalog/', formData
               , {
               headers: {
                   'Content-Type': `multipart/form-data`,
               }
               }
           )
           this.previewImage = null
           Swal.fire({
               title: post.data.text,
           })
           if(post.data.status){
              return post.data.imageurl
           }else{
               return false
           }
       },
      },
      methods: {
        selectImage () {
            this.$refs.fileInput.click()
        },
        pickFile () {
            let input = this.$refs.fileInput
            let file = input.files
            if (file && file[0]) {
            let reader = new FileReader
            reader.onload = e => {
                this.previewImage = e.target.result
            }
            reader.readAsDataURL(file[0])
            this.$emit('input', file[0])
            }
        },
        async submit(){
            let imgurl = await this.c_submitFile
            if(imgurl != false){
                let post = await axios.post('http://localhost/afam-panel/new-catalog/', {
                    image_url : imgurl,
                    title : this.title
                    }
                )
                Swal.fire({
                    title: post.data.text,
                })
                this.title = ''
            }
        },
        async submitFile(){
           
            let formData = new FormData();

            formData.append('file', this.file);
  
            let post = await axios.post('http://localhost/afam-panel/upload-catalog/', formData
                , {
                headers: {
                    'Content-Type': `multipart/form-data`,
                }
                }
            )
            console.log(post.data)
            this.previewImage = null
            Swal.fire({
                title: post.data.text,
            })
            if(post.data.status){
               return post.data.imageurl
            }else{
                return false
            }
        },

        handleFileUpload(){
            this.file = this.$refs.fileInput.files[0];
        }
      }
    }
  </script>
  
  <style scoped >
.imagePreviewWrapper {
    width: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}
.img{
    width: 350px;
    margin: 0 auto 30px;
    cursor: pointer;
}
</style>