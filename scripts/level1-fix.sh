#!/usr/bin/env bash
# Fixes the incomplete Level 1 state:
# - Grant BURN_ROLE and METADATA_ROLE (weren't granted due to nonce race)
# - markStep 4, 5, 6, 8 (roles granted but steps not marked)
# No --json, waits for confirmation between each tx.

set -euo pipefail

ASSET="0xb200000000000000000000bDE35533eE5430Ae45"
SPEEDRUN="0x22e8076EE0e763659eEa9b1aDD0ecE472e122bAD"
RPC="https://sepolia.base.org"
DEPLOYER="0x8F058fE6b568D97f85d517Ac441b52B95722fDDe"
ZERO="0x0000000000000000000000000000000000000000000000000000000000000000"
PWFILE="/tmp/.speedrun-fix-$$"

trap 'rm -f "$PWFILE"' EXIT

read -s -r -p "Keystore 'speedrun' password: " KSPASS
echo ""
printf '%s' "$KSPASS" > "$PWFILE"
chmod 600 "$PWFILE"

s() {
  echo -n "$1... "
  shift
  cast send "$@" --account speedrun --password-file "$PWFILE" --rpc-url "$RPC" 2>&1 \
    | grep -E "^transactionHash|^status" | head -2
}

# 2 missing grantRole calls
s "grantRole(BURN_ROLE)"     $ASSET "grantRole(bytes32,address)" "$(cast keccak BURN_ROLE)"     $DEPLOYER
s "grantRole(METADATA_ROLE)" $ASSET "grantRole(bytes32,address)" "$(cast keccak METADATA_ROLE)" $DEPLOYER

# 4 missing markStep calls
s "markStep(4)" $SPEEDRUN "markStep(uint8,bytes32,bytes32)" 4 $ZERO $ZERO
s "markStep(5)" $SPEEDRUN "markStep(uint8,bytes32,bytes32)" 5 $ZERO $ZERO
s "markStep(6)" $SPEEDRUN "markStep(uint8,bytes32,bytes32)" 6 $ZERO $ZERO
s "markStep(8)" $SPEEDRUN "markStep(uint8,bytes32,bytes32)" 8 $ZERO $ZERO

echo ""
echo "Done. Level 1 should now be complete (steps 0–8 marked, all roles granted)."
echo ""
cast call $SPEEDRUN "progress()(uint64)" --rpc-url $RPC | xargs -I{} bash -c 'echo "Progress bitmap: {}"'
