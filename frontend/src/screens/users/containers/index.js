import React, { useEffect } from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { useDispatch, useSelector } from "react-redux";

import { getAllUserDetails } from "../../../store/actions/user";
import Avatar from "../../../sharedComponents/presentation/profilePic";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100%",
    height: "100%",
    boxShadow: "0.5px 0.5px 20px rgba(128, 128, 128, 0.3)",
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const columnHeaders = [
  {
    id: "name",
    label: "Name",
    align: "center",
  },
  {
    id: "isAdmin",
    label: "Admin",
    align: "center",
  },
];

const data = [
  {
    name: "Siddharth",
    isAdmin: "lol",
    align: "center",
  },
  {
    name: "Shubh",
    isAdmin: "boom",
    align: "center",
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const UsersTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const allUsersData = useSelector((state) => state.user.allUsersData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    dispatch(getAllUserDetails());
  }, [dispatch]);

  const rowProps = {
    padding: "none",
    align: "center",
  };

  return (
    <div className={classes.root}>
      <TableContainer style={{ height: "calc(100% - 52px)" }}>
        <Table className={classes.table} size="medium">
          <TableHead>
            <TableRow
              style={{
                height: "56px",
                backgroundColor: "rgba(128, 128, 128, 0.1)",
              }}
            >
              {allUsersData.columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  padding="none"
                  sortDirection={orderBy === column.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={createSortHandler(column.id)}
                  >
                    {column.label}
                    {orderBy === column.id ? (
                      <span className={classes.visuallyHidden}>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {stableSort(allUsersData.data, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow
                    style={{ height: "56px" }}
                    hover
                    // onClick={(event) => handleClick(event, row.name)}
                    key={row._id}
                  >
                    <TableCell {...rowProps}>{row.uploads.length}</TableCell>

                    <TableCell {...rowProps}>{row.firstName}</TableCell>
                    <TableCell {...rowProps}>{row.lastName}</TableCell>
                    <TableCell
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "56px",
                        alignItems: "center",
                      }}
                      {...rowProps}
                    >
                      <Avatar avatar={row.imageUrl} />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        style={{ backgroundColor: "rgba(128, 128, 128, 0.1)" }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default UsersTable;
