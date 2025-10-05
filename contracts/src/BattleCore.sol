// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IChars {
    struct Stats {
        uint16 atk;
        uint16 def;
        uint16 spd;
        uint16 level;
    }
    function ownerOf(uint256) external view returns (address);
    function stats(uint256) external view returns (Stats memory);
    function bumpLevel(uint256) external;
    function setTokenURI(uint256, string calldata) external;
}

contract BattleCore {
    IChars public chars;

    event BattleResolved(
        uint256 tokenA,
        uint256 tokenB,
        uint256 winner,
        uint16 dmgA,
        uint16 dmgB,
        uint256 rng,
        uint8 moveA,
        uint8 moveB
    );

    constructor(address characters) {
        chars = IChars(characters);
    }

    function battle(
        uint256 tokenA,
        uint256 tokenB,
        uint8 moveA,
        uint8 moveB,
        string calldata winnerNewURI
    ) external {
        require(chars.ownerOf(tokenA) == msg.sender, "Must own tokenA");

        IChars.Stats memory A = chars.stats(tokenA);
        IChars.Stats memory B = chars.stats(tokenB);

        uint256 rng = uint256(
            keccak256(
                abi.encodePacked(
                    block.prevrandao,
                    tokenA,
                    tokenB,
                    msg.sender,
                    block.timestamp
                )
            )
        );

        uint16 dmgA = _damage(A.atk, B.def, moveA, rng);
        uint16 dmgB = _damage(B.atk, A.def, moveB, rng >> 8);

        uint256 winner = _decideWinner(tokenA, tokenB, A.spd, B.spd, dmgA, dmgB);

        chars.bumpLevel(winner);
        if (bytes(winnerNewURI).length > 0) {
            chars.setTokenURI(winner, winnerNewURI);
        }

        emit BattleResolved(tokenA, tokenB, winner, dmgA, dmgB, rng, moveA, moveB);
    }

    function _damage(uint16 atk, uint16 def, uint8 move, uint256 r) internal pure returns (uint16) {
        int256 base = int256(uint256(atk)) + int256(r % 10) - int256(uint256(def) / 2);
        if (base < 1) base = 1;
        uint16 dmg = uint16(uint256(base));

        if (move == 1) {
            // Defend: halves damage
            dmg = dmg / 2 > 0 ? dmg / 2 : 1;
        } else if (move == 2) {
            // Special: 25% crit chance
            if (r % 100 < 25) {
                dmg = uint16((uint256(dmg) * 3) / 2);
            }
        }
        return dmg;
    }

    function _decideWinner(
        uint256 a,
        uint256 b,
        uint16 spdA,
        uint16 spdB,
        uint16 dmgA,
        uint16 dmgB
    ) internal pure returns (uint256) {
        if (dmgA > dmgB) return a;
        if (dmgB > dmgA) return b;
        if (spdA > spdB) return a;
        if (spdB > spdA) return b;
        return a < b ? a : b;
    }
}
