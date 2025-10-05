// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/InceptionCharacters.sol";
import "../src/BattleCore.sol";
import "../src/InceptionMarketplace.sol";

contract DeployScript is Script {
    function run() external {
        // Use vm.envString instead of vm.envUint
        string memory privateKeyStr = vm.envString("PRIVATE_KEY");
        uint256 deployerPrivateKey = vm.parseUint(privateKeyStr);
        
        vm.startBroadcast(deployerPrivateKey);

        // Deploy Characters NFT Contract
        InceptionCharacters chars = new InceptionCharacters();
        console.log("InceptionCharacters deployed at:", address(chars));

        // Deploy Battle Core Contract
        BattleCore battle = new BattleCore(address(chars));
        console.log("BattleCore deployed at:", address(battle));

        // Set battle contract on Characters (allow battles to update NFT stats)
        chars.setBattleContract(address(battle));
        console.log("Battle contract set on Characters");

        // Deploy NEW Marketplace Contract (with 5% platform fee)
        InceptionMarketplace marketplace = new InceptionMarketplace();
        console.log("InceptionMarketplace deployed at:", address(marketplace));

        // Optional: Approve marketplace for all NFTs (if needed)
        // This would be done by each user individually, not here

        console.log("\n=== DEPLOYMENT SUMMARY ===");
        console.log("NFT Contract:", address(chars));
        console.log("Battle Contract:", address(battle));
        console.log("Marketplace Contract:", address(marketplace));
        console.log("Platform Fee:", "5%");
        console.log("========================\n");

        vm.stopBroadcast();
    }
}
