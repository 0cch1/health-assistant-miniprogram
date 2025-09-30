# LLM模型接入部署指南

## 🎯 目标
将智能健康分析助手小程序接入真正的LLM模型，实现真实的AI分析功能。

## 📋 当前状态
- ✅ 云函数代码已编写完成
- ✅ OCR识别逻辑已实现
- ✅ Gemini API集成已完成
- ❌ 云函数未部署
- ❌ API密钥需要配置
- ❌ 前端调用被注释

## 🚀 部署步骤

### 1. 配置API密钥

#### 获取API密钥：
1. **Google Gemini API**：
   - 访问：https://makersuite.google.com/app/apikey
   - 创建新的API密钥
   - 复制密钥备用

2. **腾讯云OCR API**：
   - 访问：https://console.cloud.tencent.com/cam/capi
   - 创建访问密钥
   - 复制SecretId和SecretKey

#### 在云开发控制台配置环境变量：
1. 打开微信开发者工具
2. 点击"云开发"按钮
3. 进入"云函数"页面
4. 找到"analyzeReport"函数
5. 点击"环境变量"标签
6. 添加以下环境变量：
   - `GEMINI_API_KEY`: 你的Gemini API密钥
   - `TENCENT_SECRET_ID`: 你的腾讯云SecretId
   - `TENCENT_SECRET_KEY`: 你的腾讯云SecretKey

### 2. 部署云函数

#### 方法1：通过微信开发者工具
1. 右键点击 `cloudfunctions/analyzeReport` 文件夹
2. 选择"上传并部署：云端安装依赖"
3. 等待部署完成

#### 方法2：通过云开发控制台
1. 在云函数页面点击"新建云函数"
2. 函数名称：`analyzeReport`
3. 上传代码文件夹：`cloudfunctions/analyzeReport`
4. 点击"确定"

### 3. 启用LLM分析

部署完成后，需要在前端代码中启用云函数调用：

1. 打开 `pages/index/index.js`
2. 找到 `triggerAnalyze` 方法
3. 取消注释云函数调用代码
4. 注释掉模拟分析代码

### 4. 测试功能

1. 上传体检报告图片
2. 等待OCR识别和AI分析
3. 查看真实的分析结果

## 🔧 技术架构

```
用户上传图片
    ↓
云函数接收文件
    ↓
腾讯云OCR识别文字
    ↓
Google Gemini分析内容
    ↓
返回结构化分析结果
    ↓
前端展示结果
```

## 📊 分析能力

- **OCR识别**：支持多张图片文字识别
- **智能分析**：提取关键指标、判断异常项
- **个性化建议**：基于分析结果提供健康建议
- **结构化输出**：JSON格式便于前端展示

## ⚠️ 注意事项

1. **API配额**：注意API调用次数限制
2. **成本控制**：监控API使用费用
3. **数据安全**：确保API密钥安全
4. **错误处理**：完善异常情况处理

## 🎉 完成后的功能

- 真实的OCR文字识别
- 智能的AI健康分析
- 个性化的健康建议
- 专业的结果展示
