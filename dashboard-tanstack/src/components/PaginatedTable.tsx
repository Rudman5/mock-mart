import React from 'react'
import { Table, Pagination } from '@heroui/react'
import usePagination from '@/hooks/usePagination'

type Props<T> = {
  items: T[]
  rowsPerPage: number
  ariaLabel?: string
  renderHeader: React.ReactNode
  renderRow: (item: T) => React.ReactNode
  search: { page?: number }
  navigate: (opts: any) => void
  onRowAction?: (key: any) => void
}

export function PaginatedTable<T>({
  items,
  rowsPerPage,
  ariaLabel,
  renderHeader,
  renderRow,
  search,
  navigate,
  onRowAction,
}: Props<T>) {
  const { paginatedItems, pages, totalPages, page, setPage, start, end } =
    usePagination(items, rowsPerPage, search, navigate)

  return (
    <Table className="w-full">
      <Table.ScrollContainer>
        <Table.Content
          aria-label={ariaLabel}
          selectionMode="single"
          onRowAction={onRowAction}
        >
          {renderHeader}
          <Table.Body>{paginatedItems.map((it) => renderRow(it))}</Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer>
        <Pagination size="sm">
          <Pagination.Summary>
            {start} to {end} of {items.length} results
          </Pagination.Summary>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={page === 1}
                onPress={() => setPage(page - 1)}
              >
                <Pagination.PreviousIcon />
                Prev
              </Pagination.Previous>
            </Pagination.Item>
            {pages.map((p) => (
              <Pagination.Item key={p}>
                <Pagination.Link
                  isActive={p === page}
                  onPress={() => setPage(p)}
                >
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={page === totalPages}
                onPress={() => setPage(page + 1)}
              >
                Next
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </Table.Footer>
    </Table>
  )
}

export default PaginatedTable
