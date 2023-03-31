<script setup>
import { useDark, useToggle, useEyeDropper } from "@vueuse/core";
import { watch } from "vue";

// 改变主题
const isDark = useDark();
const toggleDark = useToggle(isDark);
watch(isDark, (val) => {
  console.log("isDark: ", val);
});

// 取色器
const { isSupported, open, sRGBHex } = useEyeDropper();
</script>

<template>
  <div>
    <el-button @click="toggleDark()">改变主题</el-button>
  </div>
  <div>
    <template v-if="isSupported">
      <div>isSupported: {{ isSupported }}</div>
      <div>
        sRGBHex: <span :style="{ color: sRGBHex }">{{ sRGBHex }}</span>
      </div>
      <el-button :disabled="!isSupported" @click="() => open()">
        Open Eye Dropper 取色器
      </el-button>
    </template>
    <div v-else>
      <span>Not Supported by Your Browser</span>
    </div>
  </div>
</template>

<style scoped></style>
