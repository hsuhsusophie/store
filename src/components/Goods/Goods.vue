<template>
  <div class="goods">
    <!--分類-->
    <div class="menu-wrapper" ref="menuSroll">
      <ul>
        <!--專場-->
        <li class="menu-item" :class="{'current':currentIndex===0}" @click="selectMenu(0)"  >
          <p class="text">
            <img :src="container.tag_icon" v-if="container.tag_icon" class="icon"/>
            {{ container.tag_name }}
          </p>
        </li>

        <li class="menu-item" v-for="(item,index) in goods" :class="{'current':currentIndex===index+1}" @click="selectMenu(index+1)" >
          <p class="text">
            <img :src="item.icon" v-if="item.icon" class="icon" />
            {{ item.name }}
          </p>
        </li>
      </ul>
    </div>



    <!--商品列表-->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
           <!--專場-->
           <li class="container-list food-list-hook">
          <div v-for="item in container.operation_source_list">
          <img :src="item.pic_url">
          </div>
           </li>

            <!--具體分類-->
        <li v-for="item in goods" class="food-list food-list-hook">
          <h3 class="title">{{ item.name }}</h3>

           <!--具體商品列表-->
          <ul>
            <li v-for="food in item.spus" class="food-item">
              <div class="icon" :style="head_bg(food.picture)"></div>

              <div class="content">
                <h3 class="name">{{ food.name }}</h3>
                <p class="desc" v-if="food.description">{{ food.description }}</p>
                <div class="extra">
                  <span class="saled">{{ food.month_saled_content }}</span>
                  <span class="praise">{{ food.praise_content }}</span>
                </div>
                <img class="product" :src="food.product_label_picture" v-show="food.product_label_picture"/>
                <p class="price">
                  <span class="text">¥{{ food.min_price }}</span>
                  <span class="unit">/{{ food.unit }}</span>
                </p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
//導入BScroll
// import BScroll from 'better-scroll'
import BScroll from '@better-scroll/core'


export default {
  data(){
    return{
      container:{},
      goods:[],
      listHeight:[],
      scrollY: 0,
      menuScroll: {},
			foodScroll: {},
    }

  },
  created(){
      //發起異步請求 獲取數據
      //通過axios發起get請求
      var that =this;

      //通過axios發起get請求
      this.$axios.get('/api/goods')
      .then(function(response){ //獲取到數據
        var dataSource = response.data;
        if(dataSource.code ==0 ){
          that.container = dataSource.data.container_operation_source;
          that.goods =  dataSource.data.food_spu_tags;
      

          //調用滾動的初始化方法
          //that.initScroll()
          //在開始時 dom元素沒有渲染 即高度是問題
          //在獲取到數據後 並dom已被渲染 表示列表高度是沒問題

          //nextTick
          that.$nextTick(()=>{
            //Dom已經更新
            that.initScroll();

            //計算分類區間高度
            that.calculateHeight();
          });

        }
      })
      .catch(function(error){ //出錯處理
        console.log(error);
      });
    },
    methods:{
      head_bg(imgName){
        return  "background-image: url(" + imgName + ");"
      },
      //滾動的初始化
      initScroll(){
        //ref屬性就是用來綁定某個dom元素或某個組件 然後在this.$refs裏面
        this.menuScroll = new BScroll(this.$refs.menuSroll,{
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodSroll,{
          probeType : 3
        });
        //添加滾動監聽事件
        this.foodScroll.on('scroll', (pos) =>{
          // console.log(pos.y);
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      calculateHeight(){
        //通過ref獲取到對英的元素
        let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');

        //添加到數組區間
        //0-216 第一個區間
        //217-1342第二個區間
        let height = 0;
        this.listHeight.push(height);
        for (let i =0; i< foodlist.length; i++){
          let item = foodlist[i];

          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      selectMenu(index){
        // console.log(index);


      //根據下標 滾懂到相對應的元素
        let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
        let el = foodlist[index];

        this.foodScroll.scrollToElement();

      }
    },
    computed:{ //計算屬性（不能傳參數）
      currentIndex(){
        for(let i=0; i<this.listHeight.length; i++){
          //獲取商品區間的範圍
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];

          //是否在上述區間中
          if(!height2 || (this.scrollY >= height1 && this. scrollY < height2)){
            return i;
          }
        }
        return 0;
      
      }
    }
}
</script>

<style>
.goods{
display: flex;
  
/*通過該方式確定高度 */
position: absolute;
top: 190px;
bottom:51px ;
overflow: hidden;
width: 100%;

}

/*
flex:flex-grow | flex-shrink | flex-basis;
默認: flex0 1 auto;
flex-grow:定義放大比例, 默認是0, 如果存在剩餘空間, 也不放大
flex-shrink:定義縮小比例, 默認1, 如果空間不足, 該項目將會被縮小, flex-shrinkj屬性為0時, 其他項目為1,則空間不足時 前者不縮小
flex-basis:定義再分配多餘空間之前, 項目佔據主軸空間, 瀏覽器根據這個屬性計算佔據是否有多餘空間
*/

.goods .menu-wrapper{
  flex: 0 0 85px;
  background: #f4f4f4;
}

.goods .menu-wrapper .menu-item{
  padding: 16px 23px 15px 10px;
  border-bottom: 1px solid #e4e4e4;
  position: relative;
}

.goods .menu-wrapper .menu-item .current{
  background: white;
  font-weight: bold;
  margin-top: -1px;
}

ul li{
  list-style: none;
}

.goods .menu-wrapper .menu-item .text{
  font-size: 13px;
  color: #333333;
  line-height: 17px;
  vertical-align: middle;
  	/* 多行显示省略号，使用WebKit的CSS扩展属性，适用方位Webkit浏览器以及移动端*/
	
	/* 用来显示一个块元素显示的文本行数*/
	-webkit-line-clamp: 2;
	/* 必须，将对象作为弹性伸缩盒子模型显示*/
	display: -webkit-box;
	/* 必须，设置或检索伸缩盒子的子元素排列方式*/
	-webkit-box-orient: vertical;
	overflow: hidden;

}


.goods .menu-wrapper .menu-item .text .icon{
 width: 15px;
 height: 15px;
 vertical-align: middle;
}

.goods .foods-wrapper{
 flex: 1;
}

.goods .foods-wrapper .container-list{
  padding: 11px 11px 0 0px;
  border-bottom:1px solid #e4e4e4;
}

.goods .foods-wrapper .container-list img{
  width: 100%;
  margin-bottom:11px;
  border-radius: 5px;
}
t
.goods .foods-wrapper .food-list{
  padding: 11px;
}

.goods .foods-wrapper .food-list .title{
height: 13px;
font-size: 13px;
background:
url(btn_yellow_highlighted@2x.png)no-repeat left center;
background-size: 2px 10px;
padding-left: 7px;
margin-bottom: 12px;
}

.goods .foods-wrapper .food-list .food-item{
display: flex;
margin-bottom: 25px;
}

.goods .foods-wrapper .food-list .food-item .icon{
 flex: 0 0 63px;
 background-position:  center;
 background-size: 120% 100%;
 background-repeat: no-repeat;
 margin-right: 11px;
 height: 75px;
}

.goods .foods-wrapper .food-list .food-item .content .name{
 font-size: 16px;
 line-height: 21px;
 color: #333333;
 margin-bottom:10px ;
 margin-right:27px ;
}

.goods .foods-wrapper .food-list .food-item .content .desc{
  font-size: 10px;
  line-height: 19px;
  color: #bfbfbf;
  margin-bottom: 8px;
	-webkit-line-clamp: 1;
	/* 必须，将对象作为弹性伸缩盒子模型显示*/
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.goods .foods-wrapper .food-list .food-item .content .extra{
  font-size: 10px;
  color: #bfbfbf;
  margin-bottom: 8px;
}

.goods .foods-wrapper .food-list .food-item .content .extra .saled{
  margin-right: 14px;
}

.goods .foods-wrapper .food-list .food-item .content .product{
  height: 15px;
  margin-bottom: 6px;
}

.goods .foods-wrapper .food-list .food-item .content .price{
  font-size: 0;
} 

.goods .foods-wrapper .food-list .food-item .content .price .text{
  font-size: 14px;
  color: #fb4e44;
}

.goods .foods-wrapper .food-list .food-item .content .price .unit{
  font-size: 12px;
  color: #bfbfbf;
}
</style>