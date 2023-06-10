<template>
    <div class="nav">
      <!--use the router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
      <router-link to="Goods" class="nav-item">點菜</router-link>
      <router-link to="Ratings" class="nav-item">評價</router-link>
      <router-link to="Seller" class="nav-item">商家</router-link>
    </div>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style>
  .nav{
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e4e4e4;
  }
  
  .nav .nav-item{
    flex: 1;
    text-align: center;
    font-size: 13px;
    text-decoration: none;
    color: #666;
    position: relative;
  }

  /* 选中后的样式*/
  .nav .active{
    color:#ffbb22;
    
  }

  .nav .active .line{
    width: 20px;
    height: 2px;
    display: inline-block;
    background: #ffbb22;
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -10px;
  }
  </style>