
import fly from '../../api/fly_conf'

import { api } from '../../api/api'

const ajax = {
  state:{
    ...api,
  },
  actions:{
    get({ state }, options) {
      var params = options.params;
      return fly.get(state[options.url], { ...params });
    },
    post({ state }, options) {
      return fly.post(state[options.url], options.data);
    }
  }
}

export default ajax;
