import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  IconButton,
  Collapse,
  Box,
  Checkbox,
} from "@mui/material";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";

function DataTable({
  rows,
  columns,
  rowsPerPageOptions,
  defaultRowsPerPage,
  collapsibleComponent,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExpandRow = (row) => {
    setExpandedRow(expandedRow === row ? null : row);
  };

  return (
    <TableContainer style={{ backgroundColor: "white" }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <React.Fragment key={row.id}>
                <TableRow hover onClick={() => handleExpandRow(row)}>
                  {columns.map((column) => (
                    <TableCell key={`${row.id}-${column.field}`}>
                      {row[column.field]}
                    </TableCell>
                  ))}
                  {collapsibleComponent && (
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleExpandRow(row);
                        }}
                      >
                        {expandedRow === row ? (
                          <KeyboardArrowUp />
                        ) : (
                          <KeyboardArrowDown />
                        )}
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
                {collapsibleComponent && (
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
                      <Collapse
                        in={expandedRow === row}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box margin={1}>{collapsibleComponent(row)}</Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

DataTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  defaultRowsPerPage: PropTypes.number,
  collapsibleComponent: PropTypes.func,
};

DataTable.defaultProps = {
  rowsPerPageOptions: [10, 25, 50],
  defaultRowsPerPage: 10,
};

export default DataTable;
// ===================================================================================================================
// function DataTable({
//   rows,
//   columns,
//   rowsPerPageOptions,
//   defaultRowsPerPage,
//   collapsibleComponent,
//   sortableColumns,
// }) {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [sortColumn, setSortColumn] = useState(null);
//   const [sortDirection, setSortDirection] = useState("asc");

//   const handleChangePage = (_, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleExpandRow = (row) => {
//     setExpandedRow(expandedRow === row ? null : row);
//   };

//   const handleRowSelect = (event, row) => {
//     if (event.target.checked) {
//       setSelectedRows([...selectedRows, row.id]);
//     } else {
//       setSelectedRows(selectedRows.filter((id) => id !== row.id));
//     }
//   };

//   const handleSort = (column) => {
//     if (!sortableColumns.includes(column)) {
//       return;
//     }
//     if (sortColumn === column) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortColumn(column);
//       setSortDirection("asc");
//     }
//   };

//   const sortedRows = rows.slice().sort((a, b) => {
//     if (sortColumn === null) {
//       return 0;
//     }
//     const aValue = a[sortColumn];
//     const bValue = b[sortColumn];
//     if (aValue === bValue) {
//       return 0;
//     }
//     if (sortDirection === "asc") {
//       return aValue < bValue ? -1 : 1;
//     } else {
//       return aValue > bValue ? -1 : 1;
//     }
//   });

//   return (
//     <TableContainer style={{ backgroundColor: "white" }}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             {columns.map((column) => (
//               <TableCell
//                 key={column.field}
//                 sortDirection={
//                   sortColumn === column.field ? sortDirection : false
//                 }
//               >
//                 {sortableColumns.includes(column.field) ? (
//                   <TableSortLabel
//                     active={sortColumn === column.field}
//                     direction={sortDirection}
//                     onClick={() => handleSort(column.field)}
//                   >
//                     {column.label}
//                   </TableSortLabel>
//                 ) : (
//                   column.label
//                 )}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {sortedRows
//             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//             .map((row) => (
//               <React.Fragment key={row.id}>
//                 <TableRow
//                   hover
//                   onClick={() => handleExpandRow(row)}
//                   selected={selectedRows.includes(row.id)}
//                 >
//                   <TableCell padding="checkbox">
//                     <Checkbox
//                       checked={selectedRows.includes(row.id)}
//                       onChange={(event) => handleRowSelect(event, row)}
//                     />
//                   </TableCell>
//                   {columns.map((column) => (
//                     <TableCell
//                       key={`${row.id}-${column.field}`}
//                       component="th"
//                       scope="row"
//                     >
//                       {row[column.field]}
//                     </TableCell>
//                   ))}
//                   {collapsibleComponent && (
//                     <TableCell>
//                       <IconButton
//                         size="small"
//                         onClick={(event) => {
//                           event.stopPropagation();
//                           handleExpandRow(row);
//                         }}
//                       >
//                         {expandedRow === row ? (
//                           <KeyboardArrowUp />
//                         ) : (
//                           <KeyboardArrowDown />
//                         )}
//                       </IconButton>
//                     </TableCell>
//                   )}
//                 </TableRow>
//                 {collapsibleComponent && (
//                   <TableRow>
//                     <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
//                       <Collapse
//                         in={expandedRow === row}
//                         timeout="auto"
//                         unmountOnExit
//                       >
//                         <Box margin={1}>{collapsibleComponent(row)}</Box>
//                       </Collapse>
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </React.Fragment>
//             ))}
//         </TableBody>
//       </Table>
//       <TablePagination
//         rowsPerPageOptions={rowsPerPageOptions}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onChangePage={handleChangePage}
//         onChangeRowsPerPage={handleChangeRowsPerPage}
//       />
//     </TableContainer>
//   );
// }
// DataTable.propTypes = {
//   rows: PropTypes.array.isRequired,
//   columns: PropTypes.array.isRequired,
//   rowsPerPageOptions: PropTypes.array,
//   defaultRowsPerPage: PropTypes.number,
//   collapsibleComponent: PropTypes.func,
//   sortableColumns: PropTypes.arrayOf(PropTypes.string),
// };

// DataTable.defaultProps = {
//   rowsPerPageOptions: [10, 25, 50],
//   defaultRowsPerPage: 10,
//   sortableColumns: [],
// };

// export default DataTable;

// =============================================================================================

// function DataTable({
//     rows,
//     columns,
//     rowsPerPageOptions,
//     defaultRowsPerPage,
//     collapsibleComponent,
//     sortableColumns,
//   }) {
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
//     const [expandedRow, setExpandedRow] = useState(null);
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [sortColumn, setSortColumn] = useState(null);
//     const [sortDirection, setSortDirection] = useState("asc");
//     const [displayedRows, setDisplayedRows] = useState([]);

//     useEffect(() => {
//       // Sort the rows based on the current sort settings
//       const sortedRows = rows.slice().sort((a, b) => {
//         if (sortColumn === null) {
//           return 0;
//         }
//         const aValue = a[sortColumn];
//         const bValue = b[sortColumn];
//         if (aValue === bValue) {
//           return 0;
//         }
//         if (sortDirection === "asc") {
//           return aValue < bValue ? -1 : 1;
//         } else {
//           return aValue > bValue ? -1 : 1;
//         }
//       });

//       // Filter the rows based on the selected rows
//       const filteredRows =
//         selectedRows.length > 0
//           ? sortedRows.filter((row) => selectedRows.includes(row.id))
//           : sortedRows;

//       // Update the displayed rows
//       setDisplayedRows(filteredRows);
//     }, [rows, selectedRows, sortColumn, sortDirection]);

//     const handleChangePage = (_, newPage) => {
//       setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//       setRowsPerPage(parseInt(event.target.value, 10));
//       setPage(0);
//     };

//     const handleExpandRow = (row) => {
//       setExpandedRow(expandedRow === row ? null : row);
//     };

//     const handleRowSelect = (event, row) => {
//       if (event.target.checked) {
//         setSelectedRows([...selectedRows, row.id]);
//       } else {
//         setSelectedRows(selectedRows.filter((id) => id !== row.id));
//       }
//     };

//     const handleSort = (column) => {
//       if (!sortableColumns.includes(column)) {
//         return;
//       }
//       if (sortColumn === column) {
//         setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//       } else {
//         setSortColumn(column);
//         setSortDirection("asc");
//       }
//     };

//     return (
//       <TableContainer style={{ backgroundColor: "white" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.field}
//                   sortDirection={
//                     sortColumn === column.field ? sortDirection : false
//                   }
//                 >
//                   {sortableColumns.includes(column.field) ? (
//                     <TableSortLabel
//                       active={sortColumn === column.field}
//                       direction={sortDirection}
//                       onClick={() => handleSort(column.field)}
//                     >
//                       {column.header}
//                     </TableSortLabel>
//                   ) : (
//                     column.header
//                   )}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {displayedRows
//               .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
//               .map((row) => (
//                 <React.Fragment key={row.id}>
//                   <TableRow>
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         checked={selectedRows.includes(row.id)}
//                         onChange={(event) => handleRowSelect(event, row)}
//                       />
//                     </TableCell>
//                     {columns.map((column) => (
//                       <TableCell key={`${row.id}-${column.field}`}>
//                         {row[column.field]}
//                       </TableCell>
//                     ))}
//                     {collapsibleComponent && (
//                       <TableCell padding="none">
//                         <IconButton
//                           onClick={() => handleExpandRow(row)}
//                           aria-label="expand row"
//                           size="small"
//                         >
//                           {expandedRow === row ? (
//                             <KeyboardArrowUp />
//                           ) : (
//                             <KeyboardArrowDown />
//                           )}
//                         </IconButton>
//                       </TableCell>
//                     )}
//                   </TableRow>
//                   {collapsibleComponent && (
//                     <TableRow>
//                       <TableCell
//                         style={{ paddingBottom: 0, paddingTop: 0 }}
//                         colSpan={columns.length + 1}
//                       >
//                         <Collapse
//                           in={expandedRow === row}
//                           timeout="auto"
//                           unmountOnExit
//                         >
//                           <Box margin={1}>{collapsibleComponent(row)}</Box>
//                         </Collapse>
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </React.Fragment>
//               ))}
//           </TableBody>
//         </Table>
//         <TablePagination
//           rowsPerPageOptions={rowsPerPageOptions}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onChangePage={handleChangePage}
//           onChangeRowsPerPage={handleChangeRowsPerPage}
//         />
//       </TableContainer>
//     );
//   }

//   DataTable.propTypes = {
//     rows: PropTypes.arrayOf(PropTypes.object).isRequired,
//     columns: PropTypes.arrayOf(
//       PropTypes.shape({
//         field: PropTypes.string.isRequired,
//         header: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//     rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
//     defaultRowsPerPage: PropTypes.number,
//     collapsibleComponent: PropTypes.func,
//     sortableColumns: PropTypes.arrayOf(PropTypes.string),
//   };

//   DataTable.defaultProps = {
//     rowsPerPageOptions: [10, 25, 50],
//     defaultRowsPerPage: 10,
//     collapsibleComponent: null,
//     sortableColumns: [],
//   };

//   export default DataTable;
