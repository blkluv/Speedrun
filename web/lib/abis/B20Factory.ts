// IB20Factory — singleton precompile at 0xB20f000000000000000000000000000000000000
// Derived verbatim from base/base-std src/interfaces/IB20Factory.sol (Beryl upgrade).
export const B20_FACTORY_ABI = [
  // ── createB20 ─────────────────────────────────────────────────────────
  // B20Variant enum: 0 = ASSET, 1 = STABLECOIN
  // params = abi.encode(B20AssetCreateParams) or abi.encode(B20StablecoinCreateParams)
  //   B20AssetCreateParams:      { uint8 version, string name, string symbol, address initialAdmin, uint8 decimals }
  //   B20StablecoinCreateParams: { uint8 version, string name, string symbol, address initialAdmin, string currency }
  //   version must be 1 (B20_ASSET_CREATE_PARAMS_VERSION = 1)
  // initCalls = array of abi.encodeCall(IB20.someFunction, (...)) bootstrap calls
  {
    type: 'function', name: 'createB20',
    inputs: [
      { name: 'variant',   type: 'uint8'   },
      { name: 'salt',      type: 'bytes32' },
      { name: 'params',    type: 'bytes'   },
      { name: 'initCalls', type: 'bytes[]' },
    ],
    outputs: [{ name: 'token', type: 'address' }],
    stateMutability: 'payable',
  },

  // ── Address queries ───────────────────────────────────────────────────
  {
    type: 'function', name: 'getB20Address',
    inputs: [
      { name: 'variant',  type: 'uint8'   },
      { name: 'deployer', type: 'address' },
      { name: 'salt',     type: 'bytes32' },
    ],
    outputs: [{ type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function', name: 'isB20',
    inputs: [{ name: 'token', type: 'address' }],
    outputs: [{ type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function', name: 'isB20Initialized',
    inputs: [{ name: 'token', type: 'address' }],
    outputs: [{ type: 'bool' }],
    stateMutability: 'view',
  },

  // ── Errors ────────────────────────────────────────────────────────────
  { type: 'error', name: 'InvalidVariant',           inputs: [] },
  { type: 'error', name: 'UnsupportedVersion',       inputs: [] },
  { type: 'error', name: 'MissingRequiredField',     inputs: [] },
  { type: 'error', name: 'InvalidCurrencyCode',      inputs: [] },
  { type: 'error', name: 'DecimalsOutOfRange',       inputs: [] },
  { type: 'error', name: 'TokenAlreadyExists',       inputs: [] },
  { type: 'error', name: 'InitCallFailed',           inputs: [] },
  { type: 'error', name: 'NonPayable',               inputs: [] },
  { type: 'error', name: 'DelegateCallNotAllowed',   inputs: [] },
  { type: 'error', name: 'StaticCallNotAllowed',     inputs: [] },
] as const;

// B20Variant enum values matching the on-chain enum
export const B20Variant = { ASSET: 0, STABLECOIN: 1 } as const;
export type B20VariantValue = typeof B20Variant[keyof typeof B20Variant];

// Helper: encode B20AssetCreateParams for the `params` argument of createB20
// Use viem's encodeAbiParameters for this in the UI layer.
export const B20_ASSET_CREATE_PARAMS_VERSION = 1 as const;
export const B20_STABLECOIN_CREATE_PARAMS_VERSION = 1 as const;
