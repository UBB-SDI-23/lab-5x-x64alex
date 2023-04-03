import { Container, Card, CardContent, IconButton, CardActions, Button, Stack } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";

export const ProductDelete = () => {
	const { productId } = useParams();
	const navigate = useNavigate();

	const handleDelete = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.delete(`${BACKEND_API_URL}/products/${productId}`);
		alert("Product deleted")
		navigate("/products");
	};

	const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		// go to products list
		navigate("/products");
	};

	return (
		<Container>
			<Card>
				<CardContent>
                <Stack direction="row" spacing={2}   alignItems="center">
					<IconButton component={Link} sx={{ mr: 3 }} to={`/products`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					Are you sure you want to delete this product? This cannot be undone!
                </Stack>

				</CardContent>
				<CardActions>
					<Button onClick={handleDelete}>Delete it</Button>
					<Button onClick={handleCancel}>Cancel</Button>
				</CardActions>
			</Card>
		</Container>
	);
};
