// 快速修复云函数SDK问题
const fs = require('fs');
const path = require('path');

console.log('🔧 正在修复云函数SDK问题...');

const cloudFunctionPath = path.join(__dirname, 'cloudfunctions/analyzeReport');
const indexPath = path.join(cloudFunctionPath, 'index.js');
const packageJsonPath = path.join(cloudFunctionPath, 'package.json');

// 备份原文件
const backupPath = path.join(cloudFunctionPath, 'index-backup.js');
if (fs.existsSync(indexPath)) {
  fs.copyFileSync(indexPath, backupPath);
  console.log('✅ 已备份原文件到 index-backup.js');
}

// 使用简化版云函数
const simplePath = path.join(cloudFunctionPath, 'index-simple.js');
if (fs.existsSync(simplePath)) {
  fs.copyFileSync(simplePath, indexPath);
  console.log('✅ 已使用简化版云函数');
}

// 更新package.json
const packageJson = {
  "name": "analyzeReport",
  "version": "1.0.0",
  "description": "Cloud function for analyzing health reports via OCR and LLM",
  "main": "index.js",
  "dependencies": {
    "axios": "^1.7.1",
    "wx-server-sdk": "~2.6.3",
    "tencentcloud-sdk-nodejs": "4.0.563"
  }
};

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('✅ 已更新 package.json');

console.log('');
console.log('🎯 下一步操作：');
console.log('1. 在微信开发者工具中重新部署云函数');
console.log('2. 测试上传功能');
console.log('3. 查看控制台日志');
console.log('');
console.log('📝 修复内容：');
console.log('- 使用 wx-server-sdk 替代 tcb-admin-node');
console.log('- 简化云函数逻辑，先测试基本功能');
console.log('- 更新依赖包版本');
