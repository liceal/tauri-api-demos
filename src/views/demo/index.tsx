import { defineComponent } from "vue";

export default defineComponent({
  setup(){
    return ()=>[
      <p class={"text-red-300"}>
        <strong>在这里进行tauri api test</strong>
      </p>
    ]
  }
})