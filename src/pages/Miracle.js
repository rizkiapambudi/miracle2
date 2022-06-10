import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import SearchIcon from '@mui/icons-material/Search';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'login',
    numeric: true,
    disablePadding: true,
    label: 'Username',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'gender',
    numeric: false,
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'registered',
    numeric: false,
    disablePadding: false,
    label: 'Registered Date',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, sort, sortBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  // console.log('EnhancedTableHead', props)

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'right'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={sortBy === headCell.id ? sort : false}
          >
            <TableSortLabel
              active={sortBy === headCell.id}
              direction={sortBy === headCell.id ? sort : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {sortBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {sort === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  sort: PropTypes.oneOf(['asc', 'desc']).isRequired,
  sortBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Miracle Random User
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default class Miracle extends React.Component {

  constructor() {
    super()
    this.state = {
      gender:'',
      keyword: '',
      sort: 'asc',
      sortBy: 'email',
      selected: [],
      page: 0,
      dense: false,
      rowsPerPage: 5,
      rows: [],
    }
    this.getUserList()
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    this.handleChangeDense = this.handleChangeDense.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.emptyRows = this.emptyRows.bind(this);
    this.handleAutoComplete = this.handleAutoComplete.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleTextField = this.handleTextField.bind(this);
    this.handleResetFilter = this.handleResetFilter.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.gender!== this.state.gender || prevState.page!== this.state.page
      || prevState.sortBy!== this.state.sortBy || prevState.sort!== this.state.sort
      || prevState.rowsPerPage!== this.state.rowsPerPage
      ) {
      this.getUserList();
    }
  }

  getUserList() {
    const { sortBy, page, sort, rowsPerPage } = this.state
    const obj = {
      results: 20,
      sortOrder: sort === 'asc' ? 'ascend' : 'descend',
      sortBy,
      page:page+1,
      pageSize: rowsPerPage,
      keyword: this.state.keyword,
      gender: this.state.gender
    }
    console.log('getUserList state', this.state)
    const params = new URLSearchParams(obj).toString()
    // console.log('params state', params, this.state)
    axios.get(`https://randomuser.me/api/?`+params)
    .then(res => {
      const list = res.data.results;
      console.log('getUserList', list)
      this.setState({ rows:list });
    })
  }

  handleRequestSort(event, property) {
    const { sort, sortBy } = this.state
    console.log('sort, sortBy', sort, sortBy)
    const isAsc = sortBy === property && sort === 'asc';
    this.setState({ sort: isAsc ? 'desc' : 'asc' });
    this.setState({ sortBy: property });
    // this.getUserList()
  };

  handleSelectAllClick (event) {
    if (event.target.checked) {
      const newSelecteds = this.state.rows.map((n) => n.name);
      this.setState({selected: newSelecteds});
      return;
    }
    this.setState({selected: []});
  };

  handleClick (event, name) {
    const selected = this.state.selected
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    this.setState({selected: newSelected});
  };

  handleChangePage(event, newPage) {
    this.setState({page: newPage});
  };

  handleChangeRowsPerPage(event) {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    });
  };

  handleChangeDense(event) {
    this.setState({dense: event.target.checked});
  };

  isSelected(name) {
    const selected = this.state.selected
    return selected.indexOf(name) !== -1; 
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  emptyRows() {
    const { page, rowsPerPage, rows } = this.state
    return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  }

  handleTextField(event) {
    console.log('handleTextField', event.target.value)
    this.setState({keyword: event.target.value})
  }

  handleSearch(event, value) {
    this.getUserList()
  }

  handleAutoComplete(event, value) {
    console.log('autoComplete', value.gender)
    this.setState({gender: value.gender})
  }

  handleResetFilter(event, value) {
    this.setState({
      gender: '',
      keyword: '',
      sort: 'asc',
      sortBy: 'email',
      page: 0
    })
  }

    render() {

      const {sort, sortBy, selected, page, dense, rowsPerPage, rows } = this.state

      // console.log('state render', this.state)

      return (
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2, mt: 2 }}>
            <Grid container spacing={10}>
                <Grid item xs={3}>
                  <TextField
                    value={this.state.keyword}
                    id="outlined-required"
                    placeholder="Search.."
                    onChange={this.handleTextField}
                  />
                  <Button variant="contained" sx={{ ml: 2}}>
                    <SearchIcon fontSize="large" onClick={this.handleSearch}/>
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Autocomplete
                    value={this.state.gender}
                    onChange={this.handleAutoComplete}
                    disablePortal
                    id="combo-box-demo"
                    options={[
                      { label: 'Male', gender: 'male' },
                      { label: 'Female', gender: 'female' },
                    ]}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Gender" />}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button variant="contained" onClick={this.handleResetFilter}>
                    Reset Filter
                  </Button>
                </Grid>
            </Grid>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  sort={sort}
                  sortBy={sortBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                     rows.slice().sort(getComparator(sort, sortBy)) */}
                  {stableSort(rows, getComparator(sort, sortBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = this.isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;
                      const dd = new Date(row.registered.date)
                      const dformat = [dd.getDate(),
                                dd.getMonth()+1,
                                dd.getFullYear()].join('-')+' '+
                                [dd.getHours(),
                                dd.getMinutes()].join(':');
    
                      return (
                        <TableRow
                          hover
                          onClick={(event) => this.handleClick(event, row.login.username)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.login.username}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="left"
                          >
                            {row.login.username}
                          </TableCell>
                          <TableCell align="right">{row.name.first+' '+row.name.last}</TableCell>
                          <TableCell align="right">{row.email}</TableCell>
                          <TableCell align="right">{row.gender}</TableCell>
                          <TableCell align="right">{dformat}</TableCell>
                        </TableRow>
                      );
                    })}
                  {this.emptyRows() > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * this.emptyRows(),
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={this.handleChangePage}
              onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={this.handleChangeDense} />}
            label="Dense padding"
          />
        </Box>
      );
    }
}
