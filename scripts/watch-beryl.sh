#!/usr/bin/env bash
# Polls B20Factory on Base Sepolia until Beryl activates, then calls initTokens().
# Run this before sleeping: it handles everything automatically.

set -euo pipefail

FACTORY="0xB20f000000000000000000000000000000000000"
RPC="https://sepolia.base.org"
SPEEDRUN="0xdaB9e82a4d79122a30D60200a8f6F49544D8c0D9"
LOG="$(dirname "$0")/../beryl-watch.log"
PWFILE="/tmp/.speedrun-pw-$$"
SALT_ASSET="0x6173736574000000000000000000000000000000000000000000000000000000"
SALT_STABLE="0x737461626c650000000000000000000000000000000000000000000000000000"
CURRENCY="USD"

# Cleanup password file on exit (even on error/ctrl-c)
trap 'rm -f "$PWFILE"' EXIT

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║          B20 Speedrun — Beryl Activation Watcher         ║"
echo "╠══════════════════════════════════════════════════════════╣"
echo "║  Polls every 30s. When Beryl activates, calls            ║"
echo "║  initTokens() automatically with your keystore.          ║"
echo "║  Log: beryl-watch.log                                    ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo "Contract : $SPEEDRUN"
echo "Network  : Base Sepolia"
echo "Currency : $CURRENCY"
echo ""

# Ask for keystore password once — stored in temp file with chmod 600
read -s -r -p "Enter keystore 'speedrun' password (to sign initTokens tx later): " KSPASS
echo ""
echo "$KSPASS" > "$PWFILE"
chmod 600 "$PWFILE"
echo ""
echo "Password saved. You can now go to sleep — this script runs until activation."
echo "Log file: $LOG"
echo ""

mkdir -p "$(dirname "$LOG")"
echo "=== Beryl watch started at $(date -u) ===" | tee -a "$LOG"

while true; do
  CODE=$(cast code "$FACTORY" --rpc-url "$RPC" 2>/dev/null || echo "0x")
  TS=$(date -u '+%Y-%m-%d %H:%M:%S UTC')

  if [ "$CODE" = "0x" ]; then
    echo "$TS — pending (0x)" | tee -a "$LOG"
    sleep 30
  else
    echo "$TS — 🟢 ACTIVE! code=${CODE:0:20}..." | tee -a "$LOG"
    echo "" | tee -a "$LOG"
    echo "=== Calling initTokens() ===" | tee -a "$LOG"

    TX=$(cast send "$SPEEDRUN" \
      "initTokens(bytes32,bytes32,string)" \
      "$SALT_ASSET" "$SALT_STABLE" "$CURRENCY" \
      --rpc-url "$RPC" \
      --account speedrun \
      --password-file "$PWFILE" \
      --json 2>&1 | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('transactionHash','ERROR'))" 2>/dev/null || echo "ERROR")

    if [[ "$TX" == 0x* ]]; then
      echo "$TS — ✅ initTokens tx: $TX" | tee -a "$LOG"
      echo "" | tee -a "$LOG"
      echo "=== Done! Both B20 tokens deployed. ===" | tee -a "$LOG"
      echo "View on Basescan: https://sepolia.basescan.org/tx/$TX" | tee -a "$LOG"
    else
      echo "$TS — ❌ initTokens failed: $TX" | tee -a "$LOG"
      echo "Try manually: cast send $SPEEDRUN \"initTokens(bytes32,bytes32,string)\" $SALT_ASSET $SALT_STABLE $CURRENCY --rpc-url $RPC --account speedrun" | tee -a "$LOG"
    fi

    # Password file deleted by trap on exit
    break
  fi
done
