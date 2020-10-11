import { defineComponent } from 'vue'
import PanSlider from '../components/pan-slider/pan-slider'
import PanAudioWaveform from '../components/pan-audio-waveform/pan-audio-waveform'
import music from '../assets/music/xiaona.mp3'
// import logo from '../assets/logo.png'
import checkAjax from './../request/nodeserver-check-request';

export default defineComponent({
  setup() {
    const checkRequest = new checkAjax;
    checkRequest.getArticlesList(1,1);
    checkRequest.getArticlesDetail(2);
    return () => (
      <>
        {/* <img src={logo} alt=""/> */}
        <PanAudioWaveform loop={true} music={music}></PanAudioWaveform>
        <div style="height: 100px;width: 100%;overflow: hidden;">
          <PanSlider style-css="height: 10px;opacity: 0.16;background: #FF7750;" bar-css="background-image: linear-gradient(226deg, #FF9A6D 0%, #FF7750 100%);" bg-line="#FF7750" />
        </div>
      </>
    )
  }
})