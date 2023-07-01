<script setup name="Login">
import {
  WebviewWindow,
  appWindow,
  LogicalSize,
  getAll,
} from "@tauri-apps/api/window";
import { sendNotification } from "@tauri-apps/api/notification";
import { ref } from "vue";

// 初始化
function init() {
  appWindow.setSize(new LogicalSize(500, 300));
}
init();

// 参数
const inputValue = ref("123");

function login() {
  console.log("当前操作窗口", appWindow);

  let webview = WebviewWindow.getByLabel("main");

  if (webview) {
    sendNotification({
      title: "Login窗口",
      body: "关闭login窗口，打开main窗口",
    });
    webview
      ?.show()
      .then(() => {
        webview.emit("message", inputValue.value);
        appWindow.close();
      })
      .catch((e) => {
        console.log(e);
        createMain();
      });
    return;
  } else {
    createMain();
  }

  function createMain() {
    webview = new WebviewWindow("main", {
      // url: 'https://github.com/tauri-apps/tauri'
      url: "/#/",
    });

    webview.once("tauri://created", function () {
      // webview window successfully created
      console.log("create success");
      sendNotification({
        title: "Login窗口",
        body: "Main窗口不存在 创建了一个",
      });

      appWindow.close();
    });
    webview.once("tauri://error", (e) => {
      sendNotification({
        title: "Login窗口",
        body: "Main窗口不存在 创建失败，在控制台上查看",
      });
      console.log(e);
    });
  }
}
</script>

<template>
  <div
    data-tauri-drag-region
    style="height: 50px; width: 50px; background: red"
    class="text-gray-400"
  >
    按我拖拽
  </div>
  <div>login</div>
  <el-input v-model="inputValue" />
  <el-button @click="login">登录</el-button>
</template>

<style scoped></style>
