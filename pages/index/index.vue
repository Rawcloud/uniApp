<template>
	<view class="page-body">
		<!-- <text class="title">{{title}}</text> -->
		<image src="../../static/imgs/splash.jpg" class="img"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				winheight:'730px',
				winwidth:'1250px',
			}
		},
		onLoad:function(option){
			this.title = option.mc
		},
		onShow:function(){
			uni.getSystemInfo({
				success:function(res){
					this.winheight = (res.screenHeight * res.pixelRatio*0.8);
					this.winwidth = (res.screenWidth * res.pixelRatio*0.8);
					// console.log('宽:'+this.winwidth+',高:'+this.winheight+'设备像素比:'+res.pixelRatio);
					setTimeout(function (){
						uni.redirectTo({
							url:'../login/login',
						})
					}, 2000);
				}
			})
		}
	}
</script>

<style>
	.content {
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-size: 36px;
		color: #8f8f94;
	}
	.img {
		width: 750px;
		height: 1250px;
	}
</style>
