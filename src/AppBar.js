import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {useNavigate } from "react-router-dom";

//const pages = ['Products', 'Pricing', 'Blog'];

function ResponsiveAppBar({pages, name, handleFileUpload, handleDocumentation}) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (event) => {
    setAnchorElNav(null);
    console.log('/'+event.target.firstChild.data);
    navigate('/'+event.target.firstChild.data);
  };

  return (
    <React.Fragment>
      <AppBar position="sticky" sx={{mb:1}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Tooltip title="Homepage">
          <ScreenShareIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} onClick={() => {navigate('/');}} />
          </Tooltip>
          <Tooltip title="Homepage">
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => {navigate('/');}}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.2rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            {name}
          </Typography>
          </Tooltip>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Tooltip title="Homepage">
          <ScreenShareIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} onClick={() => {navigate('/');}} />
          </Tooltip>

          <Tooltip title="Homepage">
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => {navigate('/');}}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {name}
          </Typography>
          </Tooltip>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Documentation">
              <HelpOutlineIcon onClick={handleDocumentation} sx={{ p: 0 }}/>
            </Tooltip>
            <input type="file" id="fileInput" onChange={handleFileUpload} accept=".json,.gz,.gzip" style={{ display: "none" }}/>
            <Tooltip title="Load JSON File">
              <UploadFileIcon onClick={() => {
                let fileInput = document.getElementById("fileInput");
                fileInput.value = ''; //reset the value so that user can upload same json over and over.
                fileInput.click();
              }} sx={{ p: 0 }}/>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </React.Fragment>
  );
}
export default ResponsiveAppBar;