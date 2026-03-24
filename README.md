# BaseNanoPlay

超低成本链上游戏 - 用户低成本参与链上游戏并记录数据行为

## 🎮 功能特性

- 每次游戏仅需 0.000001 ETH
- 10% 概率赢得整个奖池
- 10秒冷却时间
- 所有数据上链，完全透明
- 支持钱包连接（MetaMask、Coinbase Wallet 等）

## 🔗 链接

- **在线体验**: [https://basenanoplay.vercel.app](https://basenanoplay.vercel.app)
- **GitHub 仓库**: [https://github.com/TracyWebster/basenanoplay](https://github.com/TracyWebster/basenanoplay)
- **合约地址**: `0xc4B22a1B36f52D87FCe017e966116549FB793415` (Base Mainnet)

## 🛠️ 技术栈

- Next.js 16 (App Router)
- TypeScript
- Wagmi + Viem (以太坊交互)
- Tailwind CSS
- Base Network

## 📊 交易归因

集成了交易归因埋点，所有交易数据会被记录到：
- App ID: `app-001`
- Dashboard: `https://base-dashboard-zeta.vercel.app`

## 🚀 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📝 合约说明

合约实现了简单的链上游戏逻辑：
- 最低游戏金额：0.000001 ETH
- 随机数生成：基于 keccak256
- 中奖概率：10%
- 中奖奖励：当前奖池全部金额

## 🎯 Base Mini App

本项目已配置为 Base Mini App：
- Base App ID: `69c23f56c28019cfbb9e8e6b`
- 支持 Base.dev 展示
- 包含完整的 metadata 和 manifest

## 📄 License

MIT
