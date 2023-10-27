const express = require('express');
const { ethers } = require('ethers');

const app = express();
const port = 3000;
const path = require('path');

const mntABI = require('./ABI.jsx');
const provider = new ethers.providers.JsonRpcProvider("https://rpc.mantle.xyz");

// array of objects where each object contains an address and a corresponding function
const addressFunctions = [
  {
    address: "0xfa944c1996efBF9FbFF1a378903F4AD82C172D72",
    processFunction: (totalAssets) => totalAssets / 100
  },
  {
    address: "0x945438ef559EFf400429DFb101e57a6299B5ceE2",
    processFunction: (totalAssets) => totalAssets / 100
  },
  {
    address: "0xA25d1843eedE1E1D0631b979da605606412e64f7",
    processFunction: (totalAssets) => totalAssets / 100
  },
  {
    address: " 0xAa81F912D09Fd313Bbc1d5638632aB6bf59aB495",
    processFunction: (totalAssets) => totalAssets / 100
  },
  {
    address: "0x0DB2BA00bCcf4F5e20b950bF954CAdF768D158Aa",
    processFunction: (totalAssets) => totalAssets / 100
  },
  {
    address: "0x713C1300f82009162cC908dC9D82304A51F05A3E",
    processFunction: (totalAssets) => totalAssets / 100
  },
  {
    address: "0xDc63179CC57783493DD8a4Ffd7367DF489Ae93BF",
    processFunction: (totalAssets) => totalAssets / 100
  },
  {
    address: "0x5f247B216E46fD86A09dfAB377d9DBe62E9dECDA",
    processFunction: (totalAssets) => totalAssets / 100
  },
  
];

const tvlData = {
  mantle: {
    USDT: {
      token: "0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE",
      value: Math.round(10601182.15)
    },
    WETH: {
      token: "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111",
      value: Math.round(173473207481720.22)
    },
    USDC: {
      token: "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9",
      value: Math.round(1595138.73)
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

app.get('/api/tvl/mantle', (req, res) => {
  res.json(tvlData);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
