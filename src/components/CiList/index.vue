<template>
  <div class="cinema_body">
       <Loading v-if="isLoading" />
        <!-- <Scroller v-else> -->
        <Scroller v-else>
					<ul>
							<!-- <li>
									<div>
											<span>大地影院(澳东世纪店)</span>
											<span class="q"><span class="price">22.9</span> 元起</span>
									</div>
									<div class="address">
											<span>金州区大连经济技术开发区澳东世纪3层</span>
											<span>1763.5km</span>
									</div>
									<div class="card">
											<div>小吃</div>
											<div>折扣卡</div>
									</div>
							</li> -->
							
							<li v-for="item in cinemas" :key="item.id">
									<div>
											<span class="title">{{item.nm}}</span>
											<span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
									</div>
									<div class="address">
											<span>{{item.addr}}</span>
											<span>{{item.distance}}</span>
									</div>
									<div class="card">
											<div v-if="item.tag.vipTag">{{item.tag.vipTag}}</div>
											<div v-if="item.tag.hallType">{{item.tag.hallType[0]}}</div>
											<div :class="key | classCard" v-for="(num,key) in item.tag" v-if="num===1" :key="key">
												{{key | formatCard}}
											</div>

											
									</div>
							</li>
							<!-- =============================== -->
							<!-- <li v-for="item in cinemaList" :key="item.id">
									<div>
											<span>{{ item.nm }}</span>
											<span class="q"><span class="price">{{ item.sellPrice }}</span> 元起</span>
									</div>
									<div class="address">
											<span>{{ item.addr }}</span>
											<span>{{ item.distance }}</span>
									</div>
									<div class="card">
											<div v-for="(num,key) in item.tag" v-if="num===1" :key="key" :class=" key | classCard ">{{ key | formatCard }}</div>
									</div>
							</li> -->
					</ul>
        </Scroller>
    </div>
</template>

<script>
export default {
  name:'CiList',
  data(){
    return{
      cinemas:[],
      isLoading:true,
      prevCityId:-1
    } 
  },
  activated(){
    var cityId = this.$store.state.city.id;
    // console.log(cityId)
    if(this.prevCityId===cityId){return}
    this.isLoading = true;
    this.axios.get('/api/cinemaList?cityId='+cityId).then((res)=>{
      var msg = res.data.msg;
      console.log(msg)
      if(msg==="ok"){
        this.cinemas = res.data.data.cinemas;
        this.isLoading = false;
        this.prevCityId = cityId;
        // console.log(this.cinemas)
        // console.log(res.data.data.cinemas[0].tag.hallType[0])
      }
    })
  },
  methods:{
     
  },
  filters :{
    
    formatCard(key){
      var card = [
        {key:'allowRefund',value:'回水'},
        {key:'endorse',value:'改签'},
        {key:'sell',value:'在售'},
        {key:'snack',value:'小吃'}
      ];
      for(var i=0; i<card.length;i++){
          // console.log(card[0])
          if(card[i].key ===key){
            return card[i].value
          }
        }
        return '';
    },
    classCard(key){
      var card = [
        {key:'allowRefund',value:'bl'},
        {key:'endorse',value:'bl'},
        {key:'sell',value:'gr'},
        {key:'snack',value:'gr'}
      ]; 
      for(var i=0; i<card.length;i++){
        // console.log(card[0])
        if(card[i].key ===key){
          return card[i].value
        }
      }
    }
  }

}
</script>

<style scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  
  border-bottom:1px solid #e6e6e6; 
  margin-bottom: 20px;}
.cinema_body li div span.title{
  color:rgb(37, 37, 27);
  font-weight: bold;
}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ 
  padding: 0 3px; height: 15px; 
  line-height: 15px; 
  border-radius: 2px; color: #f90; 
  border: 1px solid #f90; font-size: 13px; 
  margin-right: 5px;
}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
.cinema_body .card div.gr{ color: #0a9c42; border: 1px solid #0a9c42;}
</style>
