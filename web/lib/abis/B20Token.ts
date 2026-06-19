// Minimal ABI for B20 token operations (Asset + Stablecoin)
export const B20_TOKEN_ABI = [
  // ERC-20
  { name: 'balanceOf', type: 'function', stateMutability: 'view', inputs: [{ name: 'account', type: 'address' }], outputs: [{ name: '', type: 'uint256' }] },
  { name: 'totalSupply', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ name: '', type: 'uint256' }] },
  { name: 'transfer', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ name: '', type: 'bool' }] },
  { name: 'approve', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ name: '', type: 'bool' }] },
  { name: 'transferFrom', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'from', type: 'address' }, { name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [{ name: '', type: 'bool' }] },
  { name: 'allowance', type: 'function', stateMutability: 'view', inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }], outputs: [{ name: '', type: 'uint256' }] },
  { name: 'name', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ name: '', type: 'string' }] },
  { name: 'symbol', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ name: '', type: 'string' }] },
  { name: 'decimals', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ name: '', type: 'uint8' }] },
  // EIP-2612 permit
  { name: 'DOMAIN_SEPARATOR', type: 'function', stateMutability: 'view', inputs: [], outputs: [{ name: '', type: 'bytes32' }] },
  { name: 'nonces', type: 'function', stateMutability: 'view', inputs: [{ name: 'owner', type: 'address' }], outputs: [{ name: '', type: 'uint256' }] },
  { name: 'permit', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }, { name: 'value', type: 'uint256' }, { name: 'deadline', type: 'uint256' }, { name: 'v', type: 'uint8' }, { name: 'r', type: 'bytes32' }, { name: 's', type: 'bytes32' }], outputs: [] },
  // Role management
  { name: 'grantRole', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'role', type: 'bytes32' }, { name: 'account', type: 'address' }], outputs: [] },
  { name: 'hasRole', type: 'function', stateMutability: 'view', inputs: [{ name: 'role', type: 'bytes32' }, { name: 'account', type: 'address' }], outputs: [{ name: '', type: 'bool' }] },
  // Mint / burn
  { name: 'mint', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [] },
  { name: 'mintWithMemo', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }, { name: 'memo', type: 'bytes32' }], outputs: [] },
  { name: 'batchMint', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'recipients', type: 'address[]' }, { name: 'amounts', type: 'uint256[]' }], outputs: [] },
  { name: 'burn', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'amount', type: 'uint256' }], outputs: [] },
  { name: 'burnWithMemo', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'amount', type: 'uint256' }, { name: 'memo', type: 'bytes32' }], outputs: [] },
  { name: 'burnBlocked', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'account', type: 'address' }, { name: 'amount', type: 'uint256' }], outputs: [] },
  // Transfer with memo
  { name: 'transferWithMemo', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }, { name: 'memo', type: 'bytes32' }], outputs: [{ name: '', type: 'bool' }] },
  { name: 'transferFromWithMemo', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'from', type: 'address' }, { name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }, { name: 'memo', type: 'bytes32' }], outputs: [{ name: '', type: 'bool' }] },
  // Policy
  { name: 'updatePolicy', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'slot', type: 'uint8' }, { name: 'policyId', type: 'uint64' }], outputs: [] },
  // Supply cap
  { name: 'updateSupplyCap', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newCap', type: 'uint256' }], outputs: [] },
  // Metadata
  { name: 'updateName', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newName', type: 'string' }], outputs: [] },
  { name: 'updateSymbol', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newSymbol', type: 'string' }], outputs: [] },
  { name: 'updateContractURI', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newURI', type: 'string' }], outputs: [] },
  { name: 'updateExtraMetadata', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'key', type: 'string' }, { name: 'value', type: 'string' }], outputs: [] },
  // Asset specials
  { name: 'updateMultiplier', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'newMultiplier', type: 'uint256' }], outputs: [] },
  { name: 'announce', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'internalCalls', type: 'bytes[]' }, { name: 'id', type: 'uint256' }, { name: 'description', type: 'string' }, { name: 'uri', type: 'string' }], outputs: [] },
  // Pause
  { name: 'pause', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'features', type: 'uint8[]' }], outputs: [] },
  { name: 'unpause', type: 'function', stateMutability: 'nonpayable', inputs: [{ name: 'features', type: 'uint8[]' }], outputs: [] },
  // Renounce
  { name: 'renounceLastAdmin', type: 'function', stateMutability: 'nonpayable', inputs: [], outputs: [] },
] as const;

// Role bytes32 values (keccak256 of role name string)
export const B20_ROLES = {
  MINT_ROLE:         '0x154c00819833dac601ee5ddded6fda79d9d8b506b911b3dbd54cdb95fe6c3686',
  BURN_ROLE:         '0xe97b137254058bd94f28d2f3eb79e2d34074ffb488d042e3bc958e0a57d2fa22',
  BURN_BLOCKED_ROLE: '0x7408fdc0d31c7bcb349eab611f5d1168acd4303574993f8cdc98b1cd18c41cae',
  PAUSE_ROLE:        '0x139c2898040ef16910dc9f44dc697df79363da767d8bc92f2e310312b816e46d',
  UNPAUSE_ROLE:      '0x265b220c5a8891efdd9e1b1b7fa72f257bd5169f8d87e319cf3dad6ff52b94ae',
  METADATA_ROLE:     '0x6bd6b5318a46e5fff572d5e4258a20774aab40cc35ac7680654b9081fcc82f80',
  OPERATOR_ROLE:     '0x97667070c54ef182b0f5858b034beac1b6f3089aa2d3188bb1e8929f4fa9b929',
} as const;

// PolicySlot enum values (uint8)
export const POLICY_SLOT = {
  TRANSFER_SENDER:   0,
  TRANSFER_RECEIVER: 1,
  TRANSFER_EXECUTOR: 2,
  MINT_RECEIVER:     3,
} as const;

// Feature enum for pause/unpause (uint8)
export const PAUSE_FEATURE = {
  TRANSFER: 0,
  MINT:     1,
  BURN:     2,
} as const;

// Default token amounts (12 decimals)
export const TOKEN_AMOUNT = 1_000n * 10n ** 12n; // 1000 tokens
