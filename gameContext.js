import React, { useState, useEffect, useRef } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

// import axios from 'axios';
// import { create as ipfsHttpClient } from 'ipfs-http-client';

import { MarketAddress, MarketAddressABI } from './constants';

export const NFTContext = React.createContext();
const fetchContract = (signerORProvider) => new ethers.Contract(MarketAddress, MarketAddressABI, signerORProvider);

export const NFTProvider = ({ children }) => {
    // const [currentAccount, setCurrentAccount] = useState('');
    const [isLoadingNFT, setIsLoadingNFT] = useState(false);
    const nftCurrency = 'MATIC';
    
    const checkIfWalletIsConnected = async () => {
        if (!window.ethereum) return alert('Please install Metamask wallet');
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length) {
          setCurrentAccount(accounts[0]);
        } else {
          console.log('No accounts found');
        }
      };
      const connectWallet = async () => {
        if (!window.ethereum) return alert('Please install Metamask wallet');
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(accounts[0]);
        window.location.reload();
    };


    const createSale = async (url, forminputPrice, forminputRentPrice, forRent, forSale, member) => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const price = ethers.utils.parseUnits(forminputPrice, 'ether');
        const rentPrice  = ethers.utils.parseUnits(forminputRentPrice, 'ether');
        const contract = fetchContract(signer);
        const listingPrice = await contract.getListingPrice();
        
        const transaction = await contract.createToken(url, price, rentPrice, forRent, forSale, member, { value: listingPrice.toString() })
        //   : await contract.resellToken(id, price, { value: listingPrice.toString() });
        setIsLoadingNFT(true);
        await transaction.wait();
    };
    
    const buyNft = async (nft) => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(MarketAddress, MarketAddressABI, signer);
    
        const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
        const transaction = await contract.createMarketSale(nft.tokenId, { value: price });
        setIsLoadingNFT(true);
        await transaction.wait();
        setIsLoadingNFT(false);
    };

    const rentNFT = async (nft, rentalPeriodInDays) => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(MarketAddress, MarketAddressABI, signer);
    
        // Assuming rentalPeriodInDays is the number of days the user wants to rent the NFT
        const rentPrice = ethers.utils.parseUnits(nft.rentPrice.toString(), 'ether');
        // Calculate the expiry time as the current time plus the rental period in seconds
        const expiry = Math.floor(Date.now() / 1000) + rentalPeriodInDays * 24 * 60 * 60;
    
        // Send the transaction with the value to rent the NFT
        const transaction = await contract.rentOutToken(
            nft.tokenId, // The ID of the token to rent
            expiry, // The expiration time of the rental
            { value: rentPrice } // The rental price to pay
        );
    
        await transaction.wait(); // Wait for the transaction to be confirmed
        console.log(`NFT with tokenId ${nft.tokenId} rented successfully! to ${signer.address}`);
    };

    
}