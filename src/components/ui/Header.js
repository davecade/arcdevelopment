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
    marginBottom: "3em"
  },
  logo: {
    height: "7em",
    "&:hover": {
      cursor: "pointer"
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
  }
}))
  
const Header = (props) => {
  const classes = useStyles()
  const [ value, setValue ] = useState(0)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ open, setOpen ] = useState(false)
  const [ selectedIndex, setSelectedIndex ] = useState(0)

  const handleChange = (e, value) => {
    setValue(value)
  }

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
    setOpen(true)
  }

  const handleClose = ( e, value ) => {
    setAnchorEl(null)
    setOpen(false)
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
  }, [value])

    return (
      <Fragment>
        <ElevationScroll>
            <AppBar position="fixed" color="primary">
                <Toolbar disableGutters>
                  <Button disableRipple onClick={() => setValue(0)} component={Link} to="/" className={classes.logoContainer}>
                    <img alt="company logo" className={classes.logo} src={logo} />
                  </Button>
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
                      open={open}
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
                </Toolbar>
            </AppBar>
        </ElevationScroll>
        <div className={classes.toolbarMargin}/>
      </Fragment>
    )
}

export default Header
