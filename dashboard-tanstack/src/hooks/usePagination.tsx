import { useMemo } from 'react'

export function usePagination<T>(
  items: T[],
  rowsPerPage: number,
  search: { page?: number },
  navigate: (opts: any) => void,
) {
  const page = search.page || 1
  const totalPages = Math.max(1, Math.ceil(items.length / rowsPerPage))
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const { paginatedItems, start, end } = useMemo(() => {
    const startIndex = (page - 1) * rowsPerPage
    const endIndex = Math.min(startIndex + rowsPerPage, items.length)
    return {
      paginatedItems: items.slice(startIndex, endIndex),
      start: items.length === 0 ? 0 : startIndex + 1,
      end: endIndex,
    }
  }, [items, page, rowsPerPage])

  function setPage(p: number) {
    navigate({ search: { ...search, page: p } })
  }

  return { paginatedItems, page, setPage, totalPages, pages, start, end }
}

export default usePagination
