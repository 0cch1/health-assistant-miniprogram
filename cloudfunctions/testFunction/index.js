// 最简单的测试云函数
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  console.log("测试云函数被调用");
  console.log("event:", event);
  console.log("context:", context);

  return {
    success: true,
    message: "测试云函数工作正常",
    timestamp: new Date().toISOString(),
    data: {
      keyMetrics: [
        {
          name: "测试指标",
          value: "100",
          unit: "测试单位",
          referenceRange: "正常范围"
        }
      ],
      abnormalItems: [],
      summary: "这是一个测试云函数，用于验证云函数部署是否成功。"
    }
  };
};
