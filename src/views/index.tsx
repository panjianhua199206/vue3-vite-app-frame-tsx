import { defineComponent } from 'vue'
import PanSlider from '../components/pan-slider/pan-slider'

export default defineComponent({
  name: 'Title',
  props: {
    title: {
      type: String,
      require: false,
      default: 'This is title.'
    }
  },
  setup(props, context) {
    return {
      props, context
    }
  },
  render() {
    const { props, context } = this
    return (
      <>
        <div style="height: 100px;">
          <PanSlider style-css="height: 10px;opacity: 0.16;background: #FF7750;" bar-css="background-image: linear-gradient(226deg, #FF9A6D 0%, #FF7750 100%);" bg-line="#FF7750" />
        </div>
        <h3>7878</h3>
        <h1 class="title" onClick={() => context.emit('data')}>
          {props.title}
        </h1>
      </>
    )

  },
  mounted() {
    let tupleType: [string, boolean];
    tupleType = ["semlinker", true];

  },
  methods: {
    handleTest() {
      console.log(888)
    }
  }
})