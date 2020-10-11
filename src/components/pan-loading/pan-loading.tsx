import { defineComponent, onMounted, nextTick, reactive } from 'vue'
import './loading.less';

export default defineComponent({
    props: {
        show: {
            type: [Boolean],
            default: () => {
                return false
            }
        }
    },
    setup(props: any) {
        return () => (
            <div class="panLoadingBox" v-if="props.show">
                <div class="spinnerloading">
                    <div class="spinner-containerloading container1loading">
                        <div class="circle1loading"></div>
                        <div class="circle2loading"></div>
                        <div class="circle3loading"></div>
                        <div class="circle4loading"></div>
                    </div>
                    <div class="spinner-containerloading container2loading">
                        <div class="circle1loading"></div>
                        <div class="circle2loading"></div>
                        <div class="circle3loading"></div>
                        <div class="circle4loading"></div>
                    </div>
                    <div class="spinner-containerloading container3loading">
                        <div class="circle1loading"></div>
                        <div class="circle2loading"></div>
                        <div class="circle3loading"></div>
                        <div class="circle4loading"></div>
                    </div>
                </div>
            </div>
        )
    }
})