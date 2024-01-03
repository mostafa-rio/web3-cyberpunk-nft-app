import React, { useEffect, useState } from 'react'
import bannerImage from '../assets/banner.jpg'
import { Button } from './ui/button'
import MintModal from './MintModal'
import { useAddress, useContract } from '@thirdweb-dev/react'
import { contractAddress } from '@/config'
type Props = {}

function Banner({}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const { contract } = useContract(contractAddress, 'nft-drop')
  const [owner, setOwner] = useState<string | null>(null)
  const address = useAddress()

  const getOwner = async () => {
    const owner = await contract?.owner.get()
    setOwner(owner || null)
  }

  useEffect(() => {
    getOwner()
  }, [contract])

  return (
    <section
      className="rounded-2xl w-full bg-cover bg-center relative"
      style={{ backgroundImage: 'url(' + bannerImage + ')', height: '60vh' }}
    >
      <div className="h-full w-full bg-slate-600 bg-opacity-50 flex flex-col p-5 rounded-2xl">
        <div className="mt-auto max-w-xl">
          <h1 className="text-white text-xl md:text-5xl">
            Discover Cyberpunk characters NFT collection
          </h1>
          <p className="mt-4 text-sm texy-slate-200">
            Cyberpunk collection is a free mint NFT collection for old fans. Its
            free to mint and add new characters.
          </p>
          <div className="mt-10 flex gap-3">
            <Button
              variant="default"
              className="rounded-lg bg-purple-600 
              md:text-xl px-8 hover:bg-purple-700"
            >
              Explore
            </Button>

            {owner === address && (
              <Button
                variant="outline"
                onClick={() => setIsOpen(true)}
                className="rounded-lg bg-transparent hover:bg-transparent
           hover:text-white text-white  md:text-xl px-8 border-white"
              >
                Mint
              </Button>
            )}
            <MintModal open={isOpen} onOpenChange={(open) => setIsOpen(open)} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
