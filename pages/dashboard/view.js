import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { useRouter } from 'next/router'
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { useEffect } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Container, Menu, MenuItem } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";




const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    height: "100%",
    marginTop: theme.spacing(24)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  table: {
    marginTop: theme.spacing(48),
    marginRight: theme.spacing(20)
  }
}));

export default function Dashboard() {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [serialNumber, setSerialNumber] = React.useState("")
  const [row, setRow] = React.useState(({
    serialNumber: '',
    start_time: '',
    end_time: '',
    pem: '',

  }))

  useEffect(() => {
    const token = localStorage.getItem("token")
    axios.post("/api/auth", {
      token: token
    })
      .then((response) => {
        if (response.data.username) {
          setUsername(response.data.username);
        } else {
          router.push("/signin");
        }
      })
      .catch((error) => {
        console.log(error);
        router.push("/signin");
      })

  }, []);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open_anchor = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const handle_sumbit = (event) => {
    event.preventDefault();
    axios.post("/api/view", {
      number: serialNumber
    }).then((response) => {
      setRow(response.data);
    }).catch((error) => {
      console.log(error);
    })

  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>

          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open_anchor}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>个人信息</MenuItem>
            <MenuItem onClick={() => {
              localStorage.removeItem("token");
              router.push("/signin");
            }}>退出登录</MenuItem>
          </Menu>


        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {
            <div>
              <ListItem
                button
                onClick={() => {
                  router.push("/dashboard/apply");
                }}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="申请证书" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  router.push("/dashboard/download");
                }}
              >
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="下载证书" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  router.push("/dashboard/revoke");
                }}
              >
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="撤销证书" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  router.push("/dashboard/view");
                }}
              >
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="查看证书" />
              </ListItem>
            </div>
          }
        </List>
        <Divider />
        <List>
          {
            <div>
              <ListItem
                button
                onClick={() => {
                  router.push("/dashboard/info");
                }}
              >
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="个人信息" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  router.push("/dashboard/passphrase");
                }}
              >
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="生成口令" />
              </ListItem>
            </div>
          }
        </List>
      </Drawer>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <div className={classes.paper}>
          <form className={classes.form} noValidate>


            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="证书序列号"
              name="password"
              autoComplete="password"
              onChange={(e) => setSerialNumber(e.target.value)}
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event) => { handle_sumbit(event) }}
            >
              提交
            </Button>

          </form>
        </div>

      </Container>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>证书序列号</TableCell>
            <TableCell align="right">起始时间</TableCell>
            <TableCell align="right">截至时间</TableCell>
            <TableCell align="right">证书</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          <TableRow key={row.serialNumber}>
            <TableCell component="th" scope="row">
              {row.serialNumber}
            </TableCell>
            <TableCell align="right">{row.start_time}</TableCell>
            <TableCell align="right">{row.end_time}</TableCell>
            <TableCell align="right"> <textarea id="w3review" name="w3review" rows="15" cols="70" defaultValue={row.pem}>
            </textarea>
            </TableCell>

          </TableRow>

        </TableBody>
      </Table>
    </div>
    /* <Container component="form" maxWidth="xs">
      <CssBaseline />
      <div className={classes.appBarSpacer} />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>


          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="证书序列号"
            name="password"
            autoComplete="password"
            onChange={(e) => setSerialNumber(e.target.value)}
            autoFocus
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => { handle_sumbit(event) }}
          >
            提交
        </Button>

        </form>
      </div>


    </Container>

    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>证书序列号</TableCell>
          <TableCell align="right">起始时间</TableCell>
          <TableCell align="right">截至时间</TableCell>
          <TableCell align="right">证书</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>

        <TableRow key={row.serialNumber}>
          <TableCell component="th" scope="row">
            {row.serialNumber}
          </TableCell>
          <TableCell align="right">{row.start_time}</TableCell>
          <TableCell align="right">{row.end_time}</TableCell>
          <TableCell align="right">            <textarea id="w3review" name="w3review" rows="15" cols="70" defaultValue={row.pem}>
          </textarea>
          </TableCell>

        </TableRow>

      </TableBody>
    </Table>

  </div> */
  );
}
