"use client";

import { useAccount, useChainId, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { injected } from "wagmi/connectors";
import { ogTestnet } from "@/lib/chain";
import { Providers } from "@/lib/providers";

function truncate(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

function WalletControlsInner() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  const wrongChain = isConnected && chainId !== ogTestnet.id;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {wrongChain && (
        <button
          onClick={() => switchChain({ chainId: ogTestnet.id })}
          className="btn btn-sm"
          style={{
            background: "rgba(245,158,11,0.15)",
            color: "var(--amber)",
            border: "1px solid rgba(245,158,11,0.3)",
          }}
        >
          Switch to 0G
        </button>
      )}

      {isConnected ? (
        <button onClick={() => disconnect()} className="btn btn-secondary btn-sm" title="Click to disconnect">
          <span className="status-dot running" style={{ color: "var(--teal)" }} />
          {truncate(address!)}
        </button>
      ) : (
        <button onClick={() => connect({ connector: injected() })} className="btn btn-primary btn-sm">
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export function WalletControls() {
  return (
    <Providers
      fallback={
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button className="btn btn-primary btn-sm" disabled>
            Connect Wallet
          </button>
        </div>
      }
    >
      <WalletControlsInner />
    </Providers>
  );
}
