# 任务：修复卡牌显示问题

## 问题描述

1. **看不到全部卡牌** - 手牌显示不完整
2. **出牌后无法了解牌的内容** - 需要卡牌详情功能

## 需要修复的文件

### 1. CombatView.vue - 手牌显示

**问题**：手牌可能被遮挡或重叠

**修复方案**：
- 确保手牌区域有足够的高度
- 使用横向滚动或缩小卡牌尺寸
- 每张卡牌都应该完整可见

### 2. 添加卡牌详情功能

**功能**：
- 点击卡牌时显示详情弹窗
- 显示卡牌名称、描述、费用、类型
- 显示卡牌效果说明

**实现方式**：
- 添加 `selectedCard` 状态
- 添加 `showCardDetail` 弹窗组件
- 点击卡牌时显示详情，再次点击关闭

## 具体修改

### CombatView.vue 修改

1. **手牌区域**：
```vue
<!-- 确保手牌区域高度足够 -->
<div class="hand-area h-48 overflow-x-auto">
  <div class="flex gap-2 p-2 min-w-max">
    <div v-for="(card, index) in hand" 
         :key="index"
         class="card-wrapper flex-shrink-0 w-32">
      <!-- 卡牌内容 -->
    </div>
  </div>
</div>
```

2. **卡牌详情弹窗**：
```vue
<!-- 卡牌详情弹窗 -->
<div v-if="selectedCard" class="card-detail-modal" @click="selectedCard = null">
  <div class="card-detail-content" @click.stop>
    <h3>{{ selectedCard.name }}</h3>
    <p class="cost">费用: {{ selectedCard.cost }}</p>
    <p class="type">类型: {{ cardTypeText[selectedCard.type] }}</p>
    <p class="description">{{ selectedCard.description }}</p>
    <button @click="selectedCard = null">关闭</button>
  </div>
</div>
```

3. **卡牌点击事件**：
```vue
<div class="card" @click="showCardDetail(card)">
  <!-- 卡牌内容 -->
</div>
```

## 翻译对照

| 中文 | 英文 (代码) |
|------|-------------|
| 攻击 | ATTACK |
| 技能 | SKILL |
| 能力 | POWER |

## 验收标准

1. 所有手牌都能完整显示
2. 点击卡牌能显示详情
3. 详情弹窗显示：名称、费用、类型、描述
4. 点击弹窗外部或关闭按钮能关闭弹窗
5. 游戏功能不受影响

## 执行顺序

1. 修复手牌显示区域
2. 添加卡牌详情状态和弹窗
3. 添加卡牌点击事件
4. 测试并提交

**开始修复！确保玩家能看到所有卡牌并了解每张牌的效果。**
