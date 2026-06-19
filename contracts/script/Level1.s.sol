// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Script.sol";

interface IB20Token {
    function grantRole(bytes32 role, address account) external;
}

interface ISpeedrun {
    function markStep(uint8 stepId, bytes32 txRef, bytes32 memo) external;
}

/// @notice Level 1: grant all 7 roles on the Asset B20 token, then markStep 2–8.
/// @dev    Run with: make level1-sepolia
contract Level1 is Script {
    bytes32 constant MINT_ROLE         = keccak256("MINT_ROLE");
    bytes32 constant BURN_ROLE         = keccak256("BURN_ROLE");
    bytes32 constant BURN_BLOCKED_ROLE = keccak256("BURN_BLOCKED_ROLE");
    bytes32 constant PAUSE_ROLE        = keccak256("PAUSE_ROLE");
    bytes32 constant UNPAUSE_ROLE      = keccak256("UNPAUSE_ROLE");
    bytes32 constant METADATA_ROLE     = keccak256("METADATA_ROLE");
    bytes32 constant OPERATOR_ROLE     = keccak256("OPERATOR_ROLE");

    address constant ASSET    = 0xb200000000000000000000bDE35533eE5430Ae45;
    address constant SPEEDRUN = 0x22e8076EE0e763659eEa9b1aDD0ecE472e122bAD;

    function run() external {
        address deployer = msg.sender;
        IB20Token asset = IB20Token(ASSET);
        ISpeedrun sr    = ISpeedrun(SPEEDRUN);

        vm.startBroadcast();

        asset.grantRole(MINT_ROLE,         deployer); sr.markStep(2, bytes32(0), bytes32(0));
        asset.grantRole(BURN_ROLE,         deployer); sr.markStep(3, bytes32(0), bytes32(0));
        asset.grantRole(BURN_BLOCKED_ROLE, deployer); sr.markStep(4, bytes32(0), bytes32(0));
        asset.grantRole(PAUSE_ROLE,        deployer); sr.markStep(5, bytes32(0), bytes32(0));
        asset.grantRole(UNPAUSE_ROLE,      deployer); sr.markStep(6, bytes32(0), bytes32(0));
        asset.grantRole(METADATA_ROLE,     deployer); sr.markStep(7, bytes32(0), bytes32(0));
        asset.grantRole(OPERATOR_ROLE,     deployer); sr.markStep(8, bytes32(0), bytes32(0));

        vm.stopBroadcast();
    }
}
