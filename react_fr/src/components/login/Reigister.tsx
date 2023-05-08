import { Container, Card, CardContent, IconButton, CardActions, Button, Stack, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios, { AxiosResponse, AxiosResponseHeaders } from "axios";
import { BACKEND_API_URL,userRole,updateGlobalVar,updateUserRole,updateUserName, userName } from "../../constants";
import { LoginRequest } from "../../models/Login/LoginRequest";
import { useState } from "react";
import { SignUpRequest } from "../../models/Login/SignUpRequest";


export const Register = () => {
	const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [signup, setSignUp] = useState<SignUpRequest>(
        {
            username: "",
            password: "",
            name: "",
            gender: "",
            bio: "",
            location: "",
            birthdate: new Date()
        }
    );
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            username: signup.username,
            password:signup.password,
            name: signup.name,
            gender: signup.gender,
            bio: signup.bio,
            location: signup.location,
            birthdate: signup.birthdate
        }),
    };

	const handleRegister = async (event: { preventDefault: () => void }) => {
        handleButtonClick()
        if(!error){
            try{
                event.preventDefault();
        
        
                const response = await fetch(`${BACKEND_API_URL}/signin`,requestOptions);
                const code = await response.json();
        
                alert("Registration code is: "+code)
                navigate("/confirmation");
                }catch(error){
                    alert("Error")
                }
        }
	};

    const handleButtonClick = () => {
        if (signup.password.length < 8) {
          setError(true);
        } else {
          setError(false);
          // Do something with the password
        }
      };

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

					<form onSubmit={handleRegister}>
						<TextField
                            type="string"
							id="name"
							label="username"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => signup.username = newValue.target.value}
						/>
                        <TextField
                            type="password"
							id="name"
							label="password"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => signup.password = newValue.target.value}
                            error={error}
                            helperText={error ? "Password must be at least 8 characters long" : ""}
						/>

						<Button id = "submitButton" type="submit"> Register </Button>
					</form>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</Container>
	);
	
};