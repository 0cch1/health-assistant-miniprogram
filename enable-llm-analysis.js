// 启用LLM分析的脚本
// 运行此脚本将自动修改代码以启用真实的LLM分析

const fs = require('fs');
const path = require('path');

console.log('🚀 正在启用LLM分析功能...');

// 读取当前的前端代码
const indexPath = path.join(__dirname, 'pages/index/index.js');
let content = fs.readFileSync(indexPath, 'utf8');

// 注释掉模拟分析代码
content = content.replace(
  /\/\/ 模拟分析延迟[\s\S]*?}, 2000 \+ Math\.random\(\) \* 2000\); \/\/ 2-4秒随机延迟/,
  `// 模拟分析代码已注释，启用真实LLM分析
  /*
  setTimeout(() => {
    const mockResult = this.generateMockAnalysis(fileIDs);
    
    this.setData({
      uploadStatus: "分析完成",
      analysisResult: "AI分析结果已更新",
      keyMetrics: mockResult.keyMetrics,
      abnormalItems: mockResult.abnormalItems,
      summary: mockResult.summary,
      analysisType: mockResult.name,
      isAnalyzing: false,
      recordId: "mock_" + Date.now()
    });
  }, 2000 + Math.random() * 2000); // 2-4秒随机延迟
  */`
);

// 启用云函数调用
content = content.replace(
  /\/\/ 注释掉云函数调用，等部署完成后再启用[\s\S]*?\/\*/,
  `// 启用云函数调用进行真实LLM分析
  wx.cloud.callFunction({
    name: "analyzeReport",
    data: { fileIDs }, // 传递多个文件ID
    success: (res) => {
      const recordId = res.result && res.result.recordId;
      if (!recordId) {
        this.setData({
          uploadStatus: "分析结果获取失败",
          analysisResult: "未能获取分析记录，请稍后重试",
          isAnalyzing: false
        });
        return;
      }
      this.listenToAnalysis(recordId);
    },
    fail: (error) => {
      console.error("分析调用失败:", error);
      this.setData({
        uploadStatus: "分析调用失败",
        analysisResult: "调用云函数失败，请稍后重试",
        isAnalyzing: false
      });
      wx.showToast({
        title: "分析失败，请重试",
        icon: "none"
      });
    }
  });`
);

// 写回文件
fs.writeFileSync(indexPath, content);

console.log('✅ LLM分析功能已启用！');
console.log('📋 接下来需要：');
console.log('1. 部署云函数到云开发环境');
console.log('2. 配置API密钥');
console.log('3. 测试功能');
console.log('');
console.log('详细步骤请查看：LLM_DEPLOYMENT_GUIDE.md');
