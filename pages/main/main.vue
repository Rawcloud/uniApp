<template>
	<view>
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<page-head :title="title"></page-head>
		<view  class="index">
			<scroll-view id="tab-bar" class="swiper-tab" scroll-x :scroll-left="scrollLeft">
				<block v-for="(tab,index) in tabs" :key="tab.id">
					<view :class="['swiper-tab-list',currentTab==index ? 'on' : '']" :id="tab.id" :data-current="index" @tap="swichNav">{{tab.name}}</view>
				</block>
			</scroll-view>
			<swiper :current="currentTab" class="swiper-box" duration="300" @change="bindChange">
				<block v-for="(tab,index1) in newsitems" :key="index1">
					<swiper-item>
						<scroll-view class="index-bd" scroll-y @scrolltolower="loadMore(index1)">
							<!-- <block v-for="(newsitem,index2) in tab" :key="index2">
								<view class="tab-list">{{newsitem.name}}-{{newsitem.label}}</view>
							</block> -->
							<view class="uni-list">
								<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in tab" :key="key" @click="show(value)">
									<view class="uni-media-list">
										<image class="uni-media-list-logo" :src="value.img"></image>
										<view class="uni-media-list-body">
											<view class="uni-media-list-text-top">{{value.name}}</view>
											<view class="uni-media-list-text-bottom uni-ellipsis">{{value.label}}</view>
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
				</block>
			</swiper>
		</view>
	</view>
</template>
<script>
	import pageHead from '../../components/page-head.vue'
	export default {
		data() {
			return {
				title: '标签页',
				scrollLeft: 0,
				isClickChange: false,
				currentTab: 0,
				tabs: [{
					name: '关注',
					id: 'guanzhu'
				}, {
					name: '推荐',
					id: 'tuijian'
				}, {
					name: '体育',
					id: 'tiyu'
				}, {
					name: '热点',
					id: 'redian'
				}, {
					name: '财经',
					id: 'caijing'
				}],
				newsitems: []
			}
		},
		components:{
			pageHead
		},
		onLoad: function () {
			this.newsitems = this.randomfn();
			uni.getStorage({
				key: 'cc',
				success: (res) => {
					this.hasLogin = true;
				},
				fail: () => {
					console.log('读取数据失败 找不到 key 对应的数据');
				}
			})
			if (!this.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					/**
					* 如果需要强制登录，不显示取消按钮
					*/
					showCancel: !this.forcedLogin,
					success: function (res) {
						if (res.confirm) {
							/**
							* 如果需要强制登录，使用reLaunch方式
							*/
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/login'
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					}
				});
			}
		},
		onUnload:function(){
			this.scrollLeft = 0,
			this.isClickChange = false,
			this.currentTab = 0;
		},
		methods: {
			bindChange: async function (e) {
				let index = e.target.current;
				if (this.isClickChange) {
					this.currentTab = index;
					this.isClickChange = false;
					return;
				}
				let tabBar = await this.getWidth("tab-bar"),
					tabBarScrollLeft = tabBar.scrollLeft;

				let width = 0;

				for (let i = 0; i < index; i++) {
					let result = await this.getWidth(this.tabs[i].id);
					width += result.width;
				}

				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getWidth(this.tabs[index].id),
					nowWidth = nowElement.width;

				if (width + nowWidth - tabBarScrollLeft > winWidth) {
					this.scrollLeft = width + nowWidth - winWidth;
				}
				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
				this.isClickChange = false;
				this.currentTab = index; //一旦访问data就会出问题
			},
			getWidth: function (id) { //得到元素的宽高
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						if (id === 'tab-bar') {
							// console.log("id="+ id+",数据:"+JSON.stringify(data));
						}
						res(data);
					}).exec();
				})
			},
			swichNav: async function (e) { //点击tab-bar
				if (this.currentTab === e.target.dataset.current) {
					return false;
				} else {
					let tabBar = await this.getWidth("tab-bar"),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.currentTab = e.target.dataset.current
				}
			},
			loadMore: function (e) {
				let last = this.newsitems[e][this.newsitems[e].length - 1].label,
					name = this.newsitems[e][this.newsitems[e].length - 1].name,
					imgurl = this.newsitems[e][this.newsitems[e].length - 1].img;
				for (let i = 1; i <= 10; i++) {
					this.newsitems[e].push({
						name: name,
						label: i + last,
						img:imgurl
					});
				}
			},
			randomfn() {
				let ary = [];
				for (let i = 0, length = this.tabs.length; i < length; i++) {
					let aryItem = [];
					for (let j = 1; j <= 20; j++) {
						aryItem.push({
							name: this.tabs[i].name,
							label: j,
							img:'../../static/imgs/tabbar/tabbar_'+(i+1)+'.png'
						});
					}
					ary.push(aryItem);
				}
				return ary;
			},
			show:function(obj){
				uni.showToast({
					icon:'none',
					title:'当前点击'+obj.name+'-'+obj.label,
				})
			}
		}
	}
</script>

<style>
	page {
		display: flex;
	}

	.index {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
	}

	.index-bd {
		width: 100%;
		height: 100%;
	}

	.swiper-tab {
		width: 100%;
		white-space: nowrap;
		line-height: 64px;
		height: 64px;
	}


	.swiper-tab-list {
		font-size: 30px;
		width: 150px;
		display: inline-block;
		text-align: center;
		color: #777777;
		background-color: #D9D9D9;
	}

	.on {
		color: #FF0000;
		border-bottom: 5px solid #FF0000;
	}

	.swiper-box {
		flex: 1;
		width: 100%;
		height: 100%;
	}

	.swiper-box view {
		text-align: center;
	}

	.tab-list {
		width: 100%;
		height: 90px;
		line-height: 90px;
		text-align: left;
		border-bottom: 2px solid #EFEFF4;
	}
</style>
