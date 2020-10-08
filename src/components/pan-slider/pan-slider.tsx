import { defineComponent } from 'vue'
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
    data() {
        return {
            startX: 0,
            panSliderWidth: 10,
            panSliderCss: '',
            barStyle: ''
        }
    },
    setup(props, context) {
        
    },
    render() {
        const { panSliderWidth,panSliderCss,barStyle, bgLine }:any = this
        
        return (
            <>
                <div class={panLess["pan-slider"]}>
                    <div class={[panLess["bg-pan-slider"], 'bg-pan-slider'].join(' ')} style={panSliderCss}></div>
                    <div class={panLess["bg-pan-move"]} style={barStyle}></div>
                    <div class={panLess["pan-slider-bar"]} style={`left: ${panSliderWidth}%`}>
                        <div
                            class={panLess["pan-slider-line-wrapper"]}
                            onMousedown={this.bindpanSliderStart.bind(this)}
                        >
                            <div class={panLess["pan-slider-line1"]} style={ `background: ${bgLine} `}></div>
                            <div class={panLess["pan-slider-line2"]} style={ `background: ${bgLine} `}></div>
                            <div class={panLess["pan-slider-line3"]} style={ `background: ${bgLine} `}></div>
                        </div>
                    </div>
                </div>
            </>
        )
    },
    mounted() {
        const { styleCss, barCss, panSliderHeight, panSliderWidth }:any = this
        this.panSliderCss = `height: ${panSliderHeight}px;${styleCss}`
        this.barStyle = `width: ${panSliderWidth}%;height: ${panSliderHeight}px;${barCss}`
    },
    watch: {
        panSliderWidth(val) {
            const { styleCss, barCss, panSliderHeight }:any = this
            this.panSliderCss = `height: ${panSliderHeight}px;${styleCss}`
            this.barStyle = `width: ${val}%;height: ${panSliderHeight}px;${barCss}`
        }
    },
    methods: {
        // 滑块开始滑动事件
        bindpanSliderStart(e: any) {
            e.preventDefault()
            this.startX = e.pageX
            this.bindpanSliderMove(this.panSliderWidth)
        },
        // 滑块移动计算
        /**
         * 分析： 总宽度 - 滑块宽度
         * */
        bindpanSliderMove(moved: number) {
            document.onmousemove = (e) => {
                let [moveEndX, X] = [e.pageX, 0]
                const { clientWidth }:any = document.querySelector('.bg-pan-slider')
                X = moveEndX - this.startX
                let XEnd = X / clientWidth * 100
                if (X > 0) {
                    if (XEnd >= 100) {
                        this.panSliderWidth = 100
                    } else {
                        this.panSliderWidth = moved + XEnd
                    }
                }
                if (X < 0) {
                    if (XEnd <= 0) {
                        this.panSliderWidth = 0
                    } else {
                        this.panSliderWidth = moved + XEnd
                    }
                }
            }
            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }
})