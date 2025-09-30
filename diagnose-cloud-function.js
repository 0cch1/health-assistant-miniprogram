// 云函数部署诊断脚本
const fs = require('fs');
const path = require('path');

console.log('🔍 云函数部署诊断');
console.log('');

// 检查项目结构
const cloudFunctionsDir = path.join(__dirname, 'cloudfunctions');
const testFunctionDir = path.join(cloudFunctionsDir, 'testFunction');
const analyzeReportDir = path.join(cloudFunctionsDir, 'analyzeReport');
const analyzeReport2Dir = path.join(cloudFunctionsDir, 'analyzeReport2');

console.log('📁 检查云函数目录结构:');
console.log('✅ cloudfunctions 目录:', fs.existsSync(cloudFunctionsDir) ? '存在' : '❌ 不存在');
console.log('✅ testFunction 目录:', fs.existsSync(testFunctionDir) ? '存在' : '❌ 不存在');
console.log('✅ analyzeReport 目录:', fs.existsSync(analyzeReportDir) ? '存在' : '❌ 不存在');
console.log('✅ analyzeReport2 目录:', fs.existsSync(analyzeReport2Dir) ? '存在' : '❌ 不存在');

// 检查云函数文件
console.log('');
console.log('📄 检查云函数文件:');
console.log('✅ testFunction/index.js:', fs.existsSync(path.join(testFunctionDir, 'index.js')) ? '存在' : '❌ 不存在');
console.log('✅ testFunction/package.json:', fs.existsSync(path.join(testFunctionDir, 'package.json')) ? '存在' : '❌ 不存在');
console.log('✅ analyzeReport/index.js:', fs.existsSync(path.join(analyzeReportDir, 'index.js')) ? '存在' : '❌ 不存在');
console.log('✅ analyzeReport2/index.js:', fs.existsSync(path.join(analyzeReport2Dir, 'index.js')) ? '存在' : '❌ 不存在');

// 检查前端代码
const frontendPath = path.join(__dirname, 'pages/index/index.js');
const frontendContent = fs.readFileSync(frontendPath, 'utf8');

console.log('');
console.log('📱 检查前端代码:');
console.log('✅ 云函数调用:', frontendContent.includes('wx.cloud.callFunction') ? '已配置' : '❌ 未配置');
console.log('✅ testFunction 调用:', frontendContent.includes('testFunction') ? '已配置' : '❌ 未配置');
console.log('✅ 回退机制:', frontendContent.includes('fallbackToMockAnalysis') ? '已配置' : '❌ 未配置');

// 检查app.js配置
const appPath = path.join(__dirname, 'app.js');
const appContent = fs.readFileSync(appPath, 'utf8');

console.log('');
console.log('⚙️ 检查云开发配置:');
console.log('✅ wx.cloud.init:', appContent.includes('wx.cloud.init') ? '已配置' : '❌ 未配置');
console.log('✅ 环境ID:', appContent.includes('env:') ? '已配置' : '❌ 未配置');

console.log('');
console.log('🎯 建议操作:');
console.log('1. 在微信开发者工具中部署 testFunction 云函数');
console.log('2. 测试上传功能');
console.log('3. 如果成功，再部署其他云函数');
console.log('');
console.log('📚 详细指南: EMERGENCY_DEPLOYMENT_GUIDE.md');
