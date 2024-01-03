import { NFTStorage } from 'nft.storage'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Label } from './ui/label'

const nftStorage = new NFTStorage({
  token: import.meta.env.VITE_STORAGE_API,
})

type Props = {
  onSuccess: (fileUrl: string) => void
}
function IPFSUploader({ onSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    setUploading(true)
    try {
      if (e.target.files) {
        const file = e.target.files![0]
        setFile(file)
        const cid = await nftStorage.storeBlob(file)
        onSuccess('https://' + cid + '.ipfs.nftstorage.link')
        return
      }
    } catch (err) {
      setFile(null)
      console.log(err)
      throw new Error('Failed to upload')
    } finally {
      setUploading(false)
    }
  }

  useEffect(() => {
    let reader: FileReader
    if (file) {
      reader = new FileReader()
      reader.onloadend = (e: ProgressEvent<FileReader>) => {
        setPreview(e.target?.result as any)
      }
      reader.readAsDataURL(file)
    }
    return () => {
      if (reader && reader.readyState === 1) reader.abort()
    }
  }, [file])

  return (
    <div className="flex gap-2">
      {preview && (
        <img
          src={preview}
          className="rounded w-14"
          alt="Selected File Preview"
        />
      )}
      <Label
        htmlFor="file"
        className="p-4 bg-slate-900 rounded-lg mt-auto h-fit cursor-pointer text-slate-200"
      >
        {uploading ? 'Uploading...' : preview ? 'Edit' : 'Select Image'}
        <input
          hidden
          accept="image/*"
          id="file"
          disabled={uploading}
          type="file"
          onChange={handleFile}
        />
      </Label>
    </div>
  )
}

export default IPFSUploader
