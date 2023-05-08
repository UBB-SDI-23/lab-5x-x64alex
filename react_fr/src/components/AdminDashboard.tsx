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
		await axios.get(`${BACKEND_API_URL}/user/deleteAllEntities`, config);
		alert("all data is deleted")
		navigate("/");
	};

    const runScript = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.delete(`${BACKEND_API_URL}/run-script}`, config);
		alert("Script finished")
		navigate("/");
	};

    const editRoles = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.delete(`${BACKEND_API_URL}/transactions/${transactionId}`, config);
		alert("Role has been edited")
		navigate("/");
	};
	


	return (
		<Container>
			<Card>
				<CardContent>
                <Stack direction="row" spacing={2}   alignItems="center">
					<IconButton component={Link} sx={{ mr: 3 }} to={`/`}>
						<ArrowBackIcon />
					</IconButton>{" "}
                    Admin Dashboard
                </Stack>
				</CardContent>

			</Card>
            <Card>
				<CardContent>
                <Stack direction="row" spacing={2}   alignItems="center">
					Delete All data
                </Stack>

				</CardContent>
				<CardActions>
					<Button onClick={deleteAllData}>Delete it</Button>
				</CardActions>
			</Card>
            <Card>
				<CardContent>
                <Stack direction="row" spacing={2}   alignItems="center">
					Run Generate script
                </Stack>

				</CardContent>
				<CardActions>
					<Button onClick={runScript}>Run script</Button>
				</CardActions>
			</Card>
            <Card>
				<CardContent>
                <Stack direction="row" spacing={2}   alignItems="center">
					Edit roles
                </Stack>

				</CardContent>
				<CardActions>
					<Button onClick={editRoles}>edit</Button>
				</CardActions>
			</Card>
		</Container>
	);
	
};