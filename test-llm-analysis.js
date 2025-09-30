// 测试LLM分析功能的脚本
console.log('🧪 LLM分析功能测试');
console.log('');

// 检查云函数是否存在
console.log('📋 检查项目结构...');
const fs = require('fs');
const path = require('path');

const cloudFunctionPath = path.join(__dirname, 'cloudfunctions/analyzeReport');
const indexJsPath = path.join(cloudFunctionPath, 'index.js');
const packageJsonPath = path.join(cloudFunctionPath, 'package.json');
const configJsonPath = path.join(cloudFunctionPath, 'config.json');

console.log('✅ 云函数目录:', fs.existsSync(cloudFunctionPath) ? '存在' : '❌ 不存在');
console.log('✅ index.js:', fs.existsSync(indexJsPath) ? '存在' : '❌ 不存在');
console.log('✅ package.json:', fs.existsSync(packageJsonPath) ? '存在' : '❌ 不存在');
console.log('✅ config.json:', fs.existsSync(configJsonPath) ? '存在' : '❌ 不存在');

// 检查前端代码
const frontendPath = path.join(__dirname, 'pages/index/index.js');
const frontendContent = fs.readFileSync(frontendPath, 'utf8');

console.log('');
console.log('📋 检查前端代码...');
console.log('✅ 云函数调用:', frontendContent.includes('wx.cloud.callFunction') ? '已启用' : '❌ 未启用');
console.log('✅ 回退机制:', frontendContent.includes('fallbackToMockAnalysis') ? '已配置' : '❌ 未配置');

// 检查云函数代码
const cloudFunctionContent = fs.readFileSync(indexJsPath, 'utf8');
console.log('');
console.log('📋 检查云函数代码...');
console.log('✅ OCR集成:', cloudFunctionContent.includes('GeneralBasicOCR') ? '已配置' : '❌ 未配置');
console.log('✅ Gemini API:', cloudFunctionContent.includes('generativelanguage.googleapis.com') ? '已配置' : '❌ 未配置');
console.log('✅ 环境变量:', cloudFunctionContent.includes('process.env') ? '已配置' : '❌ 未配置');

console.log('');
console.log('🎯 下一步操作：');
console.log('1. 运行 deploy-cloud-function.bat 部署云函数');
console.log('2. 按照 API_KEYS_SETUP.md 配置API密钥');
console.log('3. 在微信开发者工具中测试上传功能');
console.log('');
console.log('📚 详细文档：');
console.log('- LLM_DEPLOYMENT_GUIDE.md - 完整部署指南');
console.log('- API_KEYS_SETUP.md - API密钥配置指南');
