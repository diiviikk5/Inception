import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESSES } from '../contracts/addresses';
import { CHARACTERS_ABI, BATTLECORE_ABI, MARKETPLACE_ABI } from '../contracts/abis';

export function useContracts() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  // Mint a new character
  const mintCharacter = async (atk, def, spd, uri) => {
    return writeContract({
      address: CONTRACT_ADDRESSES.InceptionCharacters,
      abi: CHARACTERS_ABI,
      functionName: 'mintCharacter',
      args: [address, atk, def, spd, uri]
    });
  };

  // Start a battle
  const battle = async (tokenA, tokenB, moveA, moveB, winnerURI) => {
    return writeContract({
      address: CONTRACT_ADDRESSES.BattleCore,
      abi: BATTLECORE_ABI,
      functionName: 'battle',
      args: [tokenA, tokenB, moveA, moveB, winnerURI]
    });
  };

  // List on marketplace
  const listOnMarket = async (tokenId, price) => {
    return writeContract({
      address: CONTRACT_ADDRESSES.Marketplace,
      abi: MARKETPLACE_ABI,
      functionName: 'list',
      args: [tokenId, price]
    });
  };

  // Buy from marketplace
  const buyFromMarket = async (tokenId, price) => {
    return writeContract({
      address: CONTRACT_ADDRESSES.Marketplace,
      abi: MARKETPLACE_ABI,
      functionName: 'buy',
      args: [tokenId],
      value: price
    });
  };

  return {
    mintCharacter,
    battle,
    listOnMarket,
    buyFromMarket,
    isPending,
    isConfirming,
    isSuccess,
    hash
  };
}

// Hook to read character stats
export function useCharacterStats(tokenId) {
  const { data: stats } = useReadContract({
    address: CONTRACT_ADDRESSES.InceptionCharacters,
    abi: CHARACTERS_ABI,
    functionName: 'stats',
    args: [tokenId]
  });

  return stats;
}

// Hook to get user's NFTs
export function useUserCharacters(address) {
  const { data: balance } = useReadContract({
    address: CONTRACT_ADDRESSES.InceptionCharacters,
    abi: CHARACTERS_ABI,
    functionName: 'balanceOf',
    args: [address]
  });

  return balance;
}
