import { contractAddress } from '@/config'
import { useContract, useUnclaimedNFTs } from '@thirdweb-dev/react'
import React from 'react'
import NFTCard from './NFTCard'

function UnclaimedNFTs() {
  const { contract } = useContract(contractAddress, 'nft-drop')
  const { data: nfts } = useUnclaimedNFTs(contract)

  return (
    <>
      <h3 className="text-2xl mb-5">Latest Drops</h3>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {nfts?.map((nft: any, index) => (
          <NFTCard
            key={index}
            name={nft.name}
            description={nft.description}
            id={nft.id}
            image={nft.image}
          />
        ))}
      </div>
    </>
  )
}

export default UnclaimedNFTs
