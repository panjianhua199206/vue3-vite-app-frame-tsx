import { defineComponent } from 'vue'
import panLess from './pan-audio-waveform.module.less'

/*
    analyserNode 提供了时时频率以及时间域的分析信息
    允许你获取实时的数据，并进行音频可视化
    analyserNode接口的fftSize属性
    fftSize:无符号长整型值，用于确定频域的FFT(快速傅里叶变换)
    ffiSize属性值是从32位到32768范围内的2的非零幂,默认值是2048
*/

interface Waveform {
    ctx: any, oW: number, oH: number, color1: any, color2: any, panAnalyser: any, panVoiceHeight: any
}
const panAudio: Waveform = {
    ctx: null, oW: 0, oH: 0, color1: null, color2: null, panAnalyser: null, panVoiceHeight: null
};

export default defineComponent({
    name: 'PanAudioWaveform',
    props: {
        music: {
            type: String,
            default: () => {
                return ''
            }
        },
        autoplay: {
            type: [Boolean],
            default: () => {
                return false
            }
        },
        loop: {
            type: [Boolean],
            default: () => {
                return false
            }
        }
    },
    data() {
        return {
            panWaveform: panAudio,
            count: 150 // 音频波的条数
        }
    },
    setup(props, context) {

    },
    render() {
        return (
            <>
                <audio id="audio-box" src={this.music} autoplay={this.autoplay} loop={this.loop}></audio>
                <canvas class={panLess["canvas-box"]} id="canvas-box"></canvas>
            </>
        )
    },
    mounted() {
        this.init()
    },
    watch: {

    },
    methods: {
        init() {
            const [oAudio, canvas]: any = [
                document.getElementById('audio-box'),
                document.getElementById('canvas-box')
            ];
            window.onclick = function () {
                if (oAudio.paused) {
                    oAudio.play();
                } else {
                    oAudio.pause();
                }
            }

            // 创建音频上下文对象
            const oCtx = new AudioContext();
            // console.log(oCtx);
            // 创建媒体源,除了audio本身可以获取，也可以通过oCtx对象提供的api进行媒体源操作
            const audioSrc = oCtx.createMediaElementSource(oAudio);
            // 创建分析机 
            this.panWaveform.panAnalyser = oCtx.createAnalyser();
            // 媒体源与分析机连接
            audioSrc.connect(this.panWaveform.panAnalyser);
            // 输出的目标：将分析机分析出来的处理结果与目标点（耳机/扬声器）连接
            this.panWaveform.panAnalyser.connect(oCtx.destination);

            // 效果（实现的具体方法）
            // 绘制音频图的条数(fftSize)
            /*
              根据分析音频的数据去获取音频频次界定音频图的高度
              放在与音频频次等长的8位无符号字节数组
              Uint8Array:初始化默认值为1024
            */
            // 利用cancas渐变进行音频绘制
            this.panWaveform.ctx = canvas.getContext('2d');
            console.log(this.panWaveform.ctx);

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            this.panWaveform.oW = canvas.width;
            this.panWaveform.oH = canvas.height;

            const { oW, oH } = this.panWaveform;

            this.panWaveform.color1 = this.panWaveform.ctx.createLinearGradient(oW / 2, oH / 2 - 30, oW / 2, oH / 2 - 100);
            this.panWaveform.color2 = this.panWaveform.ctx.createLinearGradient(oW / 2, oH / 2 + 30, oW / 2, oH / 2 + 100);
            this.panWaveform.color1.addColorStop(0, '#000');
            this.panWaveform.color1.addColorStop(.5, '#069');
            this.panWaveform.color1.addColorStop(1, '#f6f');
            this.panWaveform.color2.addColorStop(0, '#000');
            this.panWaveform.color2.addColorStop(.5, '#069');
            this.panWaveform.color2.addColorStop(1, '#f6f');
            // 缓冲区:进行数据的缓冲处理，转换成二进制数据
            this.panWaveform.panVoiceHeight = new Uint8Array(this.panWaveform.panAnalyser.frequencyBinCount);
            this.draw();
        },
        draw() {
            const { ctx, oW, oH, color1, color2, panAnalyser, panVoiceHeight } = this.panWaveform
            // 将当前的频率数据复制到传入的无符号字节数组中，做到实时连接
            panAnalyser.getByteFrequencyData(this.panWaveform.panVoiceHeight);
            // console.log(panVoiceHeight);
            // 自定义获取数组里边数据的频步
            const step = Math.round(panVoiceHeight.length / this.count / 2);
            ctx.clearRect(0, 0, oW, oH);
            ctx.lineCap = "round";
            for (let i = 0; i < this.count; i++) {
                const audioHeight = panVoiceHeight[step * i];
                ctx.fillStyle = color1;  // 绘制向上的线条
                ctx.fillRect(oW / 2 + (i * 10), oH / 2, 17, -audioHeight);
                ctx.fillRect(oW / 2 - (i * 10), oH / 2, 17, -audioHeight);
                ctx.fillStyle = color2;  // 绘制向下的线条
                ctx.fillRect(oW / 2 + (i * 10), oH / 2, 17, audioHeight);
                ctx.fillRect(oW / 2 - (i * 10), oH / 2, 17, audioHeight);
            }
            window.requestAnimationFrame(this.draw);
        }
    }
})