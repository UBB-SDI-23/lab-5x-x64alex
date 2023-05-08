import { Container, Card, CardContent, IconButton, CardActions, Button, Stack, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios, { AxiosResponse, AxiosResponseHeaders } from "axios";
import { BACKEND_API_URL,userRole,updateGlobalVar,updateUserRole,updateUserName, userName } from "../../constants";
import { LoginRequest } from "../../models/Login/LoginRequest";
import { useState } from "react";


export const Confirmation = () => {
	const navigate = useNavigate();

    const [confirmationToken, setConfirmationToken] = useState<String>("");

	const handleLogin = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        axios.post(`${BACKEND_API_URL}/register/confirm/${confirmationToken}`)
        .then((response) => {
            console.log(response.data);
            alert("Account is confirmed")
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            alert("Error: "+error)
          });   
    }

	return (
		<Container>
			<Card>
				<CardContent>
					<Stack direction="row" spacing={2}   alignItems="center">
						<IconButton component={Link} sx={{ mr: 3 }} to={`/`} >
							<ArrowBackIcon />
						</IconButton>{" "}
                        <h3>LogIn</h3>
					</Stack>

					<form onSubmit={handleLogin}>
						<TextField
                            type="string"
							id="name"
							label="Confirmation code"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => setConfirmationToken( newValue.target.value)}
						/>

						<Button id = "submitButton" type="submit"> Confirm </Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
	
};