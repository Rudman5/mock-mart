import BaseTextArea from '@/components/base/BaseTextArea'
import BaseTextField from '@/components/base/BaseTextField'
import { FieldError, Label, ListBox, Select } from '@heroui/react'
import type { Product } from '@/api/types'

type Props = {
  product: Partial<Product>
  categories: string[]
  disabledFields?: boolean
  onChange: (name: string, value: string | number) => void
  getError?: (path: string) => string | undefined
}

export default function ProductForm({
  product,
  categories,
  disabledFields = true,
  onChange,
  getError,
}: Props) {
  return (
    <div className="flex gap-8">
      <div className="w-1/4 space-y-4">
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full rounded-sm bg-white border-foreground border shadow-sm"
          />
        ) : (
          <div className="w-full h-40 rounded-sm bg-gray-50 border border-dashed flex items-center justify-center">
            No image
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          {(product.images || []).map((img, i) => (
            <img
              key={i}
              src={img}
              className="w-full h-20 object-cover border rounded"
            />
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
