export const TOKEN_ADDRESS = "0x668a659CC12a80925bEeC70729970B04Dc1a040F";
export const TOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function requestTokens() external",
  "function fundFaucet(uint256 amount) external",
  "event TokensRequested(address indexed requester, uint256 amount)",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];