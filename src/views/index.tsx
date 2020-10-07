import { defineComponent } from 'vue'

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
    return () =>
      <>
        <h3>7878</h3>
        <h1 class="title" onClick={() => context.emit('data')}>
          { props.title }
        </h1>
      </>
  },
  created() {
    let tupleType: [string, boolean];
    tupleType = ["semlinker", true];
    
    console.log(tupleType);
      
  }
})