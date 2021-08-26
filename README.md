# smart-fullscreen-v

基于Vue框架的全面屏插件，可以智能适配屏幕。

### 安装

    $ npm install smart-fullscreen-v

### 使用

main.js

    import SmartFullscreenV from "smart-fullscreen-v"

    Vue.use(SmartFullscreenV)

页面上使用

    <template>
      <div id="app">
       <SmartFullscreen name="demo" @click="show">
            // 内容        
        </SmartFullscreen>
      </div>
    </template>
    
    <script>
    export default {
      name: 'App',
      data () {
        return {
          isShow: false     // 标记是否全屏
        }
      },
      methods: {
        show () {
          if (!this.isShow) {
            this.$smart.opened('demo', true)    // 打开全屏  
            this.isShow = true
          } else {
            this.$smart.closed()    // 关闭全屏
            this.isShow = false
          }
        }
      }
    }
    </script>

### 组件 Props

| **名称** | **类型** | **是否必传** | **默认值** | **说明** |
| :----: | :----: | :----: | :----:| :----: |
| name | String | 是 | - | 名称，$smart需要改字段才能正常使用 |
| width | Number | 否 | 1920 | 宽度 |
| height | Number | 否 | 1080 | 高度 |
| isBody | Boolean | 否 | false | 是否需要插入body |
| debounceDuration | Number | 否 | 100 | 页面变化节流时间 |
| loadTransition | Boolean | 否 | false | 加载时是否需要过渡动画 | 

### 组件事件

| **名称** | **参数** | **返回值** | **说明** |
| :----: | :----: | :----: | :----: |
| click | - | void | 当点击组件时触发 |

### 附加方法

可全局调用this.$smart来使用附加方法

    this.$smart.opened()    // 示例

| **名称** | **参数** | **返回值** | **说明** |
| :----: | :----: | :----: | :----: |
| opened | function ( name,isParent ) | void | 打开全屏 |
| closed | - | void | 关闭全屏 |

opened 参数

| **名称** | **类型** | **是否必传** | **默认值** | **说明** |
| :----: | :----: | :----: | :----:| :----: |
| name | String | 是 | - | 需要全屏的组件名称 |
| isParent | Boolean | 否 | - | 是否以父容器为基准全屏 |
