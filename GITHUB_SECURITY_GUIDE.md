# 🔐 GitHub安全部署指南

## ✅ 已完成的配置
- API密钥已替换为环境变量
- 创建了本地配置文件（不提交到GitHub）
- 添加了.gitignore文件
- 支持多种配置方式

## 🔧 配置优先级

### 1. 本地配置文件（开发环境）
```javascript
// local-config.js - 不提交到GitHub
module.exports = {
  GEMINI_API_KEY: "your_real_api_key",
  TENCENT_SECRET_ID: "your_real_secret_id",
  TENCENT_SECRET_KEY: "your_real_secret_key"
};
```

### 2. 环境变量（生产环境）
```bash
# 在云开发控制台设置
GEMINI_API_KEY=your_real_api_key
TENCENT_SECRET_ID=your_real_secret_id
TENCENT_SECRET_KEY=your_real_secret_key
```

### 3. 默认值（安全回退）
```javascript
// 如果都没有配置，使用默认值
"your_gemini_api_key_here"
"your_tencent_secret_id_here"
"your_tencent_secret_key_here"
```

## 🚀 部署步骤

### 开发环境（本地）
1. 使用 `local-config.js` 文件
2. 包含真实的API密钥
3. 文件不会提交到GitHub

### 生产环境（云开发）
1. 在云开发控制台设置环境变量
2. 或者使用云函数的环境变量功能
3. 确保API密钥安全

## 📁 文件说明

### 提交到GitHub的文件
- ✅ `cloudfunctions/analyzeReport/index.js` - 云函数代码
- ✅ `env.example` - 环境变量示例
- ✅ `.gitignore` - Git忽略文件
- ✅ 所有其他项目文件

### 不提交到GitHub的文件
- ❌ `local-config.js` - 包含真实API密钥
- ❌ `.env` - 环境变量文件
- ❌ `project.private.config.json` - 私有配置

## 🔒 安全特性

### 1. 多层配置
- 本地配置 → 环境变量 → 默认值
- 确保在任何环境下都能工作

### 2. 密钥保护
- 真实密钥不提交到GitHub
- 使用示例值作为默认值
- 支持环境变量配置

### 3. 回退机制
- 如果API密钥无效，自动使用模拟分析
- 确保功能始终可用

## 🎯 使用方法

### 本地开发
1. 使用 `local-config.js` 文件
2. 包含真实的API密钥
3. 正常开发和测试

### 生产部署
1. 在云开发控制台设置环境变量
2. 部署云函数
3. 功能正常工作

### GitHub分享
1. 代码安全，不包含真实密钥
2. 其他人可以克隆并使用
3. 需要自己配置API密钥

## ⚠️ 注意事项

1. **不要提交** `local-config.js` 到GitHub
2. **定期轮换** API密钥
3. **监控使用量** 避免意外费用
4. **备份配置** 以防丢失

现在您可以安全地上传到GitHub了！🎉
