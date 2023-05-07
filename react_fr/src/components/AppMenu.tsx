import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { BACKEND_API_URL,userRole,updateGlobalVar,isAdmin } from "../constants";

export const AppMenu = () => {
	const location = useLocation();
	const path = location.pathname;

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ marginBottom: "20px" }}>
				<Toolbar>
					<IconButton
						component={Link}
						to="/"
						size="large"
						edge="start"
						color="inherit"
						aria-label="school"
						sx={{ mr: 2 }}>
						<SchoolIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ mr: 5 }}>
						Payroll
					</Typography>
					<Button
						variant={path.startsWith("/categories") ? "outlined" : "text"}
						to="/categories"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Categories
					</Button>
					<Button
						variant={path.startsWith("/products") ? "outlined" : "text"}
						to="/products"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Products
					</Button>
					<Button
						variant={path.startsWith("/clients") ? "outlined" : "text"}
						to="/clients"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Clients
					</Button>
					<Button
						variant={path.startsWith("/transactions") ? "outlined" : "text"}
						to="/transactions"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Transactions
					</Button>
					<Button
						variant={path.startsWith("/login") ? "outlined" : "text"}
						to="/login"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Login
					</Button>
					{isAdmin() &&
					<Button
						variant={path.startsWith("/admin") ? "outlined" : "text"}
						to="/admin"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Admin
					</Button>
					}
				</Toolbar>
			</AppBar>
		</Box>
	);
};
