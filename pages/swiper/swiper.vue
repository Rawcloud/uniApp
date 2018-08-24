<template>
	<view>
		<view class="status_bar">
            <view class="top_view"></view>
        </view>
		<page-head :title="title"></page-head>
		<view class="page-body">
			 <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="item in itemList" :key="item">
					<!-- <text>{{item}}</text> -->
					<image class="img" :src="item"></image>
				</swiper-item>
			</swiper>
			<view class="btncls">
				<button @tap="changeIndicatorDots" v-bind:class="{showIndecations:indicatorDots}"> 指示点 </button>
				<button @tap="changeAutoplay" v-bind:class="{showAutoPlay:autoplay}"> 自动播放 </button>
			</view>
			<slider @change="intervalChange" show-value min="500" max="2000" /> 时间间隔
			<slider @change="durationChange" show-value min="1000" max="10000" /> 持续时间
		</view>
	</view>
</template>

<script>
	import pageHead from '../../components/page-head.vue'
	import utils from '../../common/utils.js'
	
	export default {
		data(){
			return{
				title:'轮播',
				itemList: [
					'../../static/imgs/list/shuijiao.jpg',
					'../../static/imgs/list/muwu.jpg',
					'../../static/imgs/list/cbd.jpg'
				],
				indicatorDots: false,
				autoplay: false,
				interval: 5000,
				duration: 1000,
				hasLogin:false,
				forcedLogin:false
			}
		},
		onLoad:function(option){
			
		},
		components:{
			pageHead
		},
		methods:{
			changeIndicatorDots: function (e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay: function (e) {
				this.autoplay = !this.autoplay
			},
			intervalChange: function (e) {
				this.interval = e.detail.value
			},
			durationChange: function (e) {
				this.duration = e.detail.value
			}
		},
	}
</script>

<style>
	.img{
		width: 100%;
		height: 400px;
	}
	.btncls{
		margin-top: 50px;
		margin-bottom: 100px;
		display: flex;
		flex-direction: row;
	}
	.showIndecations{
		background-color: #0FAEFF;
	}
	.showAutoPlay{
		background-color: #0FAEFF;
	}
</style>
