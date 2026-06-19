// IPolicyRegistry — singleton precompile at 0x8453000000000000000000000000000000000002
// Derived verbatim from base/base-std src/interfaces/IPolicyRegistry.sol (Beryl upgrade).
export const POLICY_REGISTRY_ABI = [
  // ── Policy creation ───────────────────────────────────────────────────
  // PolicyType enum: 0 = BLOCKLIST, 1 = ALLOWLIST
  {
    type: 'function', name: 'createPolicy',
    inputs: [
      { name: 'admin',      type: 'address' },
      { name: 'policyType', type: 'uint8'   },
    ],
    outputs: [{ name: 'policyId', type: 'uint64' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'createPolicyWithAccounts',
    inputs: [
      { name: 'admin',      type: 'address'   },
      { name: 'policyType', type: 'uint8'     },
      { name: 'accounts',   type: 'address[]' },
    ],
    outputs: [{ name: 'policyId', type: 'uint64' }],
    stateMutability: 'nonpayable',
  },

  // ── Admin management (two-step) ────────────────────────────────────────
  {
    type: 'function', name: 'stageUpdateAdmin',
    inputs: [
      { name: 'policyId', type: 'uint64'  },
      { name: 'newAdmin', type: 'address' },
    ],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'finalizeUpdateAdmin',
    inputs: [{ name: 'policyId', type: 'uint64' }],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'renounceAdmin',
    inputs: [{ name: 'policyId', type: 'uint64' }],
    outputs: [], stateMutability: 'nonpayable',
  },

  // ── Membership updates ────────────────────────────────────────────────
  {
    type: 'function', name: 'updateAllowlist',
    inputs: [
      { name: 'policyId', type: 'uint64'    },
      { name: 'add',      type: 'bool'      },
      { name: 'accounts', type: 'address[]' },
    ],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'updateBlocklist',
    inputs: [
      { name: 'policyId', type: 'uint64'    },
      { name: 'add',      type: 'bool'      },
      { name: 'accounts', type: 'address[]' },
    ],
    outputs: [], stateMutability: 'nonpayable',
  },

  // ── Queries ───────────────────────────────────────────────────────────
  {
    type: 'function', name: 'isAuthorized',
    inputs: [
      { name: 'policyId', type: 'uint64'  },
      { name: 'account',  type: 'address' },
    ],
    outputs: [{ type: 'bool' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'policyExists',
    inputs: [{ name: 'policyId', type: 'uint64' }],
    outputs: [{ type: 'bool' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'policyAdmin',
    inputs: [{ name: 'policyId', type: 'uint64' }],
    outputs: [{ type: 'address' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'pendingPolicyAdmin',
    inputs: [{ name: 'policyId', type: 'uint64' }],
    outputs: [{ type: 'address' }], stateMutability: 'view',
  },

  // ── Events ────────────────────────────────────────────────────────────
  {
    type: 'event', name: 'PolicyCreated',
    inputs: [
      { indexed: true,  name: 'policyId',   type: 'uint64'  },
      { indexed: true,  name: 'admin',      type: 'address' },
      { indexed: false, name: 'policyType', type: 'uint8'   },
    ],
  },
  {
    type: 'event', name: 'PolicyAdminStaged',
    inputs: [
      { indexed: true, name: 'policyId',  type: 'uint64'  },
      { indexed: true, name: 'newAdmin',  type: 'address' },
    ],
  },
  {
    type: 'event', name: 'PolicyAdminUpdated',
    inputs: [
      { indexed: true, name: 'policyId', type: 'uint64'  },
      { indexed: true, name: 'newAdmin', type: 'address' },
    ],
  },
  {
    type: 'event', name: 'AllowlistUpdated',
    inputs: [
      { indexed: true,  name: 'policyId', type: 'uint64'    },
      { indexed: false, name: 'add',      type: 'bool'      },
      { indexed: false, name: 'accounts', type: 'address[]' },
    ],
  },
  {
    type: 'event', name: 'BlocklistUpdated',
    inputs: [
      { indexed: true,  name: 'policyId', type: 'uint64'    },
      { indexed: false, name: 'add',      type: 'bool'      },
      { indexed: false, name: 'accounts', type: 'address[]' },
    ],
  },

  // ── Errors ────────────────────────────────────────────────────────────
  { type: 'error', name: 'NonPayable',            inputs: [] },
  { type: 'error', name: 'Unauthorized',          inputs: [] },
  { type: 'error', name: 'PolicyNotFound',        inputs: [] },
  { type: 'error', name: 'IncompatiblePolicyType', inputs: [] },
  { type: 'error', name: 'ZeroAddress',           inputs: [] },
  {
    type: 'error', name: 'BatchSizeTooLarge',
    inputs: [{ name: 'maxBatchSize', type: 'uint256' }],
  },
  { type: 'error', name: 'NoPendingAdmin',        inputs: [] },
  { type: 'error', name: 'DelegateCallNotAllowed', inputs: [] },
  { type: 'error', name: 'StaticCallNotAllowed',  inputs: [] },
] as const;

// PolicyType enum values
export const PolicyType = { BLOCKLIST: 0, ALLOWLIST: 1 } as const;

export const POLICY_REGISTRY = '0x8453000000000000000000000000000000000002' as const;
export type PolicyTypeValue = typeof PolicyType[keyof typeof PolicyType];
