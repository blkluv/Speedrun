#!/usr/bin/env bash
# Level 1 — Grant all 7 roles on the Asset B20 token, then markStep 2–8.
# Password is read once from stdin and reused via a temp file.

set -euo pipefail

ASSET="0xb200000000000000000000bDE35533eE5430Ae45"
SPEEDRUN="0x22e8076EE0e763659eEa9b1aDD0ecE472e122bAD"
RPC="https://sepolia.base.org"
DEPLOYER="0x8F058fE6b568D97f85d517Ac441b52B95722fDDe"
PWFILE="/tmp/.speedrun-l1-$$"

MINT_ROLE=$(cast keccak "MINT_ROLE")
BURN_ROLE=$(cast keccak "BURN_ROLE")
BURN_BLOCKED_ROLE=$(cast keccak "BURN_BLOCKED_ROLE")
PAUSE_ROLE=$(cast keccak "PAUSE_ROLE")
UNPAUSE_ROLE=$(cast keccak "UNPAUSE_ROLE")
METADATA_ROLE=$(cast keccak "METADATA_ROLE")
OPERATOR_ROLE=$(cast keccak "OPERATOR_ROLE")
ZERO="0x0000000000000000000000000000000000000000000000000000000000000000"

trap 'rm -f "$PWFILE"' EXIT

read -s -r -p "Keystore 'speedrun' password: " KSPASS
echo ""
printf '%s' "$KSPASS" > "$PWFILE"
chmod 600 "$PWFILE"

send() {
  local label="$1"; shift
  echo -n "$label... "
  TX=$(cast send "$@" --account speedrun --password-file "$PWFILE" --rpc-url "$RPC" --json 2>&1 \
    | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('transactionHash','ERROR'))" 2>/dev/null || echo "ERROR")
  echo "$TX"
}

# Step 2: Grant MINT_ROLE
send "Step 2 grantRole(MINT_ROLE)" $ASSET "grantRole(bytes32,address)" $MINT_ROLE $DEPLOYER
send "Step 2 markStep(2)"         $SPEEDRUN "markStep(uint8,bytes32,bytes32)" 2 $ZERO $ZERO

# Step 3: Grant BURN_ROLE
send "Step 3 grantRole(BURN_ROLE)" $ASSET "grantRole(bytes32,address)" $BURN_ROLE $DEPLOYER
send "Step 3 markStep(3)"          $SPEEDRUN "markStep(uint8,bytes32,bytes32)" 3 $ZERO $ZERO

# Step 4: Grant BURN_BLOCKED_ROLE
send "Step 4 grantRole(BURN_BLOCKED_ROLE)" $ASSET "grantRole(bytes32,address)" $BURN_BLOCKED_ROLE $DEPLOYER
send "Step 4 markStep(4)"                  $SPEEDRUN "markStep(uint8,bytes32,bytes32)" 4 $ZERO $ZERO

# Step 5: Grant PAUSE_ROLE
send "Step 5 grantRole(PAUSE_ROLE)" $ASSET "grantRole(bytes32,address)" $PAUSE_ROLE $DEPLOYER
send "Step 5 markStep(5)"           $SPEEDRUN "markStep(uint8,bytes32,bytes32)" 5 $ZERO $ZERO

# Step 6: Grant UNPAUSE_ROLE
send "Step 6 grantRole(UNPAUSE_ROLE)" $ASSET "grantRole(bytes32,address)" $UNPAUSE_ROLE $DEPLOYER
send "Step 6 markStep(6)"             $SPEEDRUN "markStep(uint8,bytes32,bytes32)" 6 $ZERO $ZERO

# Step 7: Grant METADATA_ROLE
send "Step 7 grantRole(METADATA_ROLE)" $ASSET "grantRole(bytes32,address)" $METADATA_ROLE $DEPLOYER
send "Step 7 markStep(7)"              $SPEEDRUN "markStep(uint8,bytes32,bytes32)" 7 $ZERO $ZERO

# Step 8: Grant OPERATOR_ROLE
send "Step 8 grantRole(OPERATOR_ROLE)" $ASSET "grantRole(bytes32,address)" $OPERATOR_ROLE $DEPLOYER
send "Step 8 markStep(8)"              $SPEEDRUN "markStep(uint8,bytes32,bytes32)" 8 $ZERO $ZERO

echo ""
echo "Level 1 complete — 7 roles granted, steps 2–8 marked."
