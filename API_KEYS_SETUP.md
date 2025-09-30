# API密钥配置指南

## 🔑 获取API密钥

### 1. Google Gemini API
1. 访问：https://makersuite.google.com/app/apikey
2. 登录Google账号
3. 点击"Create API Key"
4. 复制生成的API密钥

### 2. 腾讯云OCR API
1. 访问：https://console.cloud.tencent.com/cam/capi
2. 登录腾讯云控制台
3. 点击"新建密钥"
4. 复制SecretId和SecretKey

## ⚙️ 配置环境变量

### 方法1：通过云开发控制台
1. 打开微信开发者工具
2. 点击"云开发"按钮
3. 进入"云函数"页面
4. 找到"analyzeReport"函数
5. 点击"环境变量"标签
6. 添加以下环境变量：
   - `GEMINI_API_KEY`: 你的Gemini API密钥
   - `TENCENT_SECRET_ID`: 你的腾讯云SecretId
   - `TENCENT_SECRET_KEY`: 你的腾讯云SecretKey

### 方法2：通过代码配置（临时）
如果无法通过控制台配置，可以临时在代码中设置：

1. 打开 `cloudfunctions/analyzeReport/index.js`
2. 找到以下行：
   ```javascript
   const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "your_api_key_here";
   ```
3. 替换 `"your_api_key_here"` 为你的实际API密钥

## 🧪 测试配置

配置完成后，可以通过以下方式测试：

1. 上传一张体检报告图片
2. 查看控制台日志
3. 检查是否出现OCR识别结果
4. 查看AI分析是否正常返回

## ⚠️ 安全提醒

- 不要将API密钥提交到代码仓库
- 定期轮换API密钥
- 监控API使用量和费用
- 设置合理的API调用限制
