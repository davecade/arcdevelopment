import React, {Fragment, useState, useEffect} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useTheme, useMediaQuery } from '@material-ui/core';
import { SwipeableDrawer } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu"
import { IconButton } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'


function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down('md')]: {
      marginBottom: "2em"
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: "1.25em"
    }
  },
  logo: {
    height: "8em",
    "&:hover": {
      cursor: "pointer"
    },
    [theme.breakpoints.down('md')]: {
      height: "7em"
    },
    [theme.breakpoints.down('xs')]: {
      height: "5.5em"
    }
  },
  logoContainer: {
    backgroundColor: theme.palette.primary.main,
    padding: 0,
    border: "none"
  },
  tabContainer: {
    marginLeft: 'auto'
  },
  tab: {
    ...theme.typography.tab,
    marginLeft: "25px",
    minWidth: 10,
  },
  button : {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px",
  },
  menu: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: 0,
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  drawerIcon: {
    height: "50px",
    width: "50px"
  },
  drawer: {
    backgroundColor: theme.palette.common.blue
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white"
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange
  }
}))
  
const Header = (props) => {
  const classes = useStyles()
  const theme = useTheme();
  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const [ openDrawer, setOpenDrawer ] = useState(false)
  const [ value, setValue ] = useState(0)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ openMenu, setOpenMenu ] = useState(false)
  const [ selectedIndex, setSelectedIndex ] = useState(0)

  const handleChange = (e, newValue) => {
    setValue(newValue)
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
    setOpenMenu(true)
  }

  const handleClose = ( e, value ) => {
    setAnchorEl(null)
    setOpenMenu(false)
  }

  const handleMenuItemClick = (e, index) => {
    handleClose()
    setValue(1)
    setSelectedIndex(index)
  }

  const menuOptions = [
    {name: "Services", link: "/services"},
    {name: "Customer Software Development", link: "/customsoftware"},
    {name: "Mobile App Development", link: "/mobileapps"},
    {name: "Website Development", link: "/websites"},
  ]

  useEffect(() => {
    if(window.location.pathname=== "/" && value !== 0) {
      setValue(0)
    } else if (window.location.pathname=== "/services" && value !== 1) {
      setValue(1)
    } else if (window.location.pathname=== "/revolution" && value !== 2) {
      setValue(2)
    } else if (window.location.pathname=== "/about" && value !== 3) {
      setValue(3)
    } else if (window.location.pathname=== "/contact" && value !== 4) {
      setValue(4)
    }

    switch (window.location.pathname) {
      case "/":
        if(value !== 0) {
          setValue(0)
        }
        break;

      case "/services":
        if(value !== 1) {
          setValue(1)
          setSelectedIndex(0)
        }
        break;

      case "/customsoftware":
        if(value !== 1) {
          setValue(1)
          setSelectedIndex(1)
        }
        break;

      case "/mobileapps":
        if(value !== 1) {
          setValue(1)
          setSelectedIndex(2)
        }
        break;

      case "/websites":
        if(value !== 1) {
          setValue(1)
          setSelectedIndex(3)
        }
        break;

      case "/revolution":
        if(value !== 2) {
          setValue(2)
        }
        break;

      case "/about":
        if(value !== 3) {
          setValue(3)
        }
        break;

      case "/contact":
        if(value !== 4) {
          setValue(4)
        }
        break;

      case "/estimate":
        if(value !== 5) {
          setValue(5)
        }
        break;

      default:
        break;
    }
  }, [value])

  const tabs = (
    <Fragment>
       <Tabs 
            className={classes.tabContainer}
            indicatorColor="primary"
            onChange={handleChange}
            value={value}
          >
            <Tab
              className={classes.tab}
              component={Link}
              to="/"
              label="Home"
            />
            <Tab
              aria-owns={anchorEl ? "simple-menu" : undefined}
              aria-haspopup={anchorEl ? "true" : undefined}
              onMouseOver={handleClick}
              className={classes.tab}
              component={Link}
              to="/services"
              label="Services"  
            />
            <Tab
              className={classes.tab}
              component={Link}
              to="/revolution"
              label="The Revolution"
            />
            <Tab
              className={classes.tab}
              component={Link}
              to="/about"
              label="About Us"
            />
            <Tab
              className={classes.tab}
              component={Link}
              to="/contact"
              label="Contact Us"
            />
          </Tabs>
          <Button variant="contained" color="secondary" className={classes.button}>
              Free Estimate
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{onMouseLeave: handleClose}}
            classes={{paper: classes.menu}}
            elevation={0}
          >
            {
              menuOptions.map( (menu, index) => (
                <MenuItem
                  key={index}
                  component={Link}
                  to={menu.link}
                  onClick={(e) => handleMenuItemClick(e, index)}
                  classes={{root: classes.menuItem}}
                  selected={index===selectedIndex && value===1}
                >
                  {menu.name}
                </MenuItem>
              ))
            }
          </Menu>
    </Fragment>
  )

  // Drawer
  const drawer = (
    <Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => {
          setOpenDrawer(false)
        }}
        onOpen={() => {
          setOpenDrawer(true)
        }}
        classes={{paper: classes.drawer}}
      >
        <List disablePadding>
          <ListItem onClick={() => setOpenDrawer(false)} divider button component={Link} to="/">
            <ListItemText className={classes.drawerItem} disableTypography>
              Home
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)} divider button component={Link} to="/services">
            <ListItemText className={classes.drawerItem} disableTypography>
              Services
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)} divider button component={Link} to="/revolution">
            <ListItemText className={classes.drawerItem} disableTypography>
              The Revolution
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)} divider button component={Link} to="/about">
            <ListItemText className={classes.drawerItem} disableTypography>
              About Us
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)} divider button component={Link} to="/contact">
            <ListItemText className={classes.drawerItem} disableTypography>
              Contact Us
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)} className={classes.drawerItemEstimate} divider button component={Link} to="/estimate">
            <ListItemText className={classes.drawerItem} disableTypography>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        className={classes.drawerIconContainer}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </Fragment>
  )

    return (
      <Fragment>
        <ElevationScroll>
            <AppBar position="fixed" color="primary">
                <Toolbar disableGutters>
                  <Button disableRipple onClick={() => setValue(0)} component={Link} to="/" className={classes.logoContainer}>
                    <img alt="company logo" className={classes.logo} src={logo} />
                  </Button>
                  { matches ? drawer : tabs }
                </Toolbar>
            </AppBar>
        </ElevationScroll>
        <div className={classes.toolbarMargin}/>
      </Fragment>
    )
}

export default Header
