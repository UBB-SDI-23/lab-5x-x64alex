import { Container, Card, CardContent, IconButton, CardActions, Button, Stack, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";

export const Login = () => {
	const { categoryId } = useParams();
	const navigate = useNavigate();

	const handleLogin = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.delete(`${BACKEND_API_URL}/categories/${categoryId}`);
		alert("Category deleted")
		navigate("/categories");
	};

	const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		navigate("/categories");
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<Stack direction="row" spacing={2}   alignItems="center">
						<IconButton component={Link} sx={{ mr: 3 }} to={`/categories`} >
							<ArrowBackIcon />
						</IconButton>{" "}
					</Stack>

					<form onSubmit={handleLogin}>
						<TextField
                            type="string"
							id="name"
							label="username"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							// onChange={(newValue) => category.categoryName = newValue.target.value}
						/>
                        <TextField
                            type="password"
							id="name"
							label="password"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							// onChange={(newValue) => category.categoryPopularity = Number(newValue.target.value)}
						/>

						<Button id = "submitButton" type="submit">Login</Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
	
};