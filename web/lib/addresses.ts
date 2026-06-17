// Canonical precompile addresses (Beryl upgrade — base-std StdPrecompiles.sol)
export const PRECOMPILES = {
  B20_FACTORY:         '0xB20f000000000000000000000000000000000000' as const,
  POLICY_REGISTRY:     '0x8453000000000000000000000000000000000002' as const,
  ACTIVATION_REGISTRY: '0x8453000000000000000000000000000000000001' as const,
} satisfies Record<string, `0x${string}`>;

// Unix timestamps for Beryl hardfork activation
export const BERYL_ACTIVATION: Record<number, number> = {
  84532: 1781805600, // Base Sepolia  — 2026-06-18 18:00 UTC
  8453:  1782410400, // Base Mainnet  — 2026-06-25 18:00 UTC
};

export const CHAIN_IDS = {
  BASE_MAINNET: 8453,
  BASE_SEPOLIA: 84532,
} as const;

// B20 role constants (keccak256 values matching B20Constants.sol)
export const ROLES = {
  DEFAULT_ADMIN: '0x0000000000000000000000000000000000000000000000000000000000000000' as const,
  MINT:          '0x154c00819833dac601ee5ddded6fda79d9d8b506b836fe0a8f2e6f5de6f2e72' as const,
  BURN:          '0xe97b137254058bd94f28d2f3eb79e2d34074ffb488d042e3bc958e0a57d2fa22' as const,
  BURN_BLOCKED:  '0x26db399f7d6bd2b46ab4bcf10527c41498b0c4a1f0e0dd14e5d3fcd4bc01e7e8' as const,
  PAUSE:         '0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a' as const,
  UNPAUSE:       '0x1715f63a4f57e5e8b8a4e1c7a7d3ddb3f0b0b1b0b0b0b0b0b0b0b0b0b0b0b0b' as const,
  METADATA:      '0x3b5c01d28b2dde3e2c01f6fb0a0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0' as const,
  OPERATOR:      '0x97667070c54ef182b0f5858b034beac1b6f3089aa2d3188bb1e8929f4fa9b929' as const,
} as const;

// B20 policy scope constants (keccak256 values matching B20Constants.sol)
export const POLICY_SCOPES = {
  TRANSFER_SENDER:   '0x71dceb6ec09148a76a83b6f9acf0d3eb5f63d66a7f72d0ea70e7d10cc1d6e9a' as const,
  TRANSFER_RECEIVER: '0x5b6ad8a1a01e7fb82c07ccd3e4a0e1d2e0c4c0c4c0c4c0c4c0c4c0c4c0c4c0c' as const,
  TRANSFER_EXECUTOR: '0x3e2da8e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0e0' as const,
  MINT_RECEIVER:     '0x9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a9a' as const,
} as const;

// NOTE: The ROLES and POLICY_SCOPES hex values above are placeholders.
// Run `cast keccak "MINT_ROLE"` etc. to get the exact values, or read them
// directly from B20Constants.sol once base-std is finalised on your target network.
// The contract uses the token's own view functions (MINT_ROLE(), etc.) at runtime.
