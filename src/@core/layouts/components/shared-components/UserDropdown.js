// ** React Imports
import { useState, Fragment, useEffect } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** MUI Imports
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// ** Icons Imports
import CogOutline from "mdi-material-ui/CogOutline";
import CurrencyUsd from "mdi-material-ui/CurrencyUsd";
import EmailOutline from "mdi-material-ui/EmailOutline";
import LogoutVariant from "mdi-material-ui/LogoutVariant";
import AccountOutline from "mdi-material-ui/AccountOutline";
import MessageOutline from "mdi-material-ui/MessageOutline";
import HelpCircleOutline from "mdi-material-ui/HelpCircleOutline";
import Link from "next/link";
import { IconButton } from "@mui/material";
import {
  ArrowDropDown,
  EnhancedEncryptionSharp,
  Notifications,
  Settings,
} from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/Language";
import { useDispatch, useSelector } from "react-redux";
import { logout, logoutAndResetEvent } from "src/store/slice/authSlice";
import Cookies from "js-cookie";

// ** Styled Components
const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const UserDropdown = () => {
  const router = useRouter();

  // ** States
  const [anchorEl, setAnchorEl] = useState(null);


  // const userDetails =  useSelector(state=>State?.auth?.user?.userDatadata)

  const userDetails = useSelector((state) => state?.auth?.user?.userData?.data);


  const dispatch = useDispatch();

  const handleSignOut = () => {
    Cookies.remove('token')
    sessionStorage.removeItem("userData");
    dispatch(logoutAndResetEvent());
    router.push("/login");
  };

  // ** Hooks

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url) => {
    if (url) {
      router.push(url);
    }
    setAnchorEl(null);
  };

  const styles = {
    py: 2,
    px: 4,
    width: "100%",
    display: "flex",
    alignItems: "center",
    color: "text.primary",
    textDecoration: "none",
    "& svg": {
      fontSize: "1.375rem",
      color: "text.secondary",
    },
  };

  return (
    <Fragment>
      <LanguageIcon sx={{ marginRight: 5, color: "gray" }} />
      <Notifications sx={{ marginRight: 5, color: "gray" }} />
      <EnhancedEncryptionSharp sx={{ marginRight: 5, color: "gray" }} />
      {/* <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      > */}
      <Avatar
        alt="John Doe"
        onClick={handleDropdownOpen}
        sx={{ width: 40, height: 40 }}
        src={
          userDetails?.profile_pic
            ? `http://104.211.25.86:8073/${userDetails?.profile_pic}`
            : "/images/avatars/1.png"
        }
      />{" "}
      <span
        onClick={handleDropdownOpen}
        style={{ color: "#0E436B !important" }}
      >
        Admin
      </span>{" "}
      <ArrowDropDown onClick={handleDropdownOpen} />
      {/* </Badge> */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ "& .MuiMenu-paper": { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge
              overlap="circular"
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              {/* <ImgStyled src={`http://104.211.25.86:8073/${userResData.profile_pic}`} alt='Profile Pic' /> */}
              <Avatar
                alt="John Doe"
                src={
                  userDetails?.profile_pic
                    ? `http://104.211.25.86:8073/${userDetails?.profile_pic}`
                    : "/images/avatars/1.png"
                }
                sx={{ width: "2.5rem", height: "2.5rem" }}
              />
            </Badge>
            <Box
              sx={{
                display: "flex",
                marginLeft: 3,
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>{
                userDetails?.name || "N/A"}
           </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "0.8rem", color: "text.disabled" }}
              >
                {`${userDetails?.user_type || "N/A"}`}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 2 }} />
            <>Profile</>
          </Box>
        </MenuItem>
        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <EmailOutline sx={{ marginRight: 2 }} />
            Inbox
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <MessageOutline sx={{ marginRight: 2 }} />
            Chat
          </Box>
        </MenuItem> */}
        {/* <Divider /> */}
        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CogOutline sx={{ marginRight: 2 }} />
            Settings
          </Box>
        </MenuItem> */}
        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CurrencyUsd sx={{ marginRight: 2 }} />
            Pricing
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <HelpCircleOutline sx={{ marginRight: 2 }} />
            FAQ
          </Box>
        </MenuItem> */}
        <Divider />
        <MenuItem
          sx={{ py: 2 }}
          // onClick={() => handleDropdownClose('/pages/login')}
          onClick={handleSignOut}
        >
          <LogoutVariant
            sx={{
              marginRight: 2,
              fontSize: "1.375rem",
              color: "text.secondary",
            }}
          />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;
