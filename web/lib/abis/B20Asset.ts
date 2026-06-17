// IB20Asset — Asset variant extensions on top of IB20.
// Derived verbatim from base/base-std src/interfaces/IB20Asset.sol (Beryl upgrade).
import { B20_ABI } from './B20';

export const B20_ASSET_EXTENSIONS = [
  // ── Role / precision constants ────────────────────────────────────────
  {
    type: 'function', name: 'OPERATOR_ROLE',
    inputs: [], outputs: [{ type: 'bytes32' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'WAD_PRECISION',
    inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view',
  },

  // ── Announce ─────────────────────────────────────────────────────────
  {
    type: 'function', name: 'announce',
    inputs: [
      { name: 'internalCalls', type: 'bytes[]' },
      { name: 'id',            type: 'string'  },
      { name: 'description',   type: 'string'  },
      { name: 'uri',           type: 'string'  },
    ],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'isAnnouncementIdUsed',
    inputs: [{ name: 'id', type: 'string' }],
    outputs: [{ type: 'bool' }], stateMutability: 'view',
  },

  // ── Multiplier ────────────────────────────────────────────────────────
  {
    type: 'function', name: 'updateMultiplier',
    inputs: [{ name: 'newMultiplier', type: 'uint256' }],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'multiplier',
    inputs: [], outputs: [{ type: 'uint256' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'scaledBalanceOf',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'toScaledBalance',
    inputs: [{ name: 'rawBalance', type: 'uint256' }],
    outputs: [{ type: 'uint256' }], stateMutability: 'view',
  },
  {
    type: 'function', name: 'toRawBalance',
    inputs: [{ name: 'scaledBalance', type: 'uint256' }],
    outputs: [{ name: 'rawBalance', type: 'uint256' }], stateMutability: 'view',
  },

  // ── Batch mint ────────────────────────────────────────────────────────
  {
    type: 'function', name: 'batchMint',
    inputs: [
      { name: 'recipients', type: 'address[]' },
      { name: 'amounts',    type: 'uint256[]' },
    ],
    outputs: [], stateMutability: 'nonpayable',
  },

  // ── Extra metadata ────────────────────────────────────────────────────
  {
    type: 'function', name: 'updateExtraMetadata',
    inputs: [
      { name: 'key',   type: 'string' },
      { name: 'value', type: 'string' },
    ],
    outputs: [], stateMutability: 'nonpayable',
  },
  {
    type: 'function', name: 'extraMetadata',
    inputs: [{ name: 'key', type: 'string' }],
    outputs: [{ type: 'string' }], stateMutability: 'view',
  },

  // ── Asset-specific events ─────────────────────────────────────────────
  {
    type: 'event', name: 'MultiplierUpdated',
    inputs: [
      { indexed: true,  name: 'updater',     type: 'address' },
      { indexed: false, name: 'oldMultiplier', type: 'uint256' },
      { indexed: false, name: 'newMultiplier', type: 'uint256' },
    ],
  },
  {
    type: 'event', name: 'ExtraMetadataUpdated',
    inputs: [
      { indexed: false, name: 'key',   type: 'string' },
      { indexed: false, name: 'value', type: 'string' },
    ],
  },
  {
    type: 'event', name: 'Announcement',
    inputs: [
      { indexed: true,  name: 'operator',    type: 'address' },
      { indexed: false, name: 'id',          type: 'string'  },
      { indexed: false, name: 'description', type: 'string'  },
      { indexed: false, name: 'uri',         type: 'string'  },
    ],
  },
  {
    type: 'event', name: 'EndAnnouncement',
    inputs: [
      { indexed: true,  name: 'operator', type: 'address' },
      { indexed: false, name: 'id',       type: 'string'  },
    ],
  },

  // ── Asset-specific errors ─────────────────────────────────────────────
  { type: 'error', name: 'AnnouncementIdAlreadyUsed', inputs: [] },
  { type: 'error', name: 'InvalidMetadataKey',        inputs: [] },
  { type: 'error', name: 'InvalidMultiplier',         inputs: [] },
  { type: 'error', name: 'LengthMismatch',            inputs: [] },
  { type: 'error', name: 'EmptyBatch',                inputs: [] },
  { type: 'error', name: 'AnnouncementInProgress',    inputs: [] },
  { type: 'error', name: 'InternalCallMalformed',     inputs: [] },
  { type: 'error', name: 'InternalCallFailed',        inputs: [] },
] as const;

// Combined ABI for an Asset token (IB20 + IB20Asset)
export const B20_ASSET_ABI = [...B20_ABI, ...B20_ASSET_EXTENSIONS] as const;
