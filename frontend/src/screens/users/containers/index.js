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
import DeleteIcon from "@material-ui/icons/Delete";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "../../../sharedComponents/presentation/iconButton";
import UserInfoModal from './userInfoModal';

import { getAllUserDetails, deleteUser, updateUser, getSpecificUser } from "../../../store/actions/user";
import Avatar from "../../../sharedComponents/presentation/profilePic";
import headers from "../../../resources/staticData/columnForUserTable.json";

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

  const handleDelete = (id, event) => {
    event.stopPropagation();
    dispatch(deleteUser(id));
  };

  const handleAssignRole = (id, event) => {
    console.log('called');
    event.stopPropagation();
    dispatch(updateUser(id, { isAdmin: true }));
  }

  const rowProps = {
    padding: "none",
    align: "center",
  };

  const handleClick = (id) => {
    dispatch(getSpecificUser(id));
  }

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
              {headers.map((column) => (
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
            {allUsersData.length ? (
              stableSort(allUsersData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <Tooltip title="Click to see user info">
                    <TableRow
                      style={{ height: "56px" }}
                      hover
                      onClick={handleClick.bind(this, row._id)}
                      key={row._id}
                    >
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

                      <TableCell {...rowProps}>{row.name}</TableCell>
                      <TableCell {...rowProps}>
                        <IconButton
                          color="red"
                          handleClick={handleDelete.bind(this, row._id)}
                          Icon={(props) => <DeleteIcon {...props} />}
                          tooltip="Delete user"
                        />
                      </TableCell>

                      <TableCell {...rowProps}>
                        <IconButton
                          color="blue"
                          handleClick={handleAssignRole.bind(this, row._id)}
                          Icon={(props) => <SupervisorAccountIcon {...props} />}
                          tooltip="Assign Admin Role"
                        />
                      </TableCell>
                    </TableRow>
                    </Tooltip>
                  );
                })
            ) : (
              <p
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                No users present
              </p>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        style={{ backgroundColor: "rgba(128, 128, 128, 0.1)" }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={allUsersData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      <UserInfoModal />
    </div>
  );
};

export default UsersTable;
