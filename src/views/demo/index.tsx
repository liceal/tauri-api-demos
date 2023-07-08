import { defineComponent } from "vue";
import { ElButton, ElMessage } from "element-plus";
import { WebviewWindow, appWindow, getAll } from "@tauri-apps/api/window";
import { sendNotification } from "@tauri-apps/api/notification";
import { message } from "@tauri-apps/api/dialog";
import UpdateHandler from "./updateHandler";

export default defineComponent({
  setup() {
    function checkWindows() {
      const wins = getAll();
      console.log(wins);
      ElMessage({
        type: "info",
        message: JSON.stringify(wins),
      });
    }

    function backLogin() {
      /*
        有坑，loginwindow可能有，但show的时候可能会提示不存在，所以要在show中进行异常处理
      */
      console.log("当前操作窗口", appWindow);

      console.log("back login");

      let loginWindow = WebviewWindow.getByLabel("login");

      if (loginWindow) {
        loginWindow
          .show()
          .then(() => {
            // 打开成功 关闭当前窗口
            appWindow.close();
          })
          .catch((e) => {
            // 打开失败
            createLogin();
          });
      } else {
        createLogin();
      }

      function createLogin() {
        let newLoginWindow = new WebviewWindow("login", {
          url: "/#/login",
          width: 500,
          height: 300,
        });
        newLoginWindow.show();
        newLoginWindow.once("tauri://created", () => {
          sendNotification({
            title: "login",
            body: "login created success",
          });

          appWindow.close();
        });
        newLoginWindow.once("tauri://error", (e) => {
          sendNotification({
            title: "login",
            body: "login created error" + JSON.stringify(e),
          });

          console.log(e);
        });
      }
    }

    function openDemo2() {
      let demo2Window = WebviewWindow.getByLabel("demo2");
      if (demo2Window) {
        demo2Window
          .show()
          .then((res) => {})
          .catch((e) => {
            console.log(11, e);
            createDemo2();
          });
      } else {
        createDemo2();
      }

      function createDemo2() {
        appWindow.emit("msg", "123213");
        let newDemo2Win = new WebviewWindow("demo2", {
          url: "/#/demo2",
        });
        newDemo2Win.show();
      }
    }

    appWindow
      .listen("msg", (e) => {
        console.log(12123);
      })
      .then((unlisten) => {
        unlisten();
      });
    return () => [
      <p class={"text-red-300"}>
        <strong>在这里进行tauri api test</strong>
        <strong>测试更新</strong>
      </p>,
      <ElButton onClick={checkWindows}>查看目前所有窗口</ElButton>,
      <ElButton onClick={backLogin}>回到登陆页面</ElButton>,
      <ElButton onClick={openDemo2}>打开Demo2</ElButton>,
      <UpdateHandler />,
    ];
  },
});
