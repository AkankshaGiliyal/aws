const express = require('express');
const { ethers } = require('ethers');

const app = express();
const port = 3001;
const path = require('path');

const mntABI = require('./ABI.jsx');
const provider = new ethers.providers.JsonRpcProvider("https://pacific-rpc.manta.network/http");

// array of objects where each object contains an address and a corresponding function
const addressFunctions = [
  {
    address: "0x713C1300f82009162cC908dC9D82304A51F05A3E",
    processFunction: (totalAssets) => totalAssets/1
  },
  {
    address: "0x0DB2BA00bCcf4F5e20b950bF954CAdF768D158Aa",
    processFunction: (totalAssets) => totalAssets/1
  },
  {
    address: "0xDc63179CC57783493DD8a4Ffd7367DF489Ae93BF",
    processFunction: (totalAssets) => totalAssets/1
  },
  {
    address: " 0x5f247B216E46fD86A09dfAB377d9DBe62E9dECDA",
    processFunction: (totalAssets) => totalAssets/1 
  },
  
  
];

const tvlData = {
  manta: {
    USDT: {
      token: "0xf417F5A458eC102B90352F697D6e2Ac3A3d2851f",
      value: 158211382932
    },
    WETH: {
      
      token: "0x0Dc808adcE2099A9F62AA87D9670745AbA741746",
      value: 10195764736181938000
    },
    USDC: {
      
      token: "0xb73603C5d87fA094B7314C74ACE2e64D165016fb",
      value: 100148496633
    }
  }
};

//  function to fetch totalAssets for an address and apply the corresponding function
async function fetchTotalAssetsWithFunction(address, processFunction) {
  try {
    const contract = new ethers.Contract(address, mntABI, provider);
    const totalAssets = await contract.totalAssets();
    const processedValue = processFunction(totalAssets);
    console.log(`Total Assets for ${address} (processed):`, processedValue);
  } catch (error) {
    console.error(`Error fetching total assets for ${address}:`, error);
  }
}

// calling function for each address-function pair in the array
for (const { address, processFunction } of addressFunctions) {
  fetchTotalAssetsWithFunction(address, processFunction);
}

app.get('/tvl', (req, res) => {
  res.json(tvlData);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
