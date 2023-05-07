import { Container, Card, CardContent, IconButton, CardActions, Button, Stack } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL } from "../../constants";

export const ClientDelete = () => {
	const { clientId } = useParams();
	const navigate = useNavigate();

	const config = {
		headers: {
		  Authorization: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY4MzQ5NDc5OCwiZXhwIjoxNjgzNTgxMTk4fQ.Qtfg7d_cJXWDuhjNhMBTS3WFeap5OBdWU7wQIqrERs4ePKOzyLI8CDD1dr1nl7TxTLCkmtNt5eZDpCnkfmobXA",
		  'Content-Type': 'application/json'
		}
	  };

	const handleDelete = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.delete(`${BACKEND_API_URL}/clients/${clientId}`,config);
		alert("client deleted")
		navigate("/clients");
	};

	const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		navigate("/clients");
	};

	return (
		<Container>
			<Card>
				<CardContent>
                <Stack direction="row" spacing={2}   alignItems="center">
					<IconButton component={Link} sx={{ mr: 3 }} to={`/clients`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					Are you sure you want to delete this client? This cannot be undone!
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