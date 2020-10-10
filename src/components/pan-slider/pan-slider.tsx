import { defineComponent, onMounted, reactive, watchEffect } from 'vue'
import panLess from './pan-slider.module.less'

export default defineComponent({
    name: 'PanSlider',
    props: {
        styleCss: {
            type: [String],
            default() {
                return ''
            }
        },
        barCss: {
            type: [String],
            default() {
                return ''
            }
        },
        bgLine: {
            type: [String],
            default() {
                return '#000'
            }
        },
        panSliderHeight: {
            type: [Number, String],
            default() {
                return 10
            }
        },
        panSliderValue: {
            type: [Number, String],
            default() {
                return 0
            }
        }, // 滑块值
        panSliderBaseNumber: {
            type: [Number, String],
            default() {
                return 0
            }
        }// 滑块基数
    },
    setup(props: any, context: any) {
        let startX = 0,
            panSliderWidth = 10,
            panSliderCss = '',
            barStyle = '',
            watchSliderWidth = reactive({ width: panSliderWidth })

        // 滑块开始鼠标拖动事件
        const bindpanSliderStart = (e: any) => {
            e.preventDefault()
            startX = e.pageX
            bindpanSliderMove(panSliderWidth)
        }

        // 滑块移动计算
        const bindpanSliderMove = (moved: number) => {
            document.onmousemove = (e) => {
                let [moveEndX, X] = [e.pageX, 0]
                const { clientWidth }: any = document.querySelector('.bg-pan-slider')
                X = moveEndX - startX
                let XEnd = X / clientWidth * 100
                if (X > 0) {
                    if (panSliderWidth >= 100) {
                        panSliderWidth = 100
                    } else {
                        panSliderWidth = moved + XEnd
                    }
                }
                if (X < 0) {
                    if (panSliderWidth <= 0) {
                        panSliderWidth = 0
                    } else {
                        panSliderWidth = moved + XEnd
                    }
                }
                watchSliderWidth.width = panSliderWidth
            }
            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
        // 滑块开始滑动事件
        let moved:any;
        const bindpanSliderToucStart = (e: any) => {
            e.preventDefault()
            startX = e.changedTouches[0].pageX
            moved = panSliderWidth
        }
        // 滑动
        const bindpanSliderTouchMove = (e: any) => {
            let [moveEndX, X] = [e.changedTouches[0].pageX, 0]
            const { clientWidth }: any = document.querySelector('.bg-pan-slider')
            X = moveEndX - startX
            let XEnd = X / clientWidth * 100

            if (X > 0) {
                if (panSliderWidth >= 100) {
                    panSliderWidth = 100
                } else {
                    panSliderWidth = moved + XEnd
                }
            }
            if (X < 0) {
                if (panSliderWidth <= 0) {
                    panSliderWidth = 0
                } else {
                    panSliderWidth = moved + XEnd
                }
            }
            watchSliderWidth.width = panSliderWidth
        }

        const countSliderStyle = () => {
            panSliderCss = `height: ${props.panSliderHeight}px;${props.styleCss}`
            barStyle = `width: ${watchSliderWidth.width}%;height: ${props.panSliderHeight}px;${props.barCss}`
        }

        onMounted(() => {
            countSliderStyle()
        })

        watchEffect (() => {
            countSliderStyle()
        })

        return () => (
            <>
                <div class={panLess["pan-slider"]}>
                    <div class={[panLess["bg-pan-slider"], 'bg-pan-slider'].join(' ')} style={panSliderCss}></div>
                    <div class={panLess["bg-pan-move"]} style={barStyle}></div>
                    <div class={panLess["pan-slider-bar"]} style={`left: ${watchSliderWidth.width}%`}>
                        <div
                            class={panLess["pan-slider-line-wrapper"]}
                            onMousedown={bindpanSliderStart}
                            onTouchstart={bindpanSliderToucStart}
                            onTouchmove={bindpanSliderTouchMove}
                        >
                            <div class={panLess["pan-slider-line1"]} style={`background: ${props.bgLine} `}></div>
                            <div class={panLess["pan-slider-line2"]} style={`background: ${props.bgLine} `}></div>
                            <div class={panLess["pan-slider-line3"]} style={`background: ${props.bgLine} `}></div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
})