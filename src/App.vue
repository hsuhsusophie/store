<template>
  <div id="app">
  <!--頭部-->
  <Myheader :poiInfo='poiInfo' ></Myheader>
  
  
  <!--導航-->
<Mynav></Mynav>
  
  <!--主體內容-->
   <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>

  </div>
  </template>
  
  <script>
  import Myheader from 'components/Header/Header';
  import Mynav from 'components/Nav/Nav';
  
  
  
  export default {
    name: 'App',
    components: {//註冊
      Myheader,
      Mynav
    },
    data(){
      return{
        //header組件需要的信息(商家信息)
        poiInfo:{}
      }
    },
    created(){
      //發起異步請求 獲取數據
      //通過axios發起get請求
      var that =this;

      this.$axios.get('/api/goods')
      .then(function(response){ //獲取到數據
        // console.log(response);
        var dataSource = response.data;
        // console.log(dataSource);
        if(dataSource.code ==0 ){
          that.poiInfo = dataSource.data.poi_info;
          // console.log(that,poiInfo);
        }
      })
      .catch(function(error){ //出錯處理
        console.log(error);
      });
    }
  }
  </script>
  
  <style>
  
  
  </style>
  