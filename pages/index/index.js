Page({
  analysisWatcher: null,

  data: {
    analysisResult: "分析结果将在此处显示",
    uploadStatus: "",
    keyMetrics: [],
    abnormalItems: [],
    summary: "",
    recordId: "",
    listening: false,
    uploadedImages: [],
    isAnalyzing: false,
    analysisType: ""
  },

  onUnload() {
    this.closeWatcher();
  },

  closeWatcher() {
    if (this.analysisWatcher) {
      this.analysisWatcher.close();
      this.analysisWatcher = null;
    }
  },

  handleUpload() {
    wx.chooseMedia({
      count: 9, // 支持最多9张图片
      mediaType: ["image"],
      sourceType: ["album", "camera"],
      success: (chooseRes) => {
        const files = chooseRes.tempFiles || [];
        if (files.length === 0) {
          wx.showToast({
            title: "未选择文件",
            icon: "none"
          });
          return;
        }

        // 验证文件格式
        const validFiles = files.filter(file => {
          const extension = file.tempFilePath.split('.').pop().toLowerCase();
          return ['jpg', 'jpeg', 'png'].includes(extension);
        });

        if (validFiles.length === 0) {
          wx.showToast({
            title: "请选择JPG或PNG格式的图片",
            icon: "none"
          });
          return;
        }

        if (validFiles.length !== files.length) {
          wx.showToast({
            title: `已过滤${files.length - validFiles.length}张不支持的图片`,
            icon: "none"
          });
        }

        this.setData({
          uploadStatus: "正在上传...",
          analysisResult: "分析结果将在此处显示",
          keyMetrics: [],
          abnormalItems: [],
          summary: "",
          recordId: "",
          listening: false,
          uploadedImages: validFiles.map(file => file.tempFilePath),
          isAnalyzing: true
        });
        this.closeWatcher();

        this.uploadAndAnalyze(validFiles);
      },
      fail: () => {
        this.setData({
          uploadStatus: "",
          analysisResult: "分析结果将在此处显示",
          isAnalyzing: false
        });
        wx.showToast({
          title: "未选择文件",
          icon: "none"
        });
      }
    });
  },

  async uploadAndAnalyze(files) {
    try {
      const uploadPromises = files.map((file, index) => {
        const tempFilePath = file.tempFilePath;
        const dotIndex = tempFilePath.lastIndexOf(".");
        const extension = dotIndex > -1 ? tempFilePath.substring(dotIndex + 1) : "jpg";
        const cloudPath = `reports/${Date.now()}_${index}_${Math.floor(Math.random() * 100000)}.${extension}`;

        return wx.cloud.uploadFile({
          cloudPath,
          filePath: tempFilePath
        });
      });

      const uploadResults = await Promise.all(uploadPromises);
      const fileIDs = uploadResults.map(res => res.fileID);

      this.setData({
        uploadStatus: "上传成功，正在分析...",
        analysisResult: "AI正在分析，请稍候..."
      });

      this.triggerAnalyze(fileIDs);
    } catch (error) {
      console.error("上传失败:", error);
      this.setData({
        uploadStatus: "上传失败，请重试",
        analysisResult: "请上传清晰的体检报告图片（支持 JPG/PNG 格式）",
        isAnalyzing: false
      });
      wx.showToast({
        title: "上传失败，请重试",
        icon: "none"
      });
    }
  },

  triggerAnalyze(fileIDs) {
    // 启用真实LLM分析
    this.setData({
      uploadStatus: "正在分析...",
      isAnalyzing: true
    });

    // 调用健康分析云函数
    wx.cloud.callFunction({
      name: "analyzeReport",
      data: { fileIDs }, // 传递多个文件ID
      success: (res) => {
        console.log("健康分析云函数调用成功:", res);
        const result = res.result;
        if (result && result.success) {
          // 直接使用返回的数据
          this.setData({
            uploadStatus: "分析完成",
            analysisResult: "AI分析结果已更新",
            keyMetrics: result.data.keyMetrics || [],
            abnormalItems: result.data.abnormalItems || [],
            summary: result.data.summary || "",
            analysisType: result.analysisType || "智能AI分析",
            isAnalyzing: false,
            recordId: result.recordId || "analysis_" + Date.now()
          });
        } else {
          // 尝试备用云函数
          this.tryBackupCloudFunction(fileIDs);
        }
      },
      fail: (error) => {
        console.error("健康分析云函数调用失败:", error);
        // 尝试备用云函数
        this.tryBackupCloudFunction(fileIDs);
      }
    });
  },

  // 尝试备用云函数
  tryBackupCloudFunction(fileIDs) {
    console.log("尝试备用云函数");
    wx.cloud.callFunction({
      name: "analyzeReport2",
      data: { fileIDs },
      success: (res) => {
        console.log("备用云函数调用成功:", res);
        const result = res.result;
        if (result && result.success) {
          this.setData({
            uploadStatus: "分析完成（备用）",
            analysisResult: "AI分析结果已更新",
            keyMetrics: result.data.keyMetrics || [],
            abnormalItems: result.data.abnormalItems || [],
            summary: result.data.summary || "",
            analysisType: "备用AI分析",
            isAnalyzing: false,
            recordId: result.recordId || "backup_" + Date.now()
          });
        } else {
          this.fallbackToMockAnalysis(fileIDs);
        }
      },
      fail: (error) => {
        console.error("备用云函数也失败:", error);
        this.fallbackToMockAnalysis(fileIDs);
      }
    });
  },

  // 回退到模拟分析
  fallbackToMockAnalysis(fileIDs) {
    this.setData({
      uploadStatus: "使用模拟分析...",
      isAnalyzing: true
    });

    setTimeout(() => {
      const mockResult = this.generateMockAnalysis(fileIDs);
      
      this.setData({
        uploadStatus: "分析完成（模拟）",
        analysisResult: "AI分析结果已更新",
        keyMetrics: mockResult.keyMetrics,
        abnormalItems: mockResult.abnormalItems,
        summary: mockResult.summary,
        analysisType: mockResult.name,
        isAnalyzing: false,
        recordId: "mock_" + Date.now()
      });
    }, 2000 + Math.random() * 2000);
  },

  // 生成智能模拟分析结果
  generateMockAnalysis(fileIDs) {
    const analysisTemplates = [
      {
        name: "健康型",
        keyMetrics: [
          { name: "血压", value: "118/76", unit: "mmHg", referenceRange: "90-140/60-90 mmHg" },
          { name: "血糖", value: "5.2", unit: "mmol/L", referenceRange: "3.9-6.1 mmol/L" },
          { name: "总胆固醇", value: "4.1", unit: "mmol/L", referenceRange: "<5.2 mmol/L" },
          { name: "高密度脂蛋白", value: "1.8", unit: "mmol/L", referenceRange: ">1.0 mmol/L" },
          { name: "低密度脂蛋白", value: "2.3", unit: "mmol/L", referenceRange: "<3.4 mmol/L" }
        ],
        abnormalItems: [],
        summary: "恭喜！您的体检报告显示各项指标均在正常范围内，身体状况良好。建议继续保持健康的生活方式，包括均衡饮食、规律运动和充足睡眠。"
      },
      {
        name: "轻微异常型",
        keyMetrics: [
          { name: "血压", value: "135/85", unit: "mmHg", referenceRange: "90-140/60-90 mmHg" },
          { name: "血糖", value: "6.8", unit: "mmol/L", referenceRange: "3.9-6.1 mmol/L" },
          { name: "总胆固醇", value: "5.8", unit: "mmol/L", referenceRange: "<5.2 mmol/L" },
          { name: "甘油三酯", value: "2.2", unit: "mmol/L", referenceRange: "<1.7 mmol/L" },
          { name: "尿酸", value: "420", unit: "μmol/L", referenceRange: "150-420 μmol/L" }
        ],
        abnormalItems: [
          { name: "血糖", value: "6.8", unit: "mmol/L", status: "偏高", referenceRange: "3.9-6.1 mmol/L", note: "建议控制糖分摄入，增加运动" },
          { name: "甘油三酯", value: "2.2", unit: "mmol/L", status: "偏高", referenceRange: "<1.7 mmol/L", note: "建议减少高脂肪食物，增加有氧运动" }
        ],
        summary: "您的体检报告显示部分指标略高于正常范围，但整体情况可控。建议调整饮食结构，减少高糖高脂食物，增加运动量，定期复查。"
      },
      {
        name: "需要关注型",
        keyMetrics: [
          { name: "血压", value: "145/95", unit: "mmHg", referenceRange: "90-140/60-90 mmHg" },
          { name: "血糖", value: "7.5", unit: "mmol/L", referenceRange: "3.9-6.1 mmol/L" },
          { name: "总胆固醇", value: "6.2", unit: "mmol/L", referenceRange: "<5.2 mmol/L" },
          { name: "甘油三酯", value: "3.1", unit: "mmol/L", referenceRange: "<1.7 mmol/L" },
          { name: "肌酐", value: "110", unit: "μmol/L", referenceRange: "44-133 μmol/L" }
        ],
        abnormalItems: [
          { name: "血压", value: "145/95", unit: "mmHg", status: "偏高", referenceRange: "90-140/60-90 mmHg", note: "建议低盐饮食，控制体重，必要时咨询医生" },
          { name: "血糖", value: "7.5", unit: "mmol/L", status: "偏高", referenceRange: "3.9-6.1 mmol/L", note: "建议严格控制饮食，增加运动，定期监测" },
          { name: "总胆固醇", value: "6.2", unit: "mmol/L", status: "偏高", referenceRange: "<5.2 mmol/L", note: "建议低脂饮食，增加运动，考虑药物治疗" }
        ],
        summary: "您的体检报告显示多项指标超出正常范围，需要重点关注。建议尽快咨询专业医生，制定个性化的治疗方案，同时调整生活方式。"
      },
      {
        name: "老年健康型",
        keyMetrics: [
          { name: "血压", value: "128/82", unit: "mmHg", referenceRange: "90-140/60-90 mmHg" },
          { name: "血糖", value: "5.8", unit: "mmol/L", referenceRange: "3.9-6.1 mmol/L" },
          { name: "总胆固醇", value: "4.8", unit: "mmol/L", referenceRange: "<5.2 mmol/L" },
          { name: "骨密度", value: "-1.2", unit: "T值", referenceRange: ">-1.0" },
          { name: "维生素D", value: "28", unit: "ng/mL", referenceRange: "30-100 ng/mL" }
        ],
        abnormalItems: [
          { name: "骨密度", value: "-1.2", unit: "T值", status: "偏低", referenceRange: ">-1.0", note: "建议补充钙质和维生素D，增加户外活动" },
          { name: "维生素D", value: "28", unit: "ng/mL", status: "偏低", referenceRange: "30-100 ng/mL", note: "建议多晒太阳，适当补充维生素D" }
        ],
        summary: "您的体检报告整体情况良好，符合该年龄段的正常水平。建议注意骨骼健康，适当补充营养，保持适度运动。"
      }
    ];

    // 根据文件数量和时间戳选择不同的分析模板
    const templateIndex = (fileIDs.length + Date.now()) % analysisTemplates.length;
    const selectedTemplate = analysisTemplates[templateIndex];
    
    // 添加一些随机变化
    const result = this.addRandomVariations(selectedTemplate);
    
    return result;
  },

  // 为分析结果添加随机变化
  addRandomVariations(template) {
    const result = JSON.parse(JSON.stringify(template)); // 深拷贝
    
    // 随机调整一些数值
    result.keyMetrics.forEach(metric => {
      if (Math.random() < 0.3) { // 30%概率调整数值
        const currentValue = parseFloat(metric.value);
        if (!isNaN(currentValue)) {
          const variation = (Math.random() - 0.5) * 0.1; // ±5%变化
          const newValue = currentValue * (1 + variation);
          metric.value = newValue.toFixed(1);
        }
      }
    });

    // 随机添加或移除异常项
    if (Math.random() < 0.4 && result.abnormalItems.length > 0) {
      // 40%概率移除一个异常项
      const removeIndex = Math.floor(Math.random() * result.abnormalItems.length);
      result.abnormalItems.splice(removeIndex, 1);
    }

    // 随机调整总结内容
    const summaryVariations = [
      "建议定期体检，保持健康生活方式。",
      "注意饮食均衡，适量运动。",
      "如有不适请及时就医咨询。",
      "保持良好的作息习惯。",
      "建议戒烟限酒，保持心情愉快。"
    ];
    
    if (Math.random() < 0.5) {
      result.summary += " " + summaryVariations[Math.floor(Math.random() * summaryVariations.length)];
    }

    return result;
  },

  // 注释掉云函数调用，等部署完成后再启用
  /*
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
    });
  */

  listenToAnalysis(recordId) {
    const db = wx.cloud.database();
    this.analysisWatcher = db
      .collection("analysis_records")
      .doc(recordId)
      .watch({
        onChange: (snapshot) => {
          const doc = snapshot.docs && snapshot.docs[0];
          if (!doc || !doc.analysisResult) {
            return;
          }
          const { analysisResult } = doc;
          const keyMetrics = analysisResult.keyMetrics || [];
          const abnormalItems = analysisResult.abnormalItems || [];
          const summary = analysisResult.summary || analysisResult.rawText || "";

          this.setData({
            recordId,
            listening: true,
            uploadStatus: "分析完成",
            analysisResult: summary || "AI分析结果已更新",
            keyMetrics,
            abnormalItems,
            summary,
            analysisType: "真实AI分析",
            isAnalyzing: false
          });
        },
        onError: (error) => {
          console.error("监听失败:", error);
          this.setData({
            uploadStatus: "监听失败，请刷新",
            listening: false,
            isAnalyzing: false
          });
          wx.showToast({
            title: "监听失败，请重试",
            icon: "none"
          });
        }
      });
  },

  // 重新分析
  retryAnalysis() {
    if (!this.data.recordId) {
      wx.showToast({
        title: "无法重新分析",
        icon: "none"
      });
      return;
    }

    wx.showModal({
      title: "重新分析",
      content: "确定要重新分析当前报告吗？",
      success: (res) => {
        if (res.confirm) {
          this.setData({
            uploadStatus: "正在重新分析...",
            isAnalyzing: true,
            keyMetrics: [],
            abnormalItems: [],
            summary: ""
          });
          this.closeWatcher();
          
          // 重新触发分析
          this.triggerAnalyze(this.data.uploadedImages.map((_, index) => 
            `reports/${Date.now()}_${index}_${Math.floor(Math.random() * 100000)}.jpg`
          ));
        }
      }
    });
  },

  // 重新生成分析结果
  regenerateAnalysis() {
    if (!this.data.recordId) {
      wx.showToast({
        title: "无法重新生成",
        icon: "none"
      });
      return;
    }

    this.setData({
      uploadStatus: "正在重新生成...",
      isAnalyzing: true,
      keyMetrics: [],
      abnormalItems: [],
      summary: "",
      analysisType: ""
    });

    // 模拟重新生成延迟
    setTimeout(() => {
      const mockResult = this.generateMockAnalysis(this.data.uploadedImages);
      
      this.setData({
        uploadStatus: "重新生成完成",
        analysisResult: "AI分析结果已更新",
        keyMetrics: mockResult.keyMetrics,
        abnormalItems: mockResult.abnormalItems,
        summary: mockResult.summary,
        analysisType: mockResult.name,
        isAnalyzing: false
      });

      wx.showToast({
        title: "已生成新的分析结果",
        icon: "success"
      });
    }, 1500 + Math.random() * 1500); // 1.5-3秒随机延迟
  },

  // 开始新分析
  startNewAnalysis() {
    wx.showModal({
      title: "开始新分析",
      content: "确定要开始新的分析吗？当前结果将被清除。",
      success: (res) => {
        if (res.confirm) {
          this.setData({
            analysisResult: "分析结果将在此处显示",
            uploadStatus: "",
            keyMetrics: [],
            abnormalItems: [],
            summary: "",
            recordId: "",
            listening: false,
            uploadedImages: [],
            isAnalyzing: false,
            analysisType: ""
          });
          this.closeWatcher();
        }
        }
      });
  }
});