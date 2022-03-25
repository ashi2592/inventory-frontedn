import React from 'react'
import { Pagination } from 'semantic-ui-react'

const PaginationCompact = ({pageNo,totalPages,ellipsisItem,handlePaginationChange}) => (
  <Pagination
    boundaryRange={0}
    defaultActivePage={1}
    ellipsisItem={ellipsisItem}
    firstItem={null}
    lastItem={null}
    siblingRange={1}
    totalPages={totalPages}
    activePage= {pageNo}
    onPageChange={handlePaginationChange}
  />
)

export default PaginationCompact