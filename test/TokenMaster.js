const { expect } = require("chai")
const { ethers } = require("hardhat")

const NAME = "TokenMaster"
const SYMBOL = "TM"

describe("TokenMaster", () => {

    let TokenMaster
    let deployer, buyer

    beforeEach(async() => {

        [deployer, buyer] = await ethers.getSigners()

        const TokenMaster = await ethers.getContractFactory("TokenMaster")
        tokenMaster = await TokenMaster.deploy(NAME, SYMBOL)
    })

    describe("Deployment", () => {
        it("Sets the name", async() => {
            expect(await tokenMaster.name()).to.equal(NAME)
        })

        it("Sets the symbol", async() => {
            expect(await tokenMaster.symbol()).to.equal(SYMBOL)
        })

        it("Sets the owner", async() => {
            expect(await tokenMaster.owner()).to.equal(deployer.address)
        })
    })
})
