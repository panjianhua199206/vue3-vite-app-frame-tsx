{/* 原App.vue <template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script> */}

import { defineComponent } from 'vue'
import Title from './components/Title'

export default defineComponent({
  name: 'App',
  setup() {
    return () =>
      <>
        <div class="container">
          <Title title="Hey!This my title! -- pan_Teacher" />
          Hello World! To vite tsx!
        </div>
      </>
  }
})