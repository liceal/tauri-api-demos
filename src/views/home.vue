<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import JsApiApp from "../components/JsApiApp.vue";
import JsApiClipboard from "../components/JsApiClipboard.vue";
import JsApiDialog from "../components/JsApiDialog.vue";
import JsApiFs from "../components/JsApiFs.vue";
import { onMounted, ref } from "vue";
import JsApiPath from "../components/JsApiPath.vue";
import JsApiHttp from "../components/JsApiHttp.vue";
import JsApiNotification from "../components/JsApiNotification.vue";
import JsApiOs from "../components/JsApiOs.vue";
import JsApiWindow from "../components/JsApiWindow.vue";
import JsApiGlobalShortcut from "../components/JsApiGlobalShortcut.vue";
import Test from "../components/Test/index.vue";
import MyVxeTable from "../components/myVxeTable.vue";
import MyVueUse from "../components/myVueUse.vue";
import Demo from "./demo";
const activeName = ref("Demo");
</script>

<template>
  <el-tabs type="border-card" v-model="activeName" class="js-api-tabs">
    <el-tab-pane label="Demo" name="Demo">
      <Demo />
    </el-tab-pane>
    <el-tab-pane label="MyVxeTable" name="myVxeTable">
      <MyVxeTable />
    </el-tab-pane>
    <el-tab-pane label="Test" name="test">
      <Test />
    </el-tab-pane>
    <el-tab-pane label="MyVueUse" name="myVueUse">
      <MyVueUse />
    </el-tab-pane>
    <el-tab-pane label="App" name="app">
      <JsApiApp />
    </el-tab-pane>
    <el-tab-pane label="Clipboard" name="clipboard">
      <JsApiClipboard />
    </el-tab-pane>
    <el-tab-pane label="Dialog" name="dialog">
      <JsApiDialog />
    </el-tab-pane>
    <el-tab-pane label="Path" name="path">
      <JsApiPath />
    </el-tab-pane>
    <el-tab-pane label="FS" name="fs">
      <JsApiFs />
    </el-tab-pane>
    <el-tab-pane label="Http" name="http">
      <JsApiHttp />
    </el-tab-pane>
    <el-tab-pane label="Notification" name="notification">
      <JsApiNotification />
    </el-tab-pane>
    <el-tab-pane label="GlobalShortcut" name="globalshortcut">
      <JsApiGlobalShortcut />
    </el-tab-pane>
    <el-tab-pane label="OS" name="os">
      <JsApiOs />
    </el-tab-pane>
    <el-tab-pane label="Window" name="window">
      <JsApiWindow />
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped></style>
