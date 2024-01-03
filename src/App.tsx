import { ConnectWallet } from '@thirdweb-dev/react'
import React from 'react'
import Banner from './components/Banner'
import UnclaimedNFTs from './components/UnclaimedNFTs'

type Props = {}

function App({}: Props) {
  return (
    <div className="container mx-auto">
      {/* connect button  */}
      <div className="py-5 flex justify-between">
        <ConnectWallet btnTitle="Connect" />
      </div>
      {/* banner */}
      <div className="mb-14">
        <Banner />
      </div>
      {/* unclaimed nfts component */}
      <UnclaimedNFTs />
    </div>
  )
}

export default App
