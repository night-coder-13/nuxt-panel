<!-- Please remove this file from your project -->
<template>
    <form class="columns is-multiline" action="" method="get" enctype="multipart/form-data">
            <div class="field column is-two-thirds ">
                <label class="label">Title</label>
                <div class="control">
                    <input class="input" name="title" type="text" placeholder="Title" required>
                </div>
            </div>
            <div class="column file has-name is-boxed is-two-thirds">
                <label class="file-label">
                    <input class="file-input" type="file" name="resume">
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
            <div class="field column is-two-thirds">
            <label class="label">Description</label>
            <div class="control">
                <textarea class="textarea" placeholder="Description..."></textarea>
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


</script>
