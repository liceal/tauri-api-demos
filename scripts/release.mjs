import { createRequire } from 'module';
import { execSync } from 'child_process';
import fs from 'fs';

import updatelog from './updatelog.mjs';

const require = createRequire(import.meta.url);

async function release() {
  /*
  # 发布主版本，v1.x.x -> v2.x.x
  yarn release major
  
  # 发布次版本，v1.0.x -> v1.1.x
  yarn release minor
  
  # 发布补丁版本，patch 参数可省略，v1.0.0 -> v1.0.1
  yarn release [patch]
  */
  const flag = process.argv[2] ?? 'patch';
  const packageJson = require('../package.json');
  const tauriConfigJson = require('../src-tauri/tauri.conf.json');
  let [a, b, c] = packageJson.version.split('.').map(Number);

  if (flag === 'major') {  // 主版本
    a += 1;
    b = 0;
    c = 0;
  } else if (flag === 'minor') {  // 次版本
    b += 1;
    c = 0;
  } else if (flag === 'patch') {  // 补丁版本
    c += 1;
  } else {
    console.log(`Invalid flag "${flag}"`);
    process.exit(1);
  }

  const nextVersion = `${a}.${b}.${c}`;
  packageJson.version = nextVersion;
  tauriConfigJson.package.version = nextVersion

  const nextTag = `v${nextVersion}`;
  await updatelog(nextTag, 'release');

  // 将新版本写入 package.json 文件
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
  fs.writeFileSync('./src-tauri/tauri.conf.json', JSON.stringify(tauriConfigJson, null, 2));

  // 提交修改的文件，打 tag 标签（tag 标签是为了触发 github action 工作流）并推送到远程
  execSync('git add ./package.json ./src-tauri/tauri.conf.json ./UPDATE_LOG.md');
  execSync(`git commit -m "v${nextVersion}"`);
  execSync(`git tag -a v${nextVersion} -m "v${nextVersion}"`);
  execSync(`git push`);
  execSync(`git push origin v${nextVersion}`);
  console.log(`Publish Successfully...`);
}

release().catch(console.error);