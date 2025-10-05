import CharactersABI from './InceptionCharacters.json';
import BattleCoreABI from './BattleCore.json';
import OldMarketplaceABI from './Marketplace.json';
import InceptionMarketplaceABI from './InceptionMarketplace.json';

// Export the .abi property from each JSON
export const CHARACTERS_ABI = CharactersABI.abi;
export const BATTLECORE_ABI = BattleCoreABI.abi;

// Use NEW marketplace (InceptionMarketplace with 5% fee)
export const MARKETPLACE_ABI = InceptionMarketplaceABI.abi;

// Keep old one for reference (if you need it)
export const OLD_MARKETPLACE_ABI = OldMarketplaceABI.abi;
