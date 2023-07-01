import { message } from "@tauri-apps/api/dialog";
import { WebviewWindow } from "@tauri-apps/api/window";
import { ElButton, ElInput } from "element-plus";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Demo2",
  setup(props, ctx) {
    const inputValue = ref("");
    function sendMsg() {
      let mainView = WebviewWindow.getByLabel("main");
      if (mainView) {
        mainView.emit("msg", inputValue.value);
      } else {
        message("main not found", {
          type: "error",
        });
      }
    }
    return () => [
      <h1>this is Demo2</h1>,
      <ElInput v-model={inputValue.value} />,
      <ElButton onClick={sendMsg}>发送消息给main</ElButton>,
      inputValue.value,
    ];
  },
});
