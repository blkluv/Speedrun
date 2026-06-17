'use client';

import { useState } from 'react';
import { usePublicClient, useAccount } from 'wagmi';
import { B20_ABI, PausableFeature } from '@/lib/abis/B20';

interface PauseProbeProps {
  tokenAddress: `0x${string}`;
  feature: 0 | 1 | 2; // TRANSFER=0, MINT=1, BURN=2
}

const FEATURE_LABELS = { 0: 'TRANSFER', 1: 'MINT', 2: 'BURN' } as const;
const FEATURE_COLORS = {
  0: 'border-violet-500/30 bg-violet-950/20 text-violet-300',
  1: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300',
  2: 'border-orange-500/30 bg-orange-950/20 text-orange-300',
} as const;

export function PauseProbe({ tokenAddress, feature }: PauseProbeProps) {
  const { address } = useAccount();
  const client = usePublicClient();
  const [result, setResult] = useState<{ revertReason: string } | null>(null);
  const [isProbing, setIsProbing] = useState(false);

  const label = FEATURE_LABELS[feature];
  const color = FEATURE_COLORS[feature];

  async function probe() {
    if (!client || !address) return;
    setIsProbing(true);

    try {
      if (feature === PausableFeature.TRANSFER) {
        await client.simulateContract({
          address: tokenAddress,
          abi: B20_ABI,
          functionName: 'transfer',
          args: [address, 1n],
          account: address,
        });
        // Should have reverted — if we get here, something is wrong
        setResult({ revertReason: 'No revert — token may not be paused' });
      } else if (feature === PausableFeature.MINT) {
        await client.simulateContract({
          address: tokenAddress,
          abi: B20_ABI,
          functionName: 'mint',
          args: [address, 1n],
          account: address,
        });
        setResult({ revertReason: 'No revert — token may not be paused' });
      } else {
        await client.simulateContract({
          address: tokenAddress,
          abi: B20_ABI,
          functionName: 'burn',
          args: [1n],
          account: address,
        });
        setResult({ revertReason: 'No revert — token may not be paused' });
      }
    } catch (e: unknown) {
      const reason =
        e instanceof Error
          ? e.message.includes('ContractPaused')
            ? `ContractPaused(${label}) ✓`
            : e.message.slice(0, 120)
          : 'Unknown revert';
      setResult({ revertReason: reason });
    } finally {
      setIsProbing(false);
    }
  }

  return (
    <div className={`mt-2 rounded-xl border p-4 ${color}`}>
      <div className="text-xs font-semibold mb-2">
        Pause Proof — {label}
      </div>
      <p className="text-xs opacity-60 mb-3">
        Simulate a {label.toLowerCase()} operation against the paused token to capture
        the <code>ContractPaused({label})</code> revert as evidence.
      </p>

      {result ? (
        <div className="bg-black/30 rounded-lg px-3 py-2 font-mono text-xs break-all">
          {result.revertReason}
        </div>
      ) : (
        <button
          onClick={probe}
          disabled={isProbing}
          className="text-xs py-1.5 px-4 rounded-lg bg-black/20 hover:bg-black/40 border border-white/10 transition-colors disabled:opacity-40"
        >
          {isProbing ? 'Probing…' : `Attempt ${label} (expect revert)`}
        </button>
      )}
    </div>
  );
}
