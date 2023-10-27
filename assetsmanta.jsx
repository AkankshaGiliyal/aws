const express = require('express');
const { ethers } = require('ethers');

const app = express();
const port = 3001;
const path = require('path');

const mntABI = require('./ABI.jsx');
const provider = new ethers.providers.JsonRpcProvider("https://pacific-rpc.manta.network/http");

// Define an array of objects where each object contains an address and a corresponding function
const addressFunctions = [
  {
    address: "0x713C1300f82009162cC908dC9D82304A51F05A3E",
    totalAssetsFunction: (totalAssets) => totalAssets/1 ,
    denominationAssetFunction: (denominationAsset) => denominationAsset // 
  },
  {
    address: "0x0DB2BA00bCcf4F5e20b950bF954CAdF768D158Aa",
    totalAssetsFunction: (totalAssets) => totalAssets/1 ,
    denominationAssetFunction: (denominationAsset) => denominationAsset 
  },
  {
    address: "0xDc63179CC57783493DD8a4Ffd7367DF489Ae93BF",
    totalAssetsFunction: (totalAssets) => totalAssets/1 ,
    denominationAssetFunction: (denominationAsset) => denominationAsset 
  },
  {
  address: "0x5f247B216E46fD86A09dfAB377d9DBe62E9dECDA",
    totalAssetsFunction: (totalAssets) => totalAssets/1 ,
    denominationAssetFunction: (denominationAsset) => denominationAsset
  },
       
      
];

// Define a function to fetch totalAssets for an address and apply for the corresponding function
async function fetchTotalAssets(address, totalAssetsFunction) {
  try {
    const contract = new ethers.Contract(address, mntABI, provider);
    const totalAssets = await contract.totalAssets();
    const processedValue = totalAssetsFunction(totalAssets);
    console.log(`Total Assets for ${address} (processed):`, processedValue);
  } catch (error) {
    console.error(`Error fetching total assets for ${address}:`, error);
  }
}

// Define a function to fetch the denomination asset for an address and apply the corresponding function
async function fetchDenominationAsset(address, denominationAssetFunction) {
  try {
    const contract = new ethers.Contract(address, mntABI, provider);
    const denominationAsset = await contract.asset();
    const processedValue = denominationAssetFunction(denominationAsset);
    console.log(`Denomination Asset for ${address} (processed):`, processedValue);
  } catch (error) {
    console.error(`Error fetching denomination asset for ${address}:`, error);
  }
}

// Call the functions for each address-function pair in the array
for (const { address, totalAssetsFunction, denominationAssetFunction } of addressFunctions) {
  fetchTotalAssets(address, totalAssetsFunction);
  fetchDenominationAsset(address, denominationAssetFunction);
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});