#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
直接将yaofang.txt数据整合到sampleLibrary.js中
替换"主要症状"为"主要诉求"
"""

import os
import re
import json
from datetime import datetime

def read_yaofang_file(file_path):
    """读取yaofang.txt文件"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f"读取文件失败: {e}")
        return ""

def parse_header(line):
    """解析头部信息：性别,年龄,诉求"""
    match = re.match(r'^([男女]),(\d{1,3})岁,([^,]+),', line)
    if not match:
        return None, None, None
    
    gender = "male" if match.group(1) == "男" else "female"
    age = int(match.group(2))
    appeal = match.group(3).strip()
    
    return gender, age, appeal

def parse_herbs(line):
    """解析药方信息"""
    # 去掉头部信息
    herb_part = re.sub(r'^[男女],\d{1,3}岁,[^,]+,', '', line)
    
    # 按分号分割药材
    herb_entries = [entry.strip() for entry in re.split(r'[;；]', herb_part) if entry.strip()]
    
    herbs = []
    for entry in herb_entries:
        # 匹配格式：药材名 用量g 效用描述
        match = re.match(r'^([^0-9]+?)\s*(\d+(?:\.\d+)?)\s*g\s*(.+)$', entry)
        if match:
            name = match.group(1).strip()
            amount = float(match.group(2))
            effect = match.group(3).strip()
            
            herbs.append({
                "name": name,
                "amount": amount,
                "unit": "g",
                "effect": effect
            })
    
    return herbs

def convert_to_samples(text):
    """转换为样本数据"""
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    samples = []
    
    for i, line in enumerate(lines):
        gender, age, appeal = parse_header(line)
        herbs = parse_herbs(line)
        
        if not gender or not age or not appeal or not herbs:
            print(f"跳过无效行 {i + 1}: {line[:50]}...")
            continue
        
        sample_id = f"yaofang_{i + 1:02d}"
        
        sample = {
            "id": sample_id,
            "meta": {
                "gender": gender,
                "age": age
            },
            "labs": {},
            "history": [],
            "lifestyle": {},
            "symptoms": [appeal],  # 用户诉求作为主要症状
            "tcm_pattern": None,
            "constitution": None,
            "herbal_plan": {
                "prescriptionId": None,
                "customHerbs": herbs,
                "explanations": [f"基于用户诉求：{appeal}"]
            },
            "contra": [],
            "notes": f"来源：yaofang.txt 第{i + 1}行，用户诉求：{appeal}"
        }
        
        samples.append(sample)
    
    return samples

def generate_sample_library(samples):
    """生成完整的sampleLibrary.js文件"""
    header = f"""/**
 * SAMPLE_LIBRARY - 药方数据样本库
 * 直接从 yaofang.txt 生成
 * 生成时间：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
 * 
 * 数据说明：
 * - symptoms: 用户的主要诉求（如"降血压"、"调理肝功能"等）
 * - herbal_plan.customHerbs: 药方中的每味药材及其效用
 * - herbal_plan.explanations: 基于用户诉求的说明
 */

const SAMPLE_LIBRARY = """
    
    footer = """;

module.exports = { SAMPLE_LIBRARY };
"""
    
    json_str = json.dumps(samples, ensure_ascii=False, indent=4)
    return header + json_str + footer

def main():
    """主函数"""
    print("开始更新sampleLibrary.js...")
    
    # 获取文件路径
    script_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.dirname(script_dir)
    src_file = os.path.join(root_dir, "yaofang.txt")
    out_file = os.path.join(root_dir, "cloudfunctions", "analyzeReport", "sampleLibrary.js")
    
    # 读取源文件
    text = read_yaofang_file(src_file)
    if not text:
        print("无法读取yaofang.txt文件")
        return
    
    # 转换数据
    samples = convert_to_samples(text)
    print(f"成功解析 {len(samples)} 个药方样本")
    
    # 显示前几个样本的摘要
    for i, sample in enumerate(samples[:3]):
        print(f"- {sample['id']}: {sample['meta']['gender']}, {sample['meta']['age']}岁, 诉求: {sample['symptoms'][0]}, 药材数: {len(sample['herbal_plan']['customHerbs'])}")
    
    # 生成输出文件
    output = generate_sample_library(samples)
    
    # 确保输出目录存在
    os.makedirs(os.path.dirname(out_file), exist_ok=True)
    
    # 写入文件
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(output)
    
    print(f"sampleLibrary.js 已更新: {out_file}")

if __name__ == "__main__":
    main()
