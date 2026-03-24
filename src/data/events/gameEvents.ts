/**
 * Game events with meaningful choices
 */

import type { GameEvent } from '@/types/event'

export const GAME_EVENTS: GameEvent[] = [
  {
    id: 'the_shrine',
    title: '神龛',
    description: '你发现了一座闪烁着神秘能量的古老神龛。你可以致敬、寻找宝藏,或者离开。',
    rarity: 'common',
    choices: [
      {
        id: 'pray',
        text: '祈祷 (恢复 20 点生命值)',
        rewards: [
          { type: 'health', value: 20, message: '你感到被祝福,恢复了 20 点生命值。' }
        ]
      },
      {
        id: 'search',
        text: '寻找宝藏',
        rewards: [
          { type: 'gold', value: 40, message: '你在神龛下发现了 40 金币。' },
          { type: 'health', value: -10, message: '但你触发了陷阱,失去了 10 点生命值!' }
        ]
      },
      {
        id: 'leave',
        text: '不打扰它',
        rewards: [
          { type: 'none', message: '你决定不打扰这座神龛。' }
        ]
      }
    ]
  },

  {
    id: 'wandering_swordmaster',
    title: '流浪剑客',
    description: '一位老剑客愿意教你技巧,但要求报酬。',
    rarity: 'uncommon',
    choices: [
      {
        id: 'pay_gold',
        text: '支付 50 金币 (获得 30 点最大生命值)',
        requirements: { gold: 50 },
        rewards: [
          { type: 'gold', value: -50, message: '你支付了 50 金币。' },
          { type: 'max_health', value: 30, message: '大师传授你秘技。获得 30 点最大生命值!' }
        ]
      },
      {
        id: 'pay_health',
        text: '与他切磋 (失去 15 点生命值,获得 20 点最大生命值)',
        requirements: { health: 15 },
        rewards: [
          { type: 'health', value: -15, message: '你在切磋中受伤。' },
          { type: 'max_health', value: 20, message: '但你从中学到了经验。获得 20 点最大生命值!' }
        ]
      },
      {
        id: 'decline',
        text: '礼貌拒绝',
        rewards: [
          { type: 'none', message: '大师尊敬地点点头,然后离开了。' }
        ]
      }
    ]
  },

  {
    id: 'mysterious_merchant',
    title: '神秘商人',
    description: '一个兜帽人向你提出一个神秘的交易。',
    rarity: 'rare',
    choices: [
      {
        id: 'gamble_gold',
        text: '用 30 金币赌博 (50% 几率获得 80 金币)',
        requirements: { gold: 30 },
        rewards: [] // Will be handled dynamically
      },
      {
        id: 'gamble_health',
        text: '孤注一掷 (50% 几率获得 25 点最大生命值,50% 几率失去 20 点生命值)',
        requirements: { health: 20 },
        rewards: [] // Will be handled dynamically
      },
      {
        id: 'ignore',
        text: '无视商人',
        rewards: [
          { type: 'none', message: '你决定不信任这个神秘人。' }
        ]
      }
    ]
  },

  {
    id: 'the_fountain',
    title: '神秘喷泉',
    description: '一座美丽的喷泉在你面前闪烁。水似乎具有魔法属性。',
    rarity: 'common',
    choices: [
      {
        id: 'drink',
        text: '饮用',
        rewards: [
          { type: 'health', value: 25, message: '水很清爽。你恢复了 25 点生命值。' }
        ]
      },
      {
        id: 'wash_face',
        text: '洗脸',
        rewards: [
          { type: 'gold', value: 20, message: '你感到清爽,并在口袋里发现了 20 金币。' }
        ]
      },
      {
        id: 'leave',
        text: '不打扰它',
        rewards: [
          { type: 'none', message: '你决定不打扰这座喷泉。' }
        ]
      }
    ]
  },

  {
    id: 'big_chest',
    title: '大宝箱',
    description: '你发现了一个巨大的宝箱!但是,它似乎有陷阱。',
    rarity: 'uncommon',
    choices: [
      {
        id: 'open_carefully',
        text: '小心打开',
        rewards: [
          { type: 'gold', value: 60, message: '你小心地解除陷阱,发现了 60 金币!' }
        ]
      },
      {
        id: 'smash_open',
        text: '砸开',
        rewards: [
          { type: 'gold', value: 100, message: '你发现了 100 金币!' },
          { type: 'health', value: -15, message: '但你触发了陷阱,失去了 15 点生命值!' }
        ]
      },
      {
        id: 'ignore',
        text: '离开它',
        rewards: [
          { type: 'none', message: '安全第一。你离开了宝箱。' }
        ]
      }
    ]
  },

  {
    id: 'the_fallen_hero',
    title: '陨落的英雄',
    description: '你遇到了一位陨落冒险者的遗骸。他们的装备散落一地。',
    rarity: 'common',
    choices: [
      {
        id: 'loot',
        text: '搜刮尸体',
        rewards: [
          { type: 'gold', value: 35, message: '你在尸体上发现了 35 金币。' }
        ]
      },
      {
        id: 'bury',
        text: '妥善安葬',
        rewards: [
          { type: 'health', value: 15, message: '你感到平静,恢复了 15 点生命值。' },
          { type: 'gold', value: 15, message: '你还发现了 15 金币用于安葬费用。' }
        ]
      },
      {
        id: 'leave',
        text: '默默离开',
        rewards: [
          { type: 'none', message: '你表示敬意,然后继续前行。' }
        ]
      }
    ]
  }
]
