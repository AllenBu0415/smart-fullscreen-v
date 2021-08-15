export default {
    opened: async function (name, isParent) {
        let dom = document.getElementById(`smart-fullscreen-${name}`)
        console.log(dom.parentNode)
        if (isParent) {
            dom = dom.parentNode
        }

        if (dom.requestFullscreen) {
            await dom.requestFullscreen()
        } else if (dom.mozRequestFullScreen) {
            await dom.mozRequestFullScreen()
        } else if (dom.webkitRequestFullScreen) {
            await dom.webkitRequestFullScreen()
        } else if (dom.msRequestFullscreen) {
            await dom.msRequestFullscreen()
        }
    },
    closed: async function () {
        if (document.exitFullscreen) {
            await document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
            await document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
            await document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
            await document.msExitFullscreen()
        }
    }
}
