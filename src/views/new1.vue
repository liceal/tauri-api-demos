<script setup>
import { onMounted, onUnmounted, onUpdated, reactive, ref } from "vue";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/tauri";
import { number } from "../utils/store";
import { emit, listen } from "@tauri-apps/api/event";

onMounted(async () => {
  await appWindow.setMinSize(new LogicalSize(300, 300));
});

function rustMsg() {
  invoke("my_custom_command");
}

function globalEmit() {
  emit("new1-msg", {
    theMessage: "弹窗发出的消息",
  });
}

// listen("new1-msg", (e) => {
//   console.log("listen:new1-msg: ", e);
// }).then((res) => {
//   console.log("listen then :", res);
// });
</script>

<template>
  <div>
    <div
      data-tauri-drag-region
      style="height: 50px; width: 50px; background: red"
    >
      按我拖拽
    </div>
    新窗口
    <el-button @click="rustMsg">rust msg</el-button>
    <p>
      <el-button @click="globalEmit">发送消息</el-button>
    </p>
    <div style="display: flex; gap: 20px">
      <div
        style="width: 50px; height: 50px; background: red"
        v-for="i in 5"
        :key="i"
      >
        {{ i }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
