<script setup>
import { WebviewWindow } from "@tauri-apps/api/window";

// tauri api
import { invoke } from "@tauri-apps/api/tauri";
import { emit, listen } from "@tauri-apps/api/event";

const openNew = () => {
  const webview = new WebviewWindow("new1", {
    // url: 'https://github.com/tauri-apps/tauri'
    url: "/#/new1",
    decorations: false,
  });
  webview.webview.once("tauri://created", function () {
    // webview window successfully created
    console.log("新窗口创建成功");
  });
  webview.once("tauri://error", function (e) {
    // an error happened creating the webview window
    console.log("新窗口创建失败");
  });

  webview.listen("new1-msg", (e) => {
    console.log("webview listen:", e);
  });
};

function rustMsg() {
  invoke("my_custom_command", { invokeMessage: "自定义参数" }).then((res) => {
    console.log(res);
  });
  // invoke('greet')
}

// listen("new1-msg", (e) => {
//   console.log("listen:new1-msg: ", e);
// }).then((res) => {
//   console.log("listen then :", res);
// });
</script>

<template>
  <div>
    <el-button @click="openNew">打开新窗口</el-button>
    <el-button @click="rustMsg">rustMsg</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
