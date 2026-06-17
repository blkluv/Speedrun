// Speedrun.sol ABI — generated from contracts/src/Speedrun.sol
// Run `make sync-abi` after `forge build` to update the bytecode.
export const SPEEDRUN_ABI = [
  // ── Constants ─────────────────────────────────────────────────────────
  {
    type: 'function', name: 'B20_FACTORY',
    inputs: [], outputs: [{ type: 'address' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'TOTAL_STEPS',
    inputs: [], outputs: [{ type: 'uint8' }], stateMutability: 'view',
  },

  // ── Immutables ────────────────────────────────────────────────────────
  {
    type: 'function', name: 'deployer',
    inputs: [], outputs: [{ type: 'address' }], stateMutability: 'view',
  },

  // ── State ─────────────────────────────────────────────────────────────
  {
    type: 'function', name: 'assetToken',
    inputs: [], outputs: [{ type: 'address' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'stablecoinToken',
    inputs: [], outputs: [{ type: 'address' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'progress',
    inputs: [], outputs: [{ type: 'uint64' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'startedAt',
    inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'completedAt',
    inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'initialized',
    inputs: [], outputs: [{ type: 'bool' }], stateMutability: 'view',
  },

  // ── Init ──────────────────────────────────────────────────────────────
  {
    type: 'function', name: 'initTokens',
    inputs: [
      { name: 'saltAsset',     type: 'bytes32' },
      { name: 'saltStable',    type: 'bytes32' },
      { name: 'currencyCode',  type: 'string'  },
    ],
    outputs: [], stateMutability: 'nonpayable',
  },

  // ── Progress ──────────────────────────────────────────────────────────
  {
    type: 'function', name: 'markStep',
    inputs: [
      { name: 'stepId', type: 'uint8'   },
      { name: 'txRef',  type: 'bytes32' },
      { name: 'memo',   type: 'bytes32' },
    ],
    outputs: [], stateMutability: 'nonpayable',
  },

  // ── Views ─────────────────────────────────────────────────────────────
  {
    type: 'function', name: 'stepsCompleted',
    inputs: [], outputs: [{ name: 'count', type: 'uint8' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'isStepDone',
    inputs: [{ name: 'stepId', type: 'uint8' }],
    outputs: [{ type: 'bool' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'predictedAssetToken',
    inputs: [{ name: 'salt', type: 'bytes32' }],
    outputs: [{ type: 'address' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'predictedStablecoinToken',
    inputs: [{ name: 'salt', type: 'bytes32' }],
    outputs: [{ type: 'address' }], stateMutability: 'view',
  },

  // ── Events ────────────────────────────────────────────────────────────
  {
    type: 'event', name: 'Initialized',
    inputs: [
      { indexed: true, name: 'assetToken',      type: 'address' },
      { indexed: true, name: 'stablecoinToken', type: 'address' },
      { indexed: true, name: 'runner',          type: 'address' },
    ],
  },
  {
    type: 'event', name: 'StepCompleted',
    inputs: [
      { indexed: true,  name: 'player', type: 'address' },
      { indexed: true,  name: 'stepId', type: 'uint8'   },
      { indexed: false, name: 'txRef',  type: 'bytes32' },
      { indexed: false, name: 'memo',   type: 'bytes32' },
    ],
  },
  {
    type: 'event', name: 'RunCompleted',
    inputs: [
      { indexed: true,  name: 'player',    type: 'address' },
      { indexed: false, name: 'timestamp', type: 'uint256' },
    ],
  },

  // ── Errors ────────────────────────────────────────────────────────────
  { type: 'error', name: 'Unauthorized',        inputs: [] },
  { type: 'error', name: 'AlreadyInitialized',  inputs: [] },
  { type: 'error', name: 'NotInitialized',      inputs: [] },
  {
    type: 'error', name: 'InvalidStep',
    inputs: [{ name: 'stepId', type: 'uint8' }],
  },
  {
    type: 'error', name: 'StepAlreadyDone',
    inputs: [{ name: 'stepId', type: 'uint8' }],
  },

  // ── Constructor ───────────────────────────────────────────────────────
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
] as const;

// Bytecode placeholder — run `make sync-abi` after `forge build` to populate.
// The Makefile copies contracts/out/Speedrun.sol/Speedrun.json bytecode here.
export const SPEEDRUN_BYTECODE: `0x${string}` =
  '0x' as `0x${string}`;
