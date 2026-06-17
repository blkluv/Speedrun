// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {Script, console} from "forge-std/Script.sol";
import {Speedrun} from "../src/Speedrun.sol";

/// @notice Deploys the Speedrun scorekeeper contract.
///         Run with: forge script script/Deploy.s.sol --rpc-url $RPC_URL --private-key $PRIVATE_KEY --broadcast --verify
///
///         After deployment, call initTokens() separately via cast:
///           cast send <SPEEDRUN_ADDR> \
///             "initTokens(bytes32,bytes32,string)" \
///             <SALT_ASSET> <SALT_STABLE> "USD" \
///             --rpc-url $RPC_URL --private-key $PRIVATE_KEY
contract DeploySpeedrun is Script {
    function run() external returns (Speedrun speedrun) {
        uint256 pk = vm.envUint("PRIVATE_KEY");
        address runner = vm.addr(pk);

        console.log("Deploying Speedrun as:", runner);
        console.log("Chain ID:", block.chainid);

        vm.startBroadcast(pk);
        speedrun = new Speedrun();
        vm.stopBroadcast();

        console.log("");
        console.log("=== DEPLOYMENT COMPLETE ===");
        console.log("Speedrun contract:", address(speedrun));
        console.log("Runner (deployer):", runner);
        console.log("Started at block: ", block.number);
        console.log("");
        console.log("Next step — call initTokens() to deploy both B20 tokens:");
        console.log("  cast send %s \\", address(speedrun));
        console.log("    \"initTokens(bytes32,bytes32,string)\" \\");
        console.log("    0x6173736574000000000000000000000000000000000000000000000000000000 \\");
        console.log("    0x737461626c650000000000000000000000000000000000000000000000000000 \\");
        console.log("    \"USD\" \\");
        console.log("    --rpc-url $RPC_URL --private-key $PRIVATE_KEY");

        // Write address to broadcast output for Makefile to pick up
        vm.writeFile(
            string.concat(vm.projectRoot(), "/broadcast/speedrun-address.txt"),
            vm.toString(address(speedrun))
        );
    }
}
