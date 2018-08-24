<script>
	export default {
		onLaunch: function () {
			console.log('App Launch')
		},
		onShow: function () {
			console.log('App Show')
		},
		onHide: function () {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
@import 'common/uni.css';
@import 'common/icon.css';
	page,
	view {
	}
	.status_bar {
        height: var(--status-bar-height);
        width: 100%;
    }
	.top_view{
			height: var(--status-bar-height);
			width: 100%;
			position: fixed;
			top: 0;
			background-color: #8F8F94;
		}

	page {
		min-height: 100%;
	}
	.page-head {
		padding: 20px 50px 20px;
		text-align: center;
		line-height: initial;
		height: 60px;
		background: #007AFF;
	}
	
	.page-head-title {
		display: inline-block;
		padding: 0 40px;
		font-size: 30px;
		height: 60px;
		line-height: 60px;
		color: #333333;
		box-sizing: border-box;
		/* border-bottom: 2px solid #D8D8D8; */
	}
	.page-section {
		margin-bottom: 20px;
	}
	.page-section-gap {
		box-sizing: border-box;
		padding: 0 30px;
	}	
	.page-body {
		padding-bottom: 40px;
		display: flex;
		flex-direction: column;
	}
	.uni-icon {
			color: #FFFFFF;
		}
</style>
