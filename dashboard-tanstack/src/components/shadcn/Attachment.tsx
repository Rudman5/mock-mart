import { Button } from '@heroui/react'
import { useEffect, useRef, useState } from 'react'

interface AttachmentProps {
  label?: string
  description?: string
  maxFiles?: number
  acceptedTypes?: string
  resetSignal?: number
  onFilesChange?: (files: File[]) => void
}

type FileWithPreview = {
  file: File
  preview?: string
}

export default function Attachment({
  label = 'Upload files',
  description = 'Attach files to your item. PNG, JPG and JPEG are supported.',
  maxFiles = 3,
  acceptedTypes = '.png,.jpg,.jpeg,',
  resetSignal,
  onFilesChange,
}: AttachmentProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const previewUrlsRef = useRef<string[]>([])

  const clearFiles = () => {
    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
    previewUrlsRef.current = []
    setFiles([])
  }

  useEffect(() => {
    if (resetSignal !== undefined) {
      clearFiles()
    }

    return () => {
      previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
      previewUrlsRef.current = []
    }
  }, [resetSignal])

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return
    const nextFiles = Array.from(newFiles).slice(0, maxFiles - files.length)
    const nextFileItems = nextFiles.map((file) => {
      const preview = file.type.startsWith('image/')
        ? URL.createObjectURL(file)
        : undefined

      if (preview) {
        previewUrlsRef.current.push(preview)
      }

      return { file, preview }
    })

    const updatedFiles = [...files, ...nextFileItems].slice(0, maxFiles)
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles.map((item) => item.file))
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    addFiles(event.target.files)
    event.target.value = ''
  }

  return (
    <div className="rounded-lg border border-dashed border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        <Button type="button" onClick={() => inputRef.current?.click()}>
          Browse
        </Button>
      </div>

      <input
        ref={inputRef}
        type="file"
        className="sr-only"
        accept={acceptedTypes}
        multiple
        onChange={handleInputChange}
      />
    </div>
  )
}
