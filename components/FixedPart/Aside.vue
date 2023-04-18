<!-- Please remove this file from your project -->
<template>
  <aside class="menu is-hidden-mobile">
      <p class="menu-label">
          General
      </p>
      <ul class="menu-list">
            <li><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
            <li>
                <NuxtLink to="/catalog">Catalog</NuxtLink>
                <ul>
                    <li><NuxtLink to="/catalog/new">Add catalog</NuxtLink></li>
                    <li><NuxtLink to="/catalog/list">Catalog list</NuxtLink></li>
                </ul>
            </li>
            <li><NuxtLink to="/catalog"></NuxtLink></li>
            <li><NuxtLink to="/contact">Contact us</NuxtLink></li>
            <li>
                <NuxtLink to="/newslatter">Newslatter</NuxtLink>
                <ul>
                    <li><NuxtLink to="/newslatter/members">Members</NuxtLink></li>
                    <li><NuxtLink to="/newslatter/new">New Email</NuxtLink></li>
                </ul>
            </li>
            <li><NuxtLink to="/emails">Emails sent</NuxtLink></li>
            <li>
                <NuxtLink to="/product">Product</NuxtLink>
                <ul>
                    <li><NuxtLink to="/product/category">Category</NuxtLink></li>
                    <li><NuxtLink to="/product/categorylist">Category list</NuxtLink></li>
                    <li><NuxtLink to="/product/new">New Product</NuxtLink></li>
                    <li><NuxtLink to="/product/list">Product List</NuxtLink></li>
                </ul>
            </li>
      </ul>
      
  </aside>
</template>

<script>


</script>
<style>
.nuxt-link-active{
    background-color: #485fc7;
    color: #fff !important;
}
.nuxt-link-active:hover{
    color: #4a4a4a !important;
}
</style>