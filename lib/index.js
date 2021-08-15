import SmartFullscreen from './modules/SmartFullscreen'
import Util from './modules/util'

export default {
    install: (Vue) => {
        // 全局组件
        Vue.component(SmartFullscreen.name, SmartFullscreen)
        //全局方法
        Vue.prototype.$smart = Util
    }
}
