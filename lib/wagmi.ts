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
