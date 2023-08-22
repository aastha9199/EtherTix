import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Sort from './components/Sort'
import Card from './components/Card'
import SeatChart from './components/SeatChart'

// ABIs
import TokenMaster from './abis/TokenMaster.json'

// Config
import config from './config.json'

function App() {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)

  const [tokenMaster, setTokenMaster] = useState(null)

  const loadBlockchainData = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()
    const tokenMaster = new ethers.Contract(config[network.chainId].TokenMaster.address, TokenMaster, provider)
    setTokenMaster(tokenMaster)


    window.ethereum.on('accountsChanged', async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    const account = ethers.utils.getAddress(accounts[0])
    setAccount(account)
    })
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <header>
      <Navigation account={account} setAccount={setAccount} />
        <h2 className="header__title"><strong>Event Tickets</strong></h2>
      </header>

    </div>
  );
}

export default App;