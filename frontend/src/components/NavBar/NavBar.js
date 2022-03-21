import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

import { authActions, authSelectors } from "../../redux/auth";

const NavBar = () => {
  const dispatch = useDispatch();
  const token = useSelector(authSelectors.getToken);

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return token ? (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Bike Rental
          </Typography>
          <Tooltip title="Logout">
            <IconButton
              onClick={handleLogout}
              size="large"
              edge="end"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  ) : null;
};

export default NavBar;
