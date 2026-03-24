# Agent 开发指南

## 代码规范

### 文件结构
```
src/
├── assets/          # 图片、图标
├── components/      # Vue 组件
│   ├── battle/      # 战斗相关组件
│   ├── cards/       # 卡牌组件
│   ├── map/         # 地图组件
│   └── ui/          # 通用 UI 组件
├── composables/     # Vue 组合式函数
├── data/            # 游戏数据（卡牌、敌人、遗物）
├── stores/          # Pinia 状态管理
├── types/           # TypeScript 类型定义
└── utils/           # 工具函数
```

### 命名规范
- 组件：PascalCase (BattleScene.vue)
- 组合式函数：use 前缀 (useBattle.ts)
- Store：use 前缀 (useGameStore.ts)
- 类型：PascalCase (interface Card)

### 样式规范
- 使用 Tailwind CSS 或简洁的 scoped CSS
- 移动端优先，使用 rem/em 单位
- 颜色使用 CSS 变量

## 开发优先级

1. **战斗系统** > 地图系统 > 遗物系统
2. **核心循环** > 额外功能
3. **功能完整** > 视觉效果

## 测试要点

- 战斗流程是否完整
- 能量消耗是否正确
- 护甲计算是否准确
- 移动端触摸是否流畅

## 注意事项

- 不要使用第三方游戏引擎，纯 Vue 3 实现
- 保持代码简洁，避免过度抽象
- 注释关键逻辑，方便后续维护
