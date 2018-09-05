import Vue from 'vue'
import App from './App'

import store from './utils/store/index'
import './reset.css'
import moment from 'moment'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
Vue.prototype.$store=store;
Vue.prototype.moment=moment;
app.$mount()

export default {
	config:{
		"pages": [
			"^pages/detail/main"
		],
		"window": {
			"backgroundTextStyle": "light",
			"navigationBarBackgroundColor": "#000",
			"navigationBarTitleText": "WeChat",
			"navigationBarTextStyle": "black"
		}
	}
}