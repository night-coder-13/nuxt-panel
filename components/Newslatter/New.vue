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
        <form @submit.prevent="addProduct()" class="columns is-multiline" action="http://localhost/afam-wp/26-2/" method="get" enctype="multipart/form-data">
            <div class="field column is-two-thirds ">
                <label class="label">Title</label>
                <div class="control">
                    <input class="input" name="name" type="text" placeholder="Product Name" required>
                </div>
            </div>
            
            <div class="field column is-two-thirds">
                <label class="label">Recipients</label>
                <div class="control">
                    <div class="select">
                    <select name="category" required>
                        <option>Select </option>
                        <option>Contact us </option>
                        <option>Newslatter </option>
                        <option>Newslatter & Contact us </option>
                    </select>
                    </div>
                </div>
                </div>

                <div class="field column is-two-thirds">
                <label class="label">Content</label>
                <div class="control">
                    <textarea class="textarea" placeholder="Description..."></textarea>
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

<script>


</script>
