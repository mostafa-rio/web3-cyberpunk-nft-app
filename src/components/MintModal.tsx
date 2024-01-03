import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'
import { DialogHeader } from './ui/dialog'
import { DialogProps } from '@radix-ui/react-dialog'
import { DropContract, useContract, useLazyMint } from '@thirdweb-dev/react'
import { contractAddress } from '@/config'
import { Label } from './ui/label'
import { Input } from './ui/input'
import IPFSUploader from './IPFSUploader'
import { Button } from './ui/button'

function MintModal({ ...rest }: DialogProps) {
  const { contract } = useContract(contractAddress)
  const { mutateAsync: lazyMint, isLoading: isMinting } =
    useLazyMint<DropContract>(contract)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleMint = async () => {
    if (name && imageUrl && description) {
      await lazyMint({
        metadatas: [
          {
            name,
            description,
            image: imageUrl,
          },
        ],
      })
    }
  }

  return (
    <Dialog {...rest}>
      <DialogContent className="sm:max-w-[450px] bg-slate-800 border-slate-700 text-slate-200">
        <DialogHeader>
          <DialogTitle>Mint Your Cyberpunk Character</DialogTitle>
        </DialogHeader>
        {/* minting form */}
        <IPFSUploader onSuccess={(url) => setImageUrl(url)} />

        {/* name  */}
        <div className="mt-2">
          <Label htmlFor="name" className="text-left">
            name
          </Label>
          <div className="mt-1 w-full">
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="name"
              placeholder="Character name"
              className="w-full bg-slate-800"
            />
          </div>
        </div>
        {/* description */}
        <div className="mt-2">
          <Label htmlFor="description" className="text-left">
            description
          </Label>
          <div className="mt-1 w-full">
            <Input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
              placeholder="Describe the character"
              className="w-full bg-slate-800"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleMint} type="submit" disabled={isMinting}>
            {isMinting ? 'Minting...' : 'Mint'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default MintModal
