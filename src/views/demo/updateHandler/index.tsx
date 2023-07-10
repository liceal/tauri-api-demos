import { ElButton } from "element-plus";

import {
  checkUpdate,
  installUpdate,
  onUpdaterEvent,
} from "@tauri-apps/api/updater";
import { relaunch } from "@tauri-apps/api/process";
import { http } from "@tauri-apps/api";
import JSZip from "jszip";
import { ResponseType } from "@tauri-apps/api/http";
import { defineComponent } from "vue";

async function update() {
  const unlisten = await onUpdaterEvent(({ error, status }) => {
    // This will log all updater events, including status updates and errors.
    console.log("Updater event", error, status);
  });

  try {
    const { shouldUpdate, manifest } = await checkUpdate();

    if (shouldUpdate) {
      // You could show a dialog asking the user if they want to install the update here.
      console.log(
        `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
      );

      // Install the update. This will also restart the app on Windows!
      await installUpdate();

      // On macOS and Linux you will need to restart the app manually.
      // You could use this step to display another confirmation dialog.
      await relaunch();
    }
  } catch (error) {
    console.error(error);
  }

  // you need to call unlisten if your handler goes out of scope, for example if the component is unmounted.
  unlisten();
}

async function update2() {
  console.log("开始下载");

  const url =
    "https://linxianao.com/tauri-test/tauri-api-demos_0.0.0_x64_zh-CN.msi.zip";
  const response: any = await http.fetch(url, {
    method: "GET",
    responseType: ResponseType.Binary,
  });

  // console.log(response);

  // console.log(blob);

  const zip = new JSZip();
  const zipFile = await zip.loadAsync(response);

  const files = Object.keys(zipFile.files);
  if (files.length === 1) {
    const file = zipFile.file(files[0]);
    if (file) {
      const fileData = await file.async("blob");
      const url = URL.createObjectURL(fileData);
      window.open(url); // 在新窗口打开文件
    } else {
      console.error("File not found in ZIP.");
    }
  } else {
    console.error("ZIP file contains multiple files.");
  }
}


export default defineComponent({
  setup(){
    return ()=>[
      <ElButton onClick={update}>更新</ElButton>,
      <ElButton onClick={update2}>手动更新</ElButton>,
    ];
  }
})