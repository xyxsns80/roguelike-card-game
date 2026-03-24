# 任务：优化手牌交互体验

## 问题描述

1. **滑动区域太小** - 手牌区域高度不够，滑动操作困难
2. **费用显示看不清** - 卡牌费用显示不明显

## 修复方案

### 1. 增大滑动区域

**当前**：`h-56` (224px)
**修改为**：`h-72` (288px) 或更大

同时增大卡牌尺寸：
- 当前：`min-width: 120px; max-width: 140px`
- 修改为：`min-width: 150px; max-width: 180px`

### 2. 优化费用显示

**当前问题**：费用圆圈太小，颜色对比度不够

**修改方案**：
- 增大费用圆圈：`w-12 h-12` (48px)
- 使用更醒目的颜色：金色渐变 `from-yellow-400 to-amber-600`
- 增大字体：`text-lg font-bold`
- 添加发光效果：`shadow-lg shadow-yellow-500/50`

## 具体修改

### CombatView.vue

```vue
<!-- 手牌区域：增大高度 -->
<div class="hand-cards-area h-72 overflow-x-auto overflow-y-hidden">
  <div class="hand-cards flex gap-4 px-4 py-3 min-h-full items-center" style="min-width: max-content;">
    <div
      class="card-item ..."
      style="min-width: 160px; max-width: 180px;"
    >
      <!-- 费用显示：更大更醒目 -->
      <div class="card-cost absolute -top-4 -left-4 w-12 h-12 rounded-full 
                  bg-gradient-to-br from-yellow-400 to-amber-600 
                  flex items-center justify-center 
                  text-lg font-bold text-slate-900
                  shadow-lg shadow-yellow-500/50 border-2 border-yellow-300">
        {{ card.cost }}
      </div>
```

### 卡牌内容也增大

```vue
<div class="card-content p-3">
  <h4 class="text-base font-bold mb-2">{{ card.name }}</h4>
  <p class="text-xs text-slate-300 mb-2">{{ card.description }}</p>
  <div class="text-xs text-slate-400">
    {{ cardTypeText[card.type] }}
  </div>
</div>
```

## 验收标准

1. 手牌区域高度至少 288px
2. 每张卡牌宽度 160-180px
3. 费用圆圈 48px，金色渐变
4. 费用数字清晰可见
5. 滑动操作顺畅

## 执行顺序

1. 增大手牌区域高度
2. 增大卡牌尺寸
3. 优化费用显示样式
4. 重新构建并推送

**开始优化！确保玩家能轻松滑动查看手牌，费用一目了然。**
