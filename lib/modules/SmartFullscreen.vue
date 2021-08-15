<template>
  <div class="smart-fullscreen" :id="`smart-fullscreen-${name}`" @click="handleClick">
    <div ref="Screen" class="smart-fullscreen-content">
      <template>
        <slot></slot>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SmartFullscreen',
  props: {
    width: {
      type: Number,
      default: 1920
    },
    height: {
      type: Number,
      default: 1080
    },
    isBody: {   //是否插入body
      type: Boolean,
      default: false
    },
    debounceDuration: {   //节流时间
      type: Number,
      default: 300
    },
    name: {   //名称，$smart需要改字段才能正常使用
      type: String,
      required: true
    }
  },
  data () {
    return {
      handleResizeTime: null, //节流句柄
      rate: {   //盒子比例
        box: 0,
        content: 0
      },
      scale: {  //相对比例
        X: 0,
        Y: 0
      },
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.isBody) this.mountBody()
      this.init()
      this.handleResize = window.addEventListener('resize', this.onResize)
    })
  },
  methods: {
    init () {
      this.rate.content = this.width / this.height
      this.$refs.Screen.style.cssText = `width:${this.width}px;height:${this.height}px;`
      this.onResize()
    },
    onResize () {
      if (this.handleResizeTime) {
        clearTimeout(this.handleResizeTime)
      }
      this.handleResizeTime = setTimeout(() => {
        let instance = this.getInstance()
        this.rate.box = instance.clientWidth / instance.clientHeight
        this.scale.X = instance.clientWidth / this.width
        this.scale.Y = instance.clientHeight / this.height
        if (this.rate.box > this.rate.content) {
          this.$refs.Screen.style.transform = `scale(${this.scale.Y})`
        } else {
          this.$refs.Screen.style.transform = `scale(${this.scale.X})`
        }
      }, this.debounceDuration)
    },
    getInstance () {
      let instance = this.$el
      if (this.isBody) {
        instance = document.body
      }
      return instance
    },
    mountBody () {
      this.$el.style.cssText = 'position: fixed;'
      const body = document.body
      if (body.append) {
        body.append(this.$el)
      } else {
        body.appendChild(this.$el)
      }
    },
    handleClick () {
      this.$emit('click')
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.onResize)
  }
}

</script>

<style scoped>
.smart-fullscreen {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.smart-fullscreen-content {
  background: pink;
  transition: all 0.5s ease;
  transform-origin: center;
  flex-shrink: 0;
}
</style>
