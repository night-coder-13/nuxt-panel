<!-- Please remove this file from your project -->
<template>
       <div>
        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li><a href="../">Dashboard</a></li>
                <li class="is-active"><a href="#" aria-current="page">Product</a></li>
            </ul>
        </nav>
        <section class="hero is-info welcome is-small">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Manage Products
                    </h1>
                    <h2 class="subtitle">
                        You can add and remove product!
                    </h2>
                </div>
            </div>
        </section>
        <section class="info-tiles pt-5">
            <p class="title">Add Category</p>
            <ProductCategory />
            <hr>
            <p class="title">Add Product</p>
            <ProductNew />
            <hr>
            <p class="title">List Product</p>
            <ProductList />
        </section>
        
    </div>
</template>

<script>


</script>
