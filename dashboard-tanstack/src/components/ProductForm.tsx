import BaseTextArea from '@/components/base/BaseTextArea'
import BaseTextField from '@/components/base/BaseTextField'
import { Button, FieldError, Label, ListBox, Select } from '@heroui/react'
import type { Product } from '@/api/types'

import Attachment from './shadcn/Attachment'

type Props = {
  product: Partial<Product>
  categories: string[]
  disabledFields?: boolean
  onChange: (name: string, value: string | number | string[]) => void
  onFilesChange?: (files: File[]) => void
  onRemoveImage?: (index: number) => void
  resetAttachmentSignal?: number
  getError?: (path: string) => string | undefined
}

export default function ProductForm({
  product,
  categories,
  disabledFields = true,
  onChange,
  onFilesChange,
  onRemoveImage,
  resetAttachmentSignal,
  getError,
}: Props) {
  return (
    <div className="flex gap-8">
      <div className="w-1/4 space-y-4">
        {!disabledFields && (
          <Attachment
            onFilesChange={onFilesChange}
            acceptedTypes=".png,.jpg,.jpeg"
            resetSignal={resetAttachmentSignal}
          />
        )}
        <div className="grid grid-cols-2 gap-3">
          {[...(product.images || [])].map((img, i) => (
            <div key={`${img}-${i}`} className="relative">
              {!disabledFields && (
                <Button
                  size="sm"
                  onClick={() => onRemoveImage?.(i)}
                  className="absolute -right-2 -top-2"
                  aria-label={`Remove image ${i + 1}`}
                >
                  X
                </Button>
              )}
              <img
                src={img}
                className="w-full h-20 object-cover border rounded"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grow gap-y-6 flex flex-col">
        <div className="grid grid-cols-1 gap-4">
          <BaseTextField
            label="Product Title"
            name="title"
            value={product.title ?? ''}
            onChange={(val) => onChange('title', val)}
            isDisabled={disabledFields}
            isInvalid={!!getError?.('title')}
            errorMessage={getError?.('title')}
          />

          <BaseTextArea
            label="Description"
            name="description"
            value={product.description ?? ''}
            onChange={(val) => onChange('description', val)}
            isDisabled={disabledFields}
            isInvalid={!!getError?.('description')}
            errorMessage={getError?.('description')}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <BaseTextField
            label="Brand"
            name="brand"
            value={product.brand ?? ''}
            onChange={(val) => onChange('brand', val)}
            isDisabled={disabledFields}
            isInvalid={!!getError?.('brand')}
            errorMessage={getError?.('brand')}
          />

          <Select
            name="category"
            value={product.category ?? ''}
            variant="secondary"
            onChange={(val) => val !== null && onChange('category', val)}
            isDisabled={disabledFields}
            isInvalid={!!getError?.('category')}
          >
            <Label>Category</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {categories.map((category) => (
                  <ListBox.Item
                    key={category}
                    id={category}
                    textValue={category}
                  >
                    {category}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
            <FieldError>{getError?.('category')}</FieldError>
          </Select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <BaseTextField
            label="Price ($)"
            name="price"
            type="number"
            value={product.price !== undefined ? String(product.price) : ''}
            onChange={(val) => onChange('price', parseFloat(val.toString()))}
            isDisabled={disabledFields}
            isInvalid={!!getError?.('price')}
            errorMessage={getError?.('price')}
          />

          <BaseTextField
            label="Rating"
            name="rating"
            type="number"
            value={product.rating !== undefined ? String(product.rating) : ''}
            onChange={(val) => onChange('rating', parseFloat(val.toString()))}
            isDisabled={disabledFields}
            isInvalid={!!getError?.('rating')}
            errorMessage={getError?.('rating')}
          />

          <BaseTextField
            label="Status"
            name="availabilityStatus"
            value={product.availabilityStatus ?? ''}
            onChange={(val) => onChange('availabilityStatus', val)}
            isDisabled={disabledFields}
            isInvalid={!!getError?.('availabilityStatus')}
            errorMessage={getError?.('availabilityStatus')}
          />
        </div>
      </div>
    </div>
  )
}
