import { Container, Card, CardContent, IconButton, CardActions, Button, Stack } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL, authorization } from "../constants";

export const AdminDashboard = () => {
	const { transactionId } = useParams();
	const navigate = useNavigate();
	const config = {
		headers: {
		  Authorization: authorization,
		  'Content-Type': 'application/json'
		}
	}

	const deleteAllData = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.delete(`${BACKEND_API_URL}/transactions/${transactionId}`, config);
		alert("transaction deleted")
		navigate("/transactions");
	};

    const runScript = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.delete(`${BACKEND_API_URL}/transactions/${transactionId}`, config);
		alert("transaction deleted")
		navigate("/transactions");
	};

	


	return (
		<Container>
			<Card>
				<CardContent>
                <Stack direction="row" spacing={2}   alignItems="center">
					<IconButton component={Link} sx={{ mr: 3 }} to={`/`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					Are you sure you want to delete this transaction? This cannot be undone!
                </Stack>

				</CardContent>
				<CardActions>
					<Button onClick={deleteAllData}>Delete it</Button>
					<Button onClick={runScript}>Cancel</Button>
				</CardActions>
			</Card>
            <Card>
				<CardContent>
                <Stack direction="row" spacing={2}   alignItems="center">
					<IconButton component={Link} sx={{ mr: 3 }} to={`/`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					Are you sure you want to delete this transaction? This cannot be undone!
                </Stack>

				</CardContent>
				<CardActions>
					<Button onClick={deleteAllData}>Delete it</Button>
					<Button onClick={runScript}>Cancel</Button>
				</CardActions>
			</Card>
		</Container>
	);
	
};