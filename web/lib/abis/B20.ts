// IB20 — base interface implemented by both Asset and Stablecoin B20 tokens.
// Derived verbatim from base/base-std src/interfaces/IB20.sol (Beryl upgrade).
export const B20_ABI = [
  // ── ERC-20 ──────────────────────────────────────────────────────────
  { type: 'function', name: 'name',        inputs: [], outputs: [{ type: 'string' }],  stateMutability: 'view' },
  { type: 'function', name: 'symbol',      inputs: [], outputs: [{ type: 'string' }],  stateMutability: 'view' },
  { type: 'function', name: 'decimals',    inputs: [], outputs: [{ type: 'uint8' }],   stateMutability: 'view' },
  { type: 'function', name: 'totalSupply', inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view' },
  {
    type: 'function', name: 'balanceOf',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function', name: 'allowance',
    inputs: [{ name: 'owner', type: 'address' }, { name: 'spender', type: 'address' }],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function', name: 'transfer',
    inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }],
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'transferFrom',
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'approve',
    inputs: [{ name: 'spender', type: 'address' }, { name: 'amount', type: 'uint256' }],
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },

  // ── Memo variants ────────────────────────────────────────────────────
  {
    type: 'function', name: 'transferWithMemo',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'memo', type: 'bytes32' },
    ],
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'transferFromWithMemo',
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'memo', type: 'bytes32' },
    ],
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },

  // ── Mint / Burn ──────────────────────────────────────────────────────
  {
    type: 'function', name: 'mint',
    inputs: [{ name: 'to', type: 'address' }, { name: 'amount', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'mintWithMemo',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'memo', type: 'bytes32' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'burn',
    inputs: [{ name: 'amount', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'burnWithMemo',
    inputs: [{ name: 'amount', type: 'uint256' }, { name: 'memo', type: 'bytes32' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'burnBlocked',
    inputs: [{ name: 'from', type: 'address' }, { name: 'amount', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },

  // ── Roles ────────────────────────────────────────────────────────────
  {
    type: 'function', name: 'DEFAULT_ADMIN_ROLE',
    inputs: [], outputs: [{ type: 'bytes32' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'MINT_ROLE',
    inputs: [], outputs: [{ type: 'bytes32' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'BURN_ROLE',
    inputs: [], outputs: [{ type: 'bytes32' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'BURN_BLOCKED_ROLE',
    inputs: [], outputs: [{ type: 'bytes32' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'PAUSE_ROLE',
    inputs: [], outputs: [{ type: 'bytes32' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'UNPAUSE_ROLE',
    inputs: [], outputs: [{ type: 'bytes32' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'METADATA_ROLE',
    inputs: [], outputs: [{ type: 'bytes32' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'hasRole',
    inputs: [{ name: 'role', type: 'bytes32' }, { name: 'account', type: 'address' }],
    outputs: [{ type: 'bool' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'getRoleAdmin',
    inputs: [{ name: 'role', type: 'bytes32' }],
    outputs: [{ type: 'bytes32' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'grantRole',
    inputs: [{ name: 'role', type: 'bytes32' }, { name: 'account', type: 'address' }],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'revokeRole',
    inputs: [{ name: 'role', type: 'bytes32' }, { name: 'account', type: 'address' }],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'renounceRole',
    inputs: [
      { name: 'role', type: 'bytes32' },
      { name: 'callerConfirmation', type: 'address' },
    ],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'renounceLastAdmin',
    inputs: [], outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'setRoleAdmin',
    inputs: [{ name: 'role', type: 'bytes32' }, { name: 'newAdminRole', type: 'bytes32' }],
    outputs: [], stateMutability: 'nonpayable',
  },

  // ── Policy type constants ─────────────────────────────────────────────
  {
    type: 'function', name: 'TRANSFER_SENDER_POLICY',
    inputs: [], outputs: [{ type: 'bytes32' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'TRANSFER_RECEIVER_POLICY',
    inputs: [], outputs: [{ type: 'bytes32' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'TRANSFER_EXECUTOR_POLICY',
    inputs: [], outputs: [{ type: 'bytes32' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'MINT_RECEIVER_POLICY',
    inputs: [], outputs: [{ type: 'bytes32' }], stateMutability: 'view',
  },

  // ── Pause ─────────────────────────────────────────────────────────────
  {
    type: 'function', name: 'pausedFeatures',
    inputs: [], outputs: [{ name: '', type: 'uint8[]' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'isPaused',
    inputs: [{ name: 'feature', type: 'uint8' }],
    outputs: [{ type: 'bool' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'pause',
    inputs: [{ name: 'features', type: 'uint8[]' }],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'unpause',
    inputs: [{ name: 'features', type: 'uint8[]' }],
    outputs: [], stateMutability: 'nonpayable',
  },

  // ── Policy ────────────────────────────────────────────────────────────
  {
    type: 'function', name: 'policyId',
    inputs: [{ name: 'policyScope', type: 'bytes32' }],
    outputs: [{ type: 'uint64' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'updatePolicy',
    inputs: [
      { name: 'policyScope', type: 'bytes32' },
      { name: 'newPolicyId', type: 'uint64' },
    ],
    outputs: [], stateMutability: 'nonpayable',
  },

  // ── Supply cap ────────────────────────────────────────────────────────
  {
    type: 'function', name: 'supplyCap',
    inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'updateSupplyCap',
    inputs: [{ name: 'newSupplyCap', type: 'uint256' }],
    outputs: [], stateMutability: 'nonpayable',
  },

  // ── EIP-2612 permit ───────────────────────────────────────────────────
  {
    type: 'function', name: 'DOMAIN_SEPARATOR',
    inputs: [], outputs: [{ type: 'bytes32' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'nonces',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ type: 'uint256' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'permit',
    inputs: [
      { name: 'owner',    type: 'address' },
      { name: 'spender',  type: 'address' },
      { name: 'value',    type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
      { name: 'v',        type: 'uint8' },
      { name: 'r',        type: 'bytes32' },
      { name: 's',        type: 'bytes32' },
    ],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'eip712Domain',
    inputs: [],
    outputs: [
      { name: 'fields',            type: 'bytes1' },
      { name: 'name',              type: 'string' },
      { name: 'version',           type: 'string' },
      { name: 'chainId',           type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
      { name: 'salt',              type: 'bytes32' },
      { name: 'extensions',        type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },

  // ── Metadata ─────────────────────────────────────────────────────────
  {
    type: 'function', name: 'contractURI',
    inputs: [], outputs: [{ type: 'string' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'updateName',
    inputs: [{ name: 'newName', type: 'string' }],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'updateSymbol',
    inputs: [{ name: 'newSymbol', type: 'string' }],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'updateContractURI',
    inputs: [{ name: 'newURI', type: 'string' }],
    outputs: [], stateMutability: 'nonpayable',
  },

  // ── Events ────────────────────────────────────────────────────────────
  { type: 'event', name: 'Transfer',
    inputs: [
      { indexed: true,  name: 'from',   type: 'address' },
      { indexed: true,  name: 'to',     type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' },
    ] },
  { type: 'event', name: 'Approval',
    inputs: [
      { indexed: true,  name: 'owner',   type: 'address' },
      { indexed: true,  name: 'spender', type: 'address' },
      { indexed: false, name: 'amount',  type: 'uint256' },
    ] },
  { type: 'event', name: 'Memo',
    inputs: [
      { indexed: true,  name: 'caller', type: 'address' },
      { indexed: true,  name: 'memo',   type: 'bytes32' },
    ] },
  { type: 'event', name: 'BurnedBlocked',
    inputs: [
      { indexed: true,  name: 'caller', type: 'address' },
      { indexed: true,  name: 'from',   type: 'address' },
      { indexed: false, name: 'amount', type: 'uint256' },
    ] },
  { type: 'event', name: 'RoleGranted',
    inputs: [
      { indexed: true, name: 'role',    type: 'bytes32' },
      { indexed: true, name: 'account', type: 'address' },
      { indexed: true, name: 'sender',  type: 'address' },
    ] },
  { type: 'event', name: 'RoleRevoked',
    inputs: [
      { indexed: true, name: 'role',    type: 'bytes32' },
      { indexed: true, name: 'account', type: 'address' },
      { indexed: true, name: 'sender',  type: 'address' },
    ] },
  { type: 'event', name: 'RoleAdminChanged',
    inputs: [
      { indexed: true, name: 'role',             type: 'bytes32' },
      { indexed: true, name: 'previousAdminRole', type: 'bytes32' },
      { indexed: true, name: 'newAdminRole',      type: 'bytes32' },
    ] },
  { type: 'event', name: 'LastAdminRenounced',
    inputs: [{ indexed: true, name: 'previousAdmin', type: 'address' }] },
  { type: 'event', name: 'Paused',
    inputs: [
      { indexed: true,  name: 'updater',  type: 'address' },
      { indexed: false, name: 'features', type: 'uint8[]' },
    ] },
  { type: 'event', name: 'Unpaused',
    inputs: [
      { indexed: true,  name: 'updater',  type: 'address' },
      { indexed: false, name: 'features', type: 'uint8[]' },
    ] },
  { type: 'event', name: 'PolicyUpdated',
    inputs: [
      { indexed: true,  name: 'policyScope', type: 'bytes32' },
      { indexed: false, name: 'oldPolicyId', type: 'uint64' },
      { indexed: false, name: 'newPolicyId', type: 'uint64' },
    ] },
  { type: 'event', name: 'SupplyCapUpdated',
    inputs: [
      { indexed: true,  name: 'updater',    type: 'address' },
      { indexed: false, name: 'oldSupplyCap', type: 'uint256' },
      { indexed: false, name: 'newSupplyCap', type: 'uint256' },
    ] },
  { type: 'event', name: 'ContractURIUpdated', inputs: [] },
  { type: 'event', name: 'NameUpdated',
    inputs: [
      { indexed: true,  name: 'updater', type: 'address' },
      { indexed: false, name: 'newName', type: 'string' },
    ] },
  { type: 'event', name: 'SymbolUpdated',
    inputs: [
      { indexed: true,  name: 'updater',   type: 'address' },
      { indexed: false, name: 'newSymbol', type: 'string' },
    ] },
  { type: 'event', name: 'EIP712DomainChanged', inputs: [] },

  // ── Errors ────────────────────────────────────────────────────────────
  { type: 'error', name: 'NonPayable',                      inputs: [] },
  { type: 'error', name: 'Unauthorized',                    inputs: [] },
  { type: 'error', name: 'AccessControlBadConfirmation',    inputs: [] },
  { type: 'error', name: 'EmptyFeatureSet',                 inputs: [] },
  { type: 'error', name: 'LastAdminCannotRenounce',         inputs: [] },
  { type: 'error', name: 'NotSoleAdmin',                    inputs: [] },
  { type: 'error', name: 'AccountNotBlocked',
    inputs: [{ name: 'account', type: 'address' }] },
  { type: 'error', name: 'AccessControlUnauthorizedAccount',
    inputs: [{ name: 'account', type: 'address' }, { name: 'neededRole', type: 'bytes32' }] },
  { type: 'error', name: 'ContractPaused',
    inputs: [{ name: 'feature', type: 'uint8' }] },
  { type: 'error', name: 'InsufficientAllowance',
    inputs: [
      { name: 'spender',   type: 'address' },
      { name: 'allowance', type: 'uint256' },
      { name: 'needed',    type: 'uint256' },
    ] },
  { type: 'error', name: 'InsufficientBalance',
    inputs: [
      { name: 'sender',  type: 'address' },
      { name: 'balance', type: 'uint256' },
      { name: 'needed',  type: 'uint256' },
    ] },
  { type: 'error', name: 'InvalidSender',   inputs: [{ name: 'sender',   type: 'address' }] },
  { type: 'error', name: 'InvalidReceiver', inputs: [{ name: 'receiver', type: 'address' }] },
  { type: 'error', name: 'InvalidApprover', inputs: [{ name: 'approver', type: 'address' }] },
  { type: 'error', name: 'InvalidSpender',  inputs: [{ name: 'spender',  type: 'address' }] },
  { type: 'error', name: 'InvalidAmount',   inputs: [] },
  { type: 'error', name: 'InvalidSupplyCap',
    inputs: [
      { name: 'currentSupply', type: 'uint256' },
      { name: 'proposedCap',   type: 'uint256' },
    ] },
  { type: 'error', name: 'SupplyCapExceeded',
    inputs: [
      { name: 'cap',       type: 'uint256' },
      { name: 'attempted', type: 'uint256' },
    ] },
  { type: 'error', name: 'PolicyForbids',
    inputs: [
      { name: 'policyScope', type: 'bytes32' },
      { name: 'policyId',    type: 'uint64' },
    ] },
  { type: 'error', name: 'PolicyNotFound',      inputs: [{ name: 'policyId', type: 'uint64' }] },
  { type: 'error', name: 'UnsupportedPolicyType', inputs: [{ name: 'policyScope', type: 'bytes32' }] },
  { type: 'error', name: 'ExpiredSignature',    inputs: [{ name: 'deadline', type: 'uint256' }] },
  { type: 'error', name: 'InvalidSigner',
    inputs: [{ name: 'signer', type: 'address' }, { name: 'owner', type: 'address' }] },
] as const;

// PausableFeature enum values
export const PausableFeature = { TRANSFER: 0, MINT: 1, BURN: 2 } as const;
export type PausableFeatureValue = typeof PausableFeature[keyof typeof PausableFeature];
