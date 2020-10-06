import { defineComponent } from 'vue'

// 案例1
// export default defineComponent({
//   name: 'Title',
//   setup() {
//     return () =>
//       <>
//         <h1 class="title">
//            This is title.
//         </h1>
//       </>
//   }
// })
// 案例2 组件开放 props 属性给父组件传入参数
// export default defineComponent({
//   name: 'Title',
//   props: {
//     title: {
//       type: String,
//       require: false,
//       default: 'This is title.'
//     }
//   },
//   setup(props) {
//     return () =>
//       <>
//         <h1 class="title">
//           { props.title }
//         </h1>
//       </>
//   }
// })

// 案例3 开放emit 子组件事件传递
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