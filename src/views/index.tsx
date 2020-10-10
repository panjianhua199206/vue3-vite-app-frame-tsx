import { defineComponent } from 'vue'
import PanSlider from '../components/pan-slider/pan-slider'
import PanAudioWaveform from '../components/pan-audio-waveform/pan-audio-waveform'
import music from '../assets/music/xiaona.mp3'
// import logo from '../assets/logo.png'

export default defineComponent({
  data() {
    return {

    }
  },
  render() {
    return (
      <>
        {/* <img src={logo} alt=""/> */}
        <PanAudioWaveform loop={true} music={music}></PanAudioWaveform>
        <div style="height: 100px;">
          <PanSlider style-css="height: 10px;opacity: 0.16;background: #FF7750;" bar-css="background-image: linear-gradient(226deg, #FF9A6D 0%, #FF7750 100%);" bg-line="#FF7750" />
        </div>
      </>
    )

  },
  mounted() {

  },
  methods: {

  }
})