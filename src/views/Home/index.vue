<template>
  <div id="main">
    <Header title="天天首页"></Header>
    <ul class="addr">
      

      <router-link tag="li" to="/movie/city" class="city_name" style="margin-bottom:10px;margin-left:10px">
        <span>{{$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
      </router-link>

      <!-- <div>
        <input type="text" placeholder="搜索相关电影/电视剧/综艺...">
      </div> -->
    
      <router-link tag="li" class="search" to="/movie/search">
        <van-search 
          placeholder="搜索相关电影/电视剧/综艺..."
          shape="round">
        </van-search>
      </router-link>
      
    </ul>
    <van-tabs  v-model="active">
      <van-tab  title="推荐">
        <van-swipe class="swipe"  :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item in movieList" :key="item.id"><img :src="item.img | setWH('128.100')" ></van-swipe-item>
          <!-- <van-swipe-item><img src="../../assets/2.jpg" ></van-swipe-item>
          <van-swipe-item><img src="../../assets/3.jpg" ></van-swipe-item>
          <van-swipe-item><img src="../../assets/5.jpg" ></van-swipe-item>
          <van-swipe-item><img src="../../assets/5.jpg" ></van-swipe-item>
          <van-swipe-item><img src="../../assets/5.jpg" ></van-swipe-item>
          <van-swipe-item><img src="../../assets/5.jpg" ></van-swipe-item>
          <van-swipe-item><img src="../../assets/5.jpg" ></van-swipe-item>
          <van-swipe-item><img src="../../assets/5.jpg" ></van-swipe-item> -->
        </van-swipe>
        <!-- <van-grid>
          <van-grid-item icon="photo-o" text="大约在冬季" />
          <van-grid-item icon="photo-o" text="立减200" />
          <van-grid-item icon="photo-o" text="周边双11" />
          <van-grid-item icon="photo-o" text="0元观影" />
        </van-grid> -->
        <div class="icon_img">
          <ul>
            <li>
              <img src="../../assets/movie.png" alt="">
              <p>在冬季</p>
            </li>
            <li>
              <img src="../../assets/movie.png" alt="">
              <p>立减</p>
            </li>
            <li>
              <img src="../../assets/movie.png" alt="">
              <p>退场</p>
            </li>
            <li>
              <img src="../../assets/movie.png" alt="">
              <p>0元看</p>
            </li>
            <li>
              <img src="../../assets/movie.png" alt="">
              <p>零花钱</p>
            </li>
          </ul>
        </div>
        <div class="nowPlaying">
          <div>
            <router-link tag="p" to="/movie/nowPlaying" class="title" >热映影片&nbsp;&gt;</router-link>
          </div>

          <div class="detail_player swiper-container" ref="detail_player">
            <ul class="swiper-wrapper">
              <li v-for="item in movieList"  :key="item.id" class="swiper-slide">
                <div>
                  <img  :src="item.img | setWH('85.125')" >
                </div>
                <p>{{item.nm}}</p>
                <div class="btn_mall">
                  购票
                </div>
               
              </li>
              
              <!-- <li  class="swiper-slide">
                <div>
                  <img  src="../../assets/1.png" >
                </div>
                <p>某某人</p>
                <div class="btn_mall">
                  购票
                </div>
                
              </li> -->
            </ul>
          </div>
        </div>
        <div class="comingSoon">
          <router-link tag="div" to="/movie/comingSoon">
            <p class="title">即将上映&nbsp;&gt;</p>
          </router-link>

          <div class="detail_player swiper-container" ref="detail_player1">
            <ul class="swiper-wrapper">
              <li v-for="item in comingList" :key="item.id"  class="swiper-slide">
                <div>
                  <img  :src="item.img | setWH('85.125')" >
                </div>
                <p>{{item.nm}}</p>
                <p class="date">{{item.rt}}</p>
              </li>
              <!-- <li  class="swiper-slide">
                <div>
                  <img  src="../../assets/1.png" >
                </div>
                <p>某某人</p>
                <p class="date">2019-12-22</p>
              </li> -->
              
            </ul>
          </div>
        </div>
      </van-tab>
      <van-tab title="正在上映">内容 2</van-tab>
      <van-tab title="即将上映">内容 3</van-tab>
      <van-tab title="综艺">内容 4</van-tab>
    </van-tabs>
    <TabBar></TabBar>
    
  </div>
</template>
<script>
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
// import CiList from '@/components/CiList';
export default {
  name:"Cinema",
  components:{
    Header,
    TabBar,
    // CiList
  },
  data() {
    return {
      active: 0,
      movieList:[],
      comingList:[]
    }
  },
  mounted(){
    var cityId = this.$store.state.city.id;

    // 正在上映
    this.axios.get('/api/movieOnInfoList?cityId='+cityId).then((res)=>{
      var msg = res.data.msg;
      // console.log(msg)
      if(msg==="ok"){
        this.movieList = res.data.data.movieList;
        // console.log(this.movieList)
      }
      this.$nextTick(()=>{
        new Swiper(this.$refs.detail_player , {
          slidesPerView : 'auto',
          freeMode : true,
          freeModeSticky: true,
          // autoplay:true
        });
      })
    })
    this.axios.get('/api/movieComingList?cityId='+cityId).then((res)=>{
      var msg = res.data.msg;
      if(msg === "ok"){
        // console.log("suc")
        this.comingList = res.data.data.comingList;
        // console.log(this.comingList)
      }

    this.$nextTick(()=>{
      new Swiper(this.$refs.detail_player1 , {
        slidesPerView : 'auto',
        freeMode : true,
        freeModeSticky: true,
        // autoplay:true
      });
    })
    })

    
  }
}
</script>
<style scoped>
/*定位和搜索*/ 
#main .addr{
  /* display: flex;
  justify-content: space-between; */
  /* float: left; */
  }
  #main .addr li.city_name{
    float: left;
    width: 15%;
    height: 54px;
    line-height: 54px;
    
  }
  #main .addr li.search{
    width: 82%;
    float: left;
  }




/*轮播*/
#main .swipe img{
  width: 94%;
  height: 100px;
  padding:3%;
  border-radius: 15px;
  display: inline-block
}
/*导航*/ 
#main .icon_img{
  border-bottom: solid 1px #ccc;
}
#main .icon_img ul {

  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}
#main .icon_img ul li{
  width: 20%;
  padding-left: 15px;
  text-align: center
}

#main .icon_img img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 10px;
 
}
#main .icon_img p{
  font-size: 12px;
  margin-top: 3px;
 color:#666; 
}

/*热映*/ 
#main .nowPlaying{
  margin-top: 8px;
  border-bottom: solid 1px #ccc;
}
#main .comingSoon{
   margin-top: 8px;
}
#main .detail_player{ margin:15px;}
.detail_player .swiper-slide{ width:85px;  margin-right:10px;text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; height:125px; margin-bottom: 5px;border-radius: 5px}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
#main .comingSoon{
  margin-bottom: 80px;
}
.detail_player .swiper-slide div{
  text-align: center;
}
.detail_player .swiper-slide .btn_mall{
  width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 10px; font-size: 12px; cursor: pointer;margin:0 auto;margin-top: 5px;

}
#main  .title{
  font-size: 18px;
  font-weight: bold;
  color: rgb(37, 36, 36);
  margin-left: 15px;

}
#main  .detail_player p{
  font-weight: bold;
  color: rgb(15, 15, 3)
}
#main  .detail_player .date{
  font-weight: normal;
  margin-top: 5px;
  font-size: 12px;
  color: rgb(97, 94, 94);
  border:solid 1px #ccc;
}

</style>
