<script setup name="Login">
import { WebviewWindow, appWindow, LogicalSize } from "@tauri-apps/api/window";
import { sendNotification } from "@tauri-apps/api/notification";

// 初始化
function init() {
  appWindow.setSize(new LogicalSize(500, 300));
}
init();

function login() {
  let webview = WebviewWindow.getByLabel("main");
  console.log(webview);
  if (webview) {
    sendNotification({
      title: "Login窗口",
      body: "Main窗口存在，显示Main窗口，因为运行时候开启了两个窗口，Main窗口进行了隐藏，Login窗口进行了显示，刚才显示Main窗口并且关闭Login窗口",
    });
    webview?.show();
    appWindow.close();
    return;
  }

  webview = new WebviewWindow("main", {
    // url: 'https://github.com/tauri-apps/tauri'
    url: "/#/",
  });
  webview.once("tauri://created", function () {
    // webview window successfully created
    console.log("create success");
    sendNotification({ title: "Login窗口", body: "Main窗口不存在 创建了一个" });
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
  <el-button @click="login">登录</el-button>
</template>

<style scoped></style>
