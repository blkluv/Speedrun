'use client';

import { createContext, useContext } from 'react';

export interface SpeedrunCtx {
  contractAddress: `0x${string}`;
  assetToken: `0x${string}` | undefined;
  stablecoinToken: `0x${string}` | undefined;
  deployer: `0x${string}` | undefined;
  blocklistPolicyId: bigint;
  allowlistPolicyId: bigint;
  victimAddress: `0x${string}`;
  setBlocklistPolicyId: (id: bigint) => void;
  setAllowlistPolicyId: (id: bigint) => void;
  setVictimAddress: (addr: `0x${string}`) => void;
}

export const SpeedrunContext = createContext<SpeedrunCtx | null>(null);

export function useSpeedrun() {
  const ctx = useContext(SpeedrunContext);
  if (!ctx) throw new Error('SpeedrunContext not found');
  return ctx;
}
