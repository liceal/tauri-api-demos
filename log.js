// const log = `# Updater Log

// ## v0.0.35

// - try tauri version
// asdlflkj
// - adlk123

// ## v0.0.34

// - 跟 chatbox 配置相同再试下

// ## v0.0.33
// 每个版本之间的内容`;

const fs = require('fs');
const path = require('path');

const UPDATE_LOG = 'UPDATE_LOG.md';

const file = path.join(process.cwd(), UPDATE_LOG);
if (!fs.existsSync(file)) {
  console.log('Could not found UPDATE_LOG.md');
  process.exit(1);
}
const log = fs.readFileSync(file, { encoding: 'utf8' });


// 使用正则表达式匹配第一个版本号和内容
const regex = /##\s+(v\d+\.\d+\.\d+)\s+([\s\S]*?)(?=##\s+v\d+\.\d+\.\d+|$)/;
const match = regex.exec(log);
if (match) {
  const version = match[1];
  const content = match[2].trim();
  // console.log(`Version: ${version}`);
  // console.log(`Content: ${content}`);
  console.log(content);
  return content

} else {
  console.log("No matching version found.");
  return ''
}



