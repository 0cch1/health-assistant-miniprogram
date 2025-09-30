@echo off
echo 🔄 强制重新部署云函数
echo.

echo 📋 部署步骤：
echo 1. 删除旧的云函数
echo 2. 重新创建云函数
echo 3. 上传新代码
echo.

echo ⚠️ 请按以下步骤操作：
echo.
echo 方法1 - 通过微信开发者工具：
echo 1. 右键点击 cloudfunctions/analyzeReport 文件夹
echo 2. 选择"删除云函数"
echo 3. 再次右键点击文件夹
echo 4. 选择"上传并部署：云端安装依赖"
echo.
echo 方法2 - 通过云开发控制台：
echo 1. 打开云开发控制台
echo 2. 进入"云函数"页面
echo 3. 删除 analyzeReport 函数
echo 4. 重新创建函数并上传代码
echo.
echo 方法3 - 重命名函数：
echo 1. 将 analyzeReport 重命名为 analyzeReport2
echo 2. 重新部署
echo 3. 更新前端调用函数名
echo.

echo 📝 当前云函数代码已简化为最基本版本
echo 确保使用正确的 wx-server-sdk
echo.

pause
