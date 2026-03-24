# 🃏 Roguelike Card Game

> 手机肉鸽卡牌游戏 - 类似杀戮尖塔
> Vue 3 + TypeScript + Pinia + Vite + Tailwind CSS

## 🎮 游戏特性

### 核心系统
- ✅ **卡牌系统** - 攻击/技能/能力卡牌
- ✅ **战斗系统** - 回合制战斗 + 能量管理
- ✅ **敌人 AI** - 多种敌人行为模式
- ✅ **状态效果** - Buff/Debuff 系统

### Roguelike 元素
- ✅ **地图系统** - 随机生成地图
- ✅ **事件系统** - 随机事件
- ✅ **商店系统** - 购买卡牌和遗物
- ✅ **奖励系统** - 战斗奖励选择

### UI 组件
- ✅ CombatView - 战斗界面
- ✅ MapView - 地图导航
- ✅ ShopView - 商店界面
- ✅ RewardView - 奖励选择
- ✅ EventView - 事件界面
- ✅ GameOverView - 游戏结束

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📱 移动端适配

- 响应式设计 (375px - 428px)
- 触摸友好界面
- 竖屏优先
- 流畅动画 (60fps)

## 🏗️ 项目结构

```
src/
├── components/     # Vue 组件
│   └── game/       # 游戏界面组件
├── data/           # 游戏数据
│   ├── cards/      # 卡牌定义
│   ├── enemies/    # 敌人定义
│   └── events/     # 事件定义
├── stores/         # Pinia 状态管理
├── types/          # TypeScript 类型
└── utils/          # 工具函数
```

## 🎯 开发进度

- [x] 项目架构
- [x] 卡牌系统
- [x] 战斗系统
- [x] 敌人 AI
- [x] 地图生成
- [x] 事件系统
- [x] 商店系统
- [ ] 遗物系统
- [ ] PWA 配置
- [ ] 部署

## 📄 许可证

MIT License

---

*由 Ralph (AI 自主开发) 创建*
