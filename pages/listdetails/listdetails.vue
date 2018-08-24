<template>
	<view>
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<page-head :title="title"></page-head>
		<view class="page">
			<view class="banner">
				<image class="banner-img" :src="imgurl"></image>
				<view class="banner-title">{{banner.bmzcbt}}</view>
			</view>
			<view class="article-meta">
				<text class="article-author">{{banner.bmzcly}}</text>
				<text class="article-text">发表于</text>
				<text class="article-time">{{banner.bmzcsj}}</text>
			</view>
			<view class="article-content">
				<rich-text :nodes="htmlString"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import pageHead from '../../components/page-head.vue'
	import {getLocalData} from "../../store/demodata.js"
	export default {
		data(){
			return{
				title: '新闻详情',
				banner: {},
				htmlString: "",
				imgurl:'',
				mindex:0
			}
		},
		onLoad:function(option){
			this.imgurl = option.imgurl;
			this.mindex = option.mindex;
			this.getLocaldata(this.mindex);
// 			console.log(this.banner.bmzcbt)
			// this.title = this.banner.bmzcbt;
			this.htmlString = this.banner.bmzcnr;
		},
		methods:{
			getLocaldata:function (obj) {
				var self = this;
				getLocalData('',function (res) {
					// console.log(obj);
					self.banner = res[obj];
				})
			}
		},
		components:{
			pageHead
		},
	}
</script>

<style>
	.banner {
		height: 360px;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}

	.banner-img {
		width: 100%;
	}

	.banner-title {
		max-height: 84px;
		overflow: hidden;
		position: absolute;
		left: 30px;
		bottom: 30px;
		width: 90%;
		font-size: 32px;
		font-weight: 400;
		line-height: 42px;
		color: white;
		z-index: 11;
	}

	.article-meta {
		padding: 20px 40px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		color: gray;
	}

	.article-text {
		font-size: 26px;
		line-height: 50px;
		margin: 0 20px;
	}

	.article-author,
	.article-time {
		font-size: 30px;
	}

	.article-content {
		padding: 0 30px;
		overflow: hidden;
		font-size: 30px;
	}
</style>
