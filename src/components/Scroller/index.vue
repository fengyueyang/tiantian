<template>
  <div class="warpper" ref="warpper">
    <slot></slot>

  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  name:"Scroller", 
  props:{
    handToScroll:{
      type:Function,
      default:function(){}
    },
    handToTouchEnd:{
      type:Function,
      default:function(){}
    }
  },
  mounted(){
    var scroll = new BScroll( this.$refs.warpper,{
      tap :true,
      probeType:1
    });
    this.scroll = scroll;
    scroll.on('scroll',(pos)=>{
      this.handToScroll(pos)
    }),
    scroll.on('touchEnd',(pos)=>{
      this.handToTouchEnd(pos)
    })
  },
  methods:{
    toScrollTop(y){
      this.scroll.scrollTo(0,y);
    }
  }
}
</script>

<style scoped>
  .warpper{height:100%;}
</style>
