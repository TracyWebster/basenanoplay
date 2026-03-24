# BaseNanoPlay - Attribution Configuration Summary

## ✅ 归因配置已完成

### 1. 链下归因（Offchain - 必须）

**已在 `app/layout.tsx` 硬编码以下 meta 标签：**

```tsx
{/* Base 平台验证（必须）*/}
<meta name="base:app_id" content="69c23f56c28019cfbb9e8e6b" />

{/* Talent 平台验证（必须）*/}
<meta name="talentapp:project_verification" content="bd32aa9cb568a5be3524f8c22a86fbde2bb732fc0a0195e782bcfaac03efd39d9f32b0e5a891a3a4baad685dbc3ae59b2cad714e7669bbc7058911103539d137" />
```

**验证结果：**
- ✅ 两个标签都已硬编码在 Server Component 的 `<head>` 内
- ✅ 爬虫可以正确读取
- ✅ 已在线上验证：https://basenanoplay.vercel.app
- ✅ 使用 `grep -r "base:app_id"` 和 `grep -r "talentapp:project_verification"` 可找到

---

### 2. 链上归因（Onchain - ERC-8021）

**已在 `lib/wagmi.ts` 配置：**

```typescript
import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { Attribution } from "ox/erc8021";
import { coinbaseWallet, injected } from "wagmi/connectors";

// ERC-8021 链上归因配置
const DATA_SUFFIX = Attribution.toDataSuffix({
  codes: ["bc_0chuh8ra"], // Builder Code
});

export const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: "BaseNanoPlay",
      preference: "smartWalletOnly",
    }),
    injected(),
  ],
  transports: {
    [base.id]: http(),
  },
  dataSuffix: DATA_SUFFIX, // 链上归因
});
```

**功能说明：**
- ✅ 所有通过 wagmi hooks 发出的交易会自动携带归因数据
- ✅ 使用 `ox/erc8021` 库实现 ERC-8021 标准
- ✅ Builder Code: `bc_0chuh8ra`
- ✅ 无需在每次调用时额外处理

---

### 3. 项目结构

```
basenanoplay/
├── app/
│   ├── layout.tsx         ✅ Server Component，硬编码 meta 标签
│   ├── providers.tsx      ✅ Client Component，封装 Wagmi Provider
│   └── page.tsx           ✅ 游戏界面
├── lib/
│   └── wagmi.ts           ✅ Wagmi 配置 + ERC-8021 归因
└── package.json           ✅ 已安装 ox 依赖
```

---

### 4. 验证方法

#### 链下归因验证
```bash
# 检查 Base meta 标签
grep -r "base:app_id" basenanoplay/

# 检查 Talent meta 标签
grep -r "talentapp:project_verification" basenanoplay/

# 在线验证
curl -s https://basenanoplay.vercel.app | grep "base:app_id"
curl -s https://basenanoplay.vercel.app | grep "talentapp:project_verification"
```

#### 链上归因验证
```bash
# 检查 wagmi 配置
grep -r "dataSuffix" basenanoplay/lib/wagmi.ts

# 检查 ERC-8021 导入
grep -r "ox/erc8021" basenanoplay/lib/wagmi.ts
```

---

### 5. 部署信息

- **GitHub**: https://github.com/TracyWebster/basenanoplay
- **Vercel**: https://basenanoplay.vercel.app
- **最新提交**: "Add ERC-8021 onchain attribution and Talent verification"
- **部署时间**: 2026-03-24 18:01 GMT+8

---

### 6. Base.dev 识别检查

**如果 Base.dev 仍未识别，请检查：**

1. ✅ **Meta 标签正确性**
   - 访问 https://basenanoplay.vercel.app
   - 查看页面源代码（右键 -> 查看网页源代码）
   - 搜索 `base:app_id` 和 `talentapp:project_verification`
   - 确认两个标签都在 `<head>` 内

2. ✅ **App ID 正确性**
   - Base App ID: `69c23f56c28019cfbb9e8e6b`
   - 确认此 ID 与 Base.dev 后台一致

3. 🔄 **爬虫刷新时间**
   - Base.dev 爬虫可能需要 5-30 分钟刷新
   - 可以在 Base.dev 后台手动触发重新抓取

4. ✅ **域名一致性**
   - 确认在 Base.dev 后台填写的域名是 `https://basenanoplay.vercel.app`
   - 不要填写临时预览域名

5. ✅ **HTTPS**
   - 确认使用 HTTPS（已满足，Vercel 自动提供）

---

### 7. 关键改动

**本次更新包括：**

1. **移除了 Client Component 的 meta 标签配置**
   - 之前在 Client Component 中使用 `<head>` 注入，爬虫无法读取
   - 现在改为 Server Component 硬编码

2. **添加了 Talent 平台验证**
   - 之前只有 Base App ID
   - 现在包含 Talent project verification

3. **实现了 ERC-8021 链上归因**
   - 创建了 `lib/wagmi.ts`
   - 配置了 `dataSuffix` 自动归因
   - 安装了 `ox` 依赖

4. **分离了 Client Component**
   - 创建了 `app/providers.tsx` 封装 Wagmi Provider
   - 保持 `app/layout.tsx` 为 Server Component

---

### 8. 下一步

1. **等待 Base.dev 爬虫刷新**（5-30 分钟）
2. **如仍未识别**，在 Base.dev 后台检查：
   - App ID 是否匹配
   - 域名是否正确
   - 尝试手动触发重新抓取
3. **验证链上归因**：
   - 连接钱包并发起交易
   - 在区块浏览器查看交易 data 是否包含归因码

---

## ✅ 归因配置完全符合规范

所有要求已实现：
- ✅ 两个 meta 标签硬编码在 `<head>` 内
- ✅ Server Component，爬虫可读
- ✅ ERC-8021 链上归因已配置
- ✅ dataSuffix 自动注入交易
- ✅ 已部署并在线验证

🎉 **归因配置已完成！**
