import React, { useMemo } from 'react';
import { Table, Button, InputGroup, FormControl } from 'react-bootstrap';
import { useTable, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination } from 'react-table';
import { IJobOverviewProps } from './types';
import { Search } from 'react-bootstrap-icons';
import { JobStatus } from './JobStatus';

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: any) => {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)


  return (
    <span>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><Search /></InputGroup.Text>
        <FormControl
          placeholder={`Search ${count} records...`}
          aria-label="Search"
          aria-describedby="basic-addon1"
          value={value || ""}
          onChange={e => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
      </InputGroup>
    </span>
  )
}


export const JobsOverview = (props: IJobOverviewProps) => {

  const data = useMemo(() => props.jobs, [props.jobs])

  const columns = useMemo(
    () => [
      {
        Header: () => (<div style={{textAlign:"center"}}>Job Status</div>),
        accessor: 'job_status' as const,
        Cell: ({ cell: { row: { values: { job_id } } } }: any) => <JobStatus job_id={job_id} />,
      },
      {
        Header: 'Job Tag',
        accessor: 'job_tag' as const
      },
      {
        Header: 'Job ID',
        accessor: 'job_id' as const
      },
      {
        Header: 'Algorithm Name',
        accessor: 'algo_name' as const
      }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // rows,
    page,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    visibleColumns,
    state: { pageIndex, pageSize }
  } = useTable({ columns, data: data, initialState: { pageIndex: 0, pageSize: 5 } }, useGlobalFilter, useSortBy, usePagination)

  return (
    <Table {...getTableProps()} >
      <thead>
        <tr>
          <th colSpan={2} className="global-filter">
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
              key="search"
            />
          </th>
        </tr>
        <tr>
          <th colSpan={visibleColumns.length} className="pagination">
            <div>
              <span>
                Page{' '}
                {pageIndex + 1} of {pageOptions.length}
              </span>
              <select
                value={pageSize}
                className="page-select"
                onChange={e => {
                  setPageSize(Number(e.target.value))
                }}
              >
                {[5, 10, 20, 30, 40].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
              <div className="page-btn">
                <Button variant="outline-primary" size="sm" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  {'<<'}
                </Button>
                <Button variant="outline-primary" size="sm" onClick={() => previousPage()} disabled={!canPreviousPage}>
                  {'<'}
                </Button>
                <Button variant="outline-primary" size="sm" onClick={() => nextPage()} disabled={!canNextPage}>
                  {'>'}
                </Button>
                <Button variant="outline-primary" size="sm" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                  {'>>'}
                </Button>
              </div>
            </div>
          </th>

        </tr>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} className={row.index == props.activeRow ? "active-row" : ""} onClick={() => props.handleActiveRowUpdate(row.index)}>
              {row.cells.map(cell => {
                return (
                  <td{...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}