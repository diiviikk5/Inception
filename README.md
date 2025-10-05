<div align="center">

# ⚔️ INCEPTION - Omnichain NFT Battle Arena

<img src="https://readme-typing-svg.herokuapp.com?font=Orbitron&weight=900&size=35&duration=3000&pause=1000&color=00FFFF&center=true&vCenter=true&width=600&lines=OMNICHAIN+BATTLE+ARENA;PROVABLY+FAIR+COMBAT;DYNAMIC+NFT+EVOLUTION" alt="Typing SVG" />

[![Live Demo](https://img.shields.io/badge/🎮_PLAY_NOW-00FFFF?style=for-the-badge&logo=vercel&logoColor=white)](https://inception-arena.vercel.app)
[![GitHub](https://img.shields.io/badge/VIEW_CODE-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/diiviikk5/Inception)
[![Whitepaper](https://img.shields.io/badge/READ_DOCS-FF00FF?style=for-the-badge&logo=readthedocs&logoColor=white)](https://github.com/diiviikk5/Inception/blob/main/public/whitepaper.pdf)

**First true omnichain gaming platform with provably fair battles and dynamic NFT evolution**

---

### 🏆 Built for Hackathon with Passion • Where Skill Meets Blockchain

</div>

---

## 🌟 Features

🎯 **QTE Combat System** - Timing-based skill mechanics (PERFECT = 2.5x damage!)  
🛡️ **Defensive Actions** - Block (80% reduction) or Parry (90% + counter attack)  
📈 **Dynamic NFTs** - Characters evolve with wins, permanent on-chain stat boosts  
⚔️ **Provably Fair** - Deterministic combat + Chainlink VRF integration ready  
🏆 **Tournament Mode** - Compete for prize pools with entry fees  
🔗 **Omnichain Ready** - Multi-chain architecture (Polygon → Ethereum → Arbitrum)  
🎨 **P2P Marketplace** - Trade NFTs with smart contract escrow + 5% fee  

---

## 🎮 Game Mechanics

**Battle Flow:** Mint → Arena → QTE Combat → Win → Stats Grow → Trade

**Combat System:**
- 15 unique moves (Physical, Special, Ultimate, Defensive, Support)
- Energy-based turn system (120 max, regenerate 25/turn)
- QTE timing windows for damage multipliers
- Defensive reactions (Block/Parry) against enemy attacks
- Dynamic difficulty based on opponent stats

**NFT Evolution:**
- Win = +2-5 Attack, +1-3 Defense, +1-2 Speed
- Permanent on-chain stat updates
- Battle history tracked per character
- Rarity determines base stats

---

## 🏗️ Tech Stack

**Smart Contracts:** Solidity 0.8.20+ | Foundry/Forge | OpenZeppelin  
**Blockchain:** Polygon Amoy Testnet (Chain ID: 80002)  
**Frontend:** React 18 + Vite 5 | TailwindCSS | Framer Motion  
**Web3:** Wagmi v2 | RainbowKit | Viem  
**Randomness:** Deterministic + Chainlink VRF (planned)  

---

## 📜 Smart Contracts (Polygon Amoy)

**Deployed Contracts:**

`InceptionCharacters.sol` - ERC-721 NFT minting with dynamic metadata  
`BattleCore.sol` - Battle resolution engine with stat updates  
`InceptionMarketplace.sol` - P2P trading with escrow system  
`Marketplace.sol` - Additional marketplace utilities  

**Deployment Info:**  
Check `contracts/broadcast/Deploy.s.sol/80002/run-latest.json` for addresses and tx hashes.

---

## 🚀 Quick Start

**Prerequisites:** Node.js 18+ | Foundry | MetaMask with Polygon Amoy MATIC

**Installation:**

git clone https://github.com/diiviikk5/Inception.git
cd Inception
npm install
npm run dev

text

**Deploy Contracts:**

cd contracts
forge build
forge script script/Deploy.s.sol --rpc-url $AMOY_RPC_URL --broadcast --verify

text

**Test Contracts:**

forge test -vvv

text

---

## 🎬 How to Play

1. **Connect Wallet** - RainbowKit modal with multi-wallet support
2. **Claim Starter** - 3 FREE NFT characters (Shadow Warrior, Flame Knight, Cyber Mage)
3. **Enter Arena** - Select character and face AI opponents
4. **QTE Combat** - Click during timing windows for Perfect/Great/Good bonuses
5. **Defensive Phase** - Block or Parry incoming attacks
6. **Win Rewards** - Stats automatically update on-chain
7. **Trade NFTs** - List on marketplace or buy stronger characters

---

## 📂 Project Structure

Inception/
├── contracts/ # Solidity smart contracts
│ ├── src/
│ │ ├── InceptionCharacters.sol
│ │ ├── BattleCore.sol
│ │ └── InceptionMarketplace.sol
│ └── script/
│ └── Deploy.s.sol
├── src/ # React frontend
│ ├── pages/ # All game pages
│ ├── components/ # Reusable UI components
│ ├── utils/ # Battle engine logic
│ └── data/ # AI opponents & characters
├── public/
│ ├── whitepaper.pdf
│ └── characters/ # NFT images
└── README.md

text

---

## 🧪 Testing & Verification

**Smart Contract Tests:**

cd contracts
forge test -vvv
forge coverage

text

**Frontend Testing:**

npm run test
npm run build
npm run preview

text

**Contract Verification:**

Contracts are verified on Polygon Amoy Explorer. View deployment artifacts in `contracts/broadcast/`.

---

## 🗺️ Roadmap

**Phase 1 - Current** ✅  
Core game mechanics, frontend demo, smart contracts deployed

**Phase 2 - Q1 2026**  
Chainlink VRF integration, tournament smart contracts, NFT rental system

**Phase 3 - Q2 2026**  
Multi-chain deployment (Ethereum, Arbitrum, Base), cross-chain bridging

**Phase 4 - Q3 2026**  
Mobile app (React Native), esports partnerships, DAO governance

---

## 🎯 Key Innovations

⚡ **First timing-based blockchain combat** - QTE system with 2.5x damage multipliers  
🔮 **Dynamic NFT evolution** - Stats permanently grow on-chain  
🌐 **True omnichain architecture** - Asset portability across multiple chains  
🎲 **Provably fair battles** - Deterministic + verifiable randomness  
💎 **Skill-based progression** - Timing and strategy beats pure luck  

---

## 🏆 Achievements

Built in [X] hours for [Hackathon Name]  
Fully functional demo with deployed smart contracts  
Complete frontend with 15+ pages and smooth animations  
Comprehensive whitepaper with technical architecture  

---

## 👥 Team

Built by passionate Web3 developers pushing the boundaries of blockchain gaming.

---

## 📄 License

MIT License - See LICENSE file for details

---

<div align="center">

### ⚔️ Where Skill Meets Blockchain 🔥

**[Play Now](https://inception-arena.vercel.app)** • **[View Code](https://github.com/diiviikk5/Inception)** • **[Read Whitepaper](https://github.com/diiviikk5/Inception/blob/main/public/whitepaper.pdf)**

[![Made with Love](https://img.shields.io/badge/MADE_WITH-❤️-FF00FF?style=for-the-badge)](https://github.com/diiviikk5/Inception)
[![Powered by Web3](https://img.shields.io/badge/POWERED_BY-WEB3-00FFFF?style=for-the-badge&logo=ethereum&logoColor=white)](https://polygon.technology/)

---

**Star ⭐ this repo if you believe in the future of blockchain gaming!**

</div>
