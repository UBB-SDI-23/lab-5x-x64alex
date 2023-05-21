import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAdmin, isLoggedIn, logOut } from "../constants";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";




export const AppMenu = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const path = location.pathname;
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(
		null
	  );
	
	  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	  };
	
	  const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	  };

	const handleLogOut = () => {
		logOut()
		navigate("/");
	}
	const pages = [
		{
			label: "Categories",
			variant: path.startsWith("/categories") ? "outlined" : "text",
			to: "/categories",
			visible: true
		  },
		  {
			label: "Products",
			variant: path.startsWith("/products") ? "outlined" : "text",
			to: "/products",
			visible: true
		  },
		  {
			label: "Clients",
			variant: path.startsWith("/clients") ? "outlined" : "text",
			to: "/clients",
			visible: true
		  },
		  {
			label: "Transactions",
			variant: path.startsWith("/transactions") ? "outlined" : "text",
			to: "/transactions",
			visible: true
		  },
		  {
			label: "Login",
			variant: path.startsWith("/login") ? "outlined" : "text",
			to: "/login",
			id: "login",
			visible: !isLoggedIn()
		  },
		  {
			label: "Admin",
			variant: path.startsWith("/admin") ? "outlined" : "text",
			to: "/admin",
			visible: isAdmin()
		  },
		  {
			label: "Chat",
			variant: path.startsWith("/chat") ? "outlined" : "text",
			to: "/chat",
			visible: true
		  },
		  {
			label: "Logout",
			onClick: handleLogOut,
			id: "logout",
			visible: isLoggedIn()
		  }
	]

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ marginBottom: "20px" }}>
				<Toolbar>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
						mr: 2,
						display: { xs: "none", md: "flex" },
						fontFamily: "monospace",
						fontWeight: 700,
						letterSpacing: ".3rem",
						color: "inherit",
						textDecoration: "none"
						}}
					>
						Payroll
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
							vertical: "bottom",
							horizontal: "left"
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "left"
						}}
						open={Boolean(anchorElNav)}
						onClose={handleCloseNavMenu}
						sx={{
							display: { xs: "block", md: "none" }
						}}
						>
						{pages.map((button, index) => (
							button.visible && (

							<MenuItem
									key={index}
									to={button.to as "string"}
									component={Link}
									color="inherit"
									sx={{ mr: 5 }}
									onClick={() => {
										if (button.onClick) {
										  button.onClick();
										}
										handleCloseNavMenu();
									  }}
									id={button.id}
							>
									{button.label}
						
							</MenuItem>
							)
						))}
						</Menu>
					</Box>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
					{pages.map((button, index) => (
						button.visible && (
						<Button
							key={index}
							variant={button.variant as "outlined" | "text" | "contained"}
							to={button.to as "string"}
							component={Link}
							color="inherit"
							sx={{ mr: 5 }}
							onClick={button.onClick}
							id={button.id}
						>
							{button.label}
						</Button>
						)
					))}

					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
