<template name="page-head">
	<view class="page-head">
		<view class="uni-icon uni-icon-arrowleft" style="float: left; margin-top: 15px;" @click="toback()"></view>
		<view class="page-head-title">{{title}}</view>
	</view>
</template>

<script>
	export default {
		name: "page-head",
		props: {
			title: {
				type: String,
				default: ""
			}
		},
		methods:{
			toback:function(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>
