<script setup>
import { WebviewWindow, appWindow, getAll } from "@tauri-apps/api/window";
import { ask, confirm, message, open, save } from "@tauri-apps/api/dialog";
// tauri api
import { invoke } from "@tauri-apps/api/tauri";
import { emit, listen } from "@tauri-apps/api/event";

// import router from "@/router";

const createNew = () => {
  const webview = new WebviewWindow("new2", {
    // url: 'https://github.com/tauri-apps/tauri'
    url: "/#/new2",
  });
  webview.webview.once("tauri://created", function () {
    // webview window successfully created
    console.log("新窗口创建成功");
  });
  webview.once("tauri://error", function (e) {
    // an error happened creating the webview window
    console.log("新窗口创建失败");
  });
};

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

function login() {
  const loginWindow = WebviewWindow.getByLabel("login");
  if (loginWindow) {
    loginWindow.show();
    message("显示login窗口", { title: "Tauri", type: "info" });
    return;
  }

  const webview = new WebviewWindow("login", {
    // url: 'https://github.com/tauri-apps/tauri'
    url: "/#/login",
  });
  webview.once("tauri://created", function () {
    // webview window successfully created
    console.log("create success");
    appWindow.close();
  });
}

function labelDialogOpen() {
  const testWindow = getAll();
  console.log(testWindow);
}

function hide() {
  appWindow.hide();
}
</script>

<template>
  <div>
    <el-button @click="createNew">创建新窗口</el-button>
    <el-button @click="openNew">打开新窗口</el-button>
    <el-button @click="rustMsg">rustMsg</el-button>
    <el-button @click="login">登录</el-button>
    <el-button @click="labelDialogOpen">根据label打开弹窗</el-button>
    <el-button @click="hide">隐藏，不是关闭，可以在托盘内唤起</el-button>
  </div>
</template>

<style lang="scss" scoped></style>
