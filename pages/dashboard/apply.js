import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Menu from '@material-ui/core/Menu';
import { useRouter } from 'next/router'
import axios from "axios"
import fileDownload from 'js-file-download'
import { useEffect } from "react";



// export async function getStaticProps() {

// }

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    overflow: "auto",
    padding: theme.spacing(16),
  },
  container: {
    paddingTop: theme.spacing(4),

  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  fixedHeight: {
    height: 240
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    height: "100%",
    marginTop: theme.spacing(1)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  submit: {
    width: "100%", // Fix IE 11 issue.
    height: "100%",
    marginTop: theme.spacing(6),
  },
  selectEmpty: {
    width: "100%", // Fix IE 11 issue.
    height: "100%",
    marginTop: theme.spacing(2),
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [passphrase, setpassphrase] = React.useState("");

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
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open_anchor = Boolean(anchorEl);

  // router.push("/signin");

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

  const [commonName, setCommonName] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [state, setState] = React.useState('');
  const [locality, setLocality] = React.useState('');
  const [organization, setOrganization] = React.useState('');
  const [ou, setOu] = React.useState('');
  const [year, setYear] = React.useState('');

  const apply = (event) => {
    event.preventDefault();
    axios.post('/api/apply', {
      username: username,
      commonName: commonName,
      country: country,
      state: state,
      locality: locality,
      organization: organization,
      ou: ou,
      year: year,
      passphrase: passphrase,
    })
      .then((response) => {

        const pem = response.data.pem;
        const filename = response.data.filename;
        if (pem != null && filename != null) {
          fileDownload(pem, filename);
        } else {
          alert('证书生成发生错误');
        }



      })
      .catch((error) => {
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
              id="commonName"
              label="域名"
              name="commonName"
              autoComplete="commonName"
              onChange={(e) => { setCommonName(e.target.value) }}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="country"
              label="国家"
              name="country"
              autoComplete="country"
              onChange={(e) => { setCountry(e.target.value) }}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="state"
              label="省份"
              name="state"
              autoComplete="state"
              onChange={(e) => { setState(e.target.value) }}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="locality"
              label="城市"
              name="locality"
              autoComplete="locality"
              onChange={(e) => { setLocality(e.target.value) }}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="organization"
              label="组织"
              name="organization"
              autoComplete="organization"
              onChange={(e) => { setOrganization(e.target.value) }}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="ou"
              label="组织单位"
              name="ou"
              autoComplete="ou"
              onChange={(e) => { setOu(e.target.value) }}
              autoFocus
            />

            <FormControl variant="outlined" required
              className={classes.selectEmpty}>
              <InputLabel id="year" >有效期</InputLabel>
              <Select
                label="有效期"
                id="year"
                value={year}
                required
                fullWidth
                onChange={(e) => {
                  setYear(e.target.value)
                }}
                displayEmpty
              >

                <MenuItem value={1}>1年</MenuItem>
                <MenuItem value={2}>2年</MenuItem>
                <MenuItem value={3}>3年</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="passphrase"
              label="口令"
              name="passphrase"
              autoComplete="ou"
              onChange={(e) => { setpassphrase(e.target.value) }}
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event) => {
                apply(event);

              }}
            >
              提交
          </Button>

          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>

      </Container>
    </div>
  );
}

















