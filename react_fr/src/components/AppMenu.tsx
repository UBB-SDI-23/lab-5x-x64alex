import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isAdmin, isLoggedIn, logOut } from "../constants";


const NavBarButtons = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const path = location.pathname;

	const handleLogOut = () => {
		logOut()
		navigate("/");
	}

	return (
	  <>
		<Button
		  variant={path.startsWith("/categories") ? "outlined" : "text"}
		  to="/categories"
		  component={Link}
		  color="inherit"
		  sx={{ mr: 5 }}>
		  Categories
		</Button>
		<Button
		  variant={path.startsWith("/products") ? "outlined" : "text"}
		  to="/products"
		  component={Link}
		  color="inherit"
		  sx={{ mr: 5 }}>
		  Products
		</Button>
		<Button
		  variant={path.startsWith("/clients") ? "outlined" : "text"}
		  to="/clients"
		  component={Link}
		  color="inherit"
		  sx={{ mr: 5 }}>
		  Clients
		</Button>
		<Button
		  variant={path.startsWith("/transactions") ? "outlined" : "text"}
		  to="/transactions"
		  component={Link}
		  color="inherit"
		  sx={{ mr: 5 }}>
		  Transactions
		</Button>
		{!isLoggedIn() && (
		  <Button
			id="login"
			variant={path.startsWith("/login") ? "outlined" : "text"}
			to="/login"
			component={Link}
			color="inherit"
			sx={{ mr: 5 }}>
			Login
		  </Button>
		)}
		{isAdmin() && (
		  <Button
			variant={path.startsWith("/admin") ? "outlined" : "text"}
			to="/admin"
			component={Link}
			color="inherit"
			sx={{ mr: 2 }}>
			Admin
		  </Button>
		)}
		{isLoggedIn() && (
		  <Button
			id="logout"
			onClick={handleLogOut}
			color="inherit"
			sx={{ mr: 10 }}>
			Logout
		  </Button>
		)}
	  </>
	);
  };

export const AppMenu = () => {

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ marginBottom: "20px" }}>
				<Toolbar disableGutters>

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
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						<NavBarButtons />
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
