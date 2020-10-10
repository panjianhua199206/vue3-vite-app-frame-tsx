import { defineComponent, onMounted, nextTick, reactive } from 'vue'
import panLess from './pan-audio-waveform.module.less'

/*
    analyserNode 提供了时时频率以及时间域的分析信息
    允许你获取实时的数据，并进行音频可视化
    analyserNode接口的fftSize属性
    fftSize:无符号长整型值，用于确定频域的FFT(快速傅里叶变换)
    ffiSize属性值是从32位到32768范围内的2的非零幂,默认值是2048
*/

export default defineComponent({
    name: 'PanAudioWaveform',
    props: {
        music: {
            type: String,
            default: () => {
                return ''
            }
        },
        loop: {
            type: [Boolean],
            default: () => {
                return false
            }
        }
    },
    setup(props: any, context: any) {
        interface Waveform {
            ctx: any, oW: number, oH: number, color1: any, color2: any, panAnalyser: any, panVoiceHeight: any
        }
        const panAudio: Waveform = {
            ctx: null, oW: 0, oH: 0, color1: null, color2: null, panAnalyser: null, panVoiceHeight: null
        };

        let panWaveform = panAudio,
            count = 150, // 音频波的条数
            paused = true, // 是否暂停
            lrc = '',
            oLRC = {
                ti: "", //歌曲名
                ar: "", //演唱者
                al: "", //专辑名
                by: "", //歌词制作人
                offset: 0, //时间补偿值，单位毫秒，用于调整歌词整体位置
                ms: [] //歌词数组{t:时间,c:歌词}
            }
        let [oAudio, canvas, playRet]: any = ['', '', reactive({ paused })]
        const panAudioBox = (el: any) => {
            oAudio = el;
        }

        const panCanvasBox = (el: any) => {
            canvas = el;
        }

        nextTick(() => {
            console.log(oAudio, canvas);
        })
        const init = () => {
            getLRC()

            // 创建音频上下文对象
            const oCtx = new AudioContext();
            // 创建媒体源,除了audio本身可以获取，也可以通过oCtx对象提供的api进行媒体源操作
            const audioSrc = oCtx.createMediaElementSource(oAudio);
            // 创建分析机 
            panWaveform.panAnalyser = oCtx.createAnalyser();
            // 媒体源与分析机连接
            audioSrc.connect(panWaveform.panAnalyser);
            // 输出的目标：将分析机分析出来的处理结果与目标点（耳机/扬声器）连接
            panWaveform.panAnalyser.connect(oCtx.destination);

            // 效果（实现的具体方法）
            // 绘制音频图的条数(fftSize)
            /*
              根据分析音频的数据去获取音频频次界定音频图的高度
              放在与音频频次等长的8位无符号字节数组
              Uint8Array:初始化默认值为1024
            */
            // 利用cancas渐变进行音频绘制
            panWaveform.ctx = canvas.getContext('2d');
            console.log(panWaveform.ctx);

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight * 0.75;
            panWaveform.oW = canvas.width;
            panWaveform.oH = canvas.height;

            const { oW, oH } = panWaveform;

            panWaveform.color1 = panWaveform.ctx.createLinearGradient(oW / 2, oH / 2 - 30, oW / 2, oH / 2 - 100);
            panWaveform.color2 = panWaveform.ctx.createLinearGradient(oW / 2, oH / 2 + 30, oW / 2, oH / 2 + 100);
            panWaveform.color1.addColorStop(0, '#000');
            panWaveform.color1.addColorStop(.25, '#069');
            panWaveform.color1.addColorStop(.75, '#f6f');
            panWaveform.color2.addColorStop(0, '#000');
            panWaveform.color2.addColorStop(.25, '#069');
            panWaveform.color2.addColorStop(.75, '#f6f');
            // 缓冲区:进行数据的缓冲处理，转换成二进制数据
            panWaveform.panVoiceHeight = new Uint8Array(panWaveform.panAnalyser.frequencyBinCount);
            draw();
        }

        const draw = () => {
            const { ctx, oW, oH, color1, color2, panAnalyser, panVoiceHeight } = panWaveform
            // 将当前的频率数据复制到传入的无符号字节数组中，做到实时连接
            panAnalyser.getByteFrequencyData(panWaveform.panVoiceHeight);
            // console.log(panVoiceHeight);
            // 自定义获取数组里边数据的频步
            const step = Math.round(panVoiceHeight.length / count / 2);
            ctx.clearRect(0, 0, oW, oH);
            for (let i = 0; i < count; i++) {
                let audioHeight = panVoiceHeight[step * i] - count * 0.8;
                if (paused) {
                    audioHeight = panVoiceHeight[step * i];
                }
                ctx.fillStyle = color1;  // 绘制向上的线条
                ctx.fillRect(oW / 2 + (i * 10), oH / 2, count * 0.1, -audioHeight);
                ctx.fillRect(oW / 2 - (i * 10), oH / 2, count * 0.1, -audioHeight);
                ctx.fillStyle = color2;  // 绘制向下的线条
                ctx.fillRect(oW / 2 + (i * 10), oH / 2, count * 0.1, audioHeight);
                ctx.fillRect(oW / 2 - (i * 10), oH / 2, count * 0.1, audioHeight);
            }
            window.requestAnimationFrame(draw);
        }

        // 获取lrc文件 
        const getLRC = () => {
            console.log(lrc, oLRC) // 歌词后续
        }

        const handlePlayer = () => {
            if (oAudio.paused) {
                    paused = false;
                    oAudio.play();
            } else {
                paused = true;
                oAudio.pause();
            }
            playRet.paused = paused
        }

        onMounted(() => {
            init()
        })

        return () => (
            <>
                <div class={panLess["pan-audio"]}>
                    <div class={panLess["pan-aplayer-lrc"]}>
                        <ul ref="lrclist" class={panLess["pan-aplayer-lrc-contents"]} style="transform: translateY(0px);">

                        </ul>
                    </div>
                    <audio ref={panAudioBox} loop={props.loop}>
                        <source src={props.music} type="audio/mpeg" />
                    </audio>
                    <canvas class={panLess["pan-canvas-box"]} ref={panCanvasBox}></canvas>
                </div>
                <div class={panLess["pan-btn-box"]}>
                    <a href="javascript:;" class="" onClick={handlePlayer}>{playRet.paused ? '播放' : '暂停'}</a>
                </div>
            </>
        )
    }
})