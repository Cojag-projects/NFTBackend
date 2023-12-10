const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RentableNFTMarketplace", function () {
  let RentableNFTMarketplace;
  let marketplace;
  let owner;
  let seller;
  let buyer;
  let renter;
  const listingPrice = ethers.utils.parseEther("1");  // 1 ETH

  console.log("working1")
  before(async function () {
    RentableNFTMarketplace = await ethers.getContractFactory("RentableNFTMarketplace");
  console.log("working2")

    [owner, seller, buyer, renter] = await ethers.getSigners();
    marketplace = await RentableNFTMarketplace.deploy();
    await marketplace.deployed();
  console.log("working3")

  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await marketplace.owner()).to.equal(owner.address);
    });

    it("Should set the right listing price", async function () {
      expect(await marketplace.getListingPrice()).to.equal(listingPrice);
    });
  });

  // describe("Marketplace", function () {
  //   it("Should create and execute market sales", async function () {
  //     // Seller lists an item
  //     await marketplace.connect(seller).createToken("tokenURI", ethers.utils.parseEther("1"), ethers.utils.parseEther("0.01"), true, true, false, { value: listingPrice });
  //     const newTokenId = await marketplace._tokenIds();

  //     // Buyer purchases an item
  //     await marketplace.connect(buyer).createMarketSale(newTokenId, { value: ethers.utils.parseEther("1") });
  //     const item = await marketplace.idToMarketItem(newTokenId);

  //     expect(item.owner).to.equal(buyer.address);
  //     expect(item.sold).to.be.true;
  //   });

  //   it("Should allow users to resell tokens", async function () {
  //       // Seller lists an item
  //       await marketplace.connect(seller).createToken("tokenURI", ethers.utils.parseEther("0.1"), ethers.utils.parseEther("0.001"), true, true, false, { value: listingPrice });
        
  //       const newTokenId = await marketplace._tokenIds();
      
  //       await marketplace.connect(buyer).createMarketSale(newTokenId, { value: ethers.utils.parseEther("0.1") });
  //       let item = await marketplace.idToMarketItem(newTokenId);
        
  //       expect(item.owner).to.equal(buyer.address);
  //       expect(item.price).to.equal(ethers.utils.parseEther("0.1"));
  //       console.log(seller.address, item.owner, buyer.address, owner.address);

  //       // Buyer resells the item
  //       await marketplace.connect(buyer).resellToken(newTokenId, ethers.utils.parseEther("1"), ethers.utils.parseEther("0.01"), true, true, false, { value: listingPrice });
  //       let newItem = await marketplace.idToMarketItem(newTokenId);
      
  //       console.log(seller.address, newItem.owner, buyer.address, owner.address);
  //       // expect(newItem.owner).to.equal(marketplaceAddress.address);  // Check against buyer, not owner
  //       expect(newItem.price).to.equal(ethers.utils.parseEther("1"));  // Check newItem's price
  //       expect(newItem.rentPrice).to.equal(ethers.utils.parseEther("0.01"));  // Check newItem's rentPrice
  //   });

  //   it("Should not allow users to rent out tokens after expiry", async function () {
  //       // Seller lists an item for rent
  //       const rentPrice = ethers.utils.parseEther("0.001"); // Rent price set by the seller
  //       await marketplace.connect(seller).createToken("tokenURI", ethers.utils.parseEther("0.1"), rentPrice, true, true, false, { value: listingPrice });
  //       const newTokenId = await marketplace._tokenIds();
      
  //       // Set the expiration time for the rent
  //       const rentDuration = 24 * 60 * 60; // 24 hours in seconds
  //       const expires = (await ethers.provider.getBlock('latest')).timestamp + rentDuration;
      
  //       // Renter rents the item
  //       await marketplace.connect(renter).rentOutToken(newTokenId, expires, { value: rentPrice });

  //       // Check if the token is rented out correctly
  //       let userOfToken = await marketplace.userOf(newTokenId);
  //       expect(userOfToken).to.equal(renter.address);
      
  //       // Advance the blockchain time by more than 24 hours to simulate expiry
  //       await ethers.provider.send('evm_increaseTime', [rentDuration + 1]); // +1 to ensure we're past the expiry
  //       await ethers.provider.send('evm_mine'); // mine a new block to make sure the time change takes effect
      
  //       userOfToken = await marketplace.userOf(newTokenId);
  //       expect(userOfToken).to.equal(ethers.constants.AddressZero, "The token should not have an active user after expiry");
  //     });
      
  // });

});