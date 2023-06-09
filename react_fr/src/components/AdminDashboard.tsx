import { Container, Card, CardContent, IconButton, CardActions, Button, Stack, Autocomplete, TextField } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { BACKEND_API_URL, authorization } from "../constants";
import { UserNameDTO } from "../models/Login/UserNameDTO";
import { useEffect, useState } from "react";
import { EntityPerPage } from "../models/EntityPerPage";

export const AdminDashboard = () => {
	const scriptName = "sql_script10k.sql";
	const navigate = useNavigate();
	const config = {
		headers: {
		  Authorization: authorization,
		  'Content-Type': 'application/json'
		}
	}


    const [users, setUsers] = useState<UserNameDTO[]>([]);
    const [userId, setUserId] = useState<Number>(0);
	const [searchString, setSearchString] = useState("");
    const roles = ['ROLE_ADMIN', 'ROLE_MODERATOR', 'ROLE_REGULAR', 'ROLE_ANONYMOUS'];
    const [newUserRole, setNewUserRole] = useState<String>("ROLE_ANONYMOUS");




    useEffect(() => {
		fetch(`${BACKEND_API_URL}/user/usernames?searchString=${searchString}`)
			.then((response) => response.json())
			.then((data) => {
				setUsers(data);
			});


	}, [searchString]);

	const deleteAllData = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.get(`${BACKEND_API_URL}/user/deleteAllEntities`, config);
		alert("all data is deleted")
		navigate("/");
	};

    const runScript = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await fetch(`${BACKEND_API_URL}/run-script?scriptName=${scriptName}`,config);
		alert("Script finished")
		navigate("/");
	};

    const editRoles = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.post(`${BACKEND_API_URL}/user/usernames/${userId}?newRole=${newUserRole}`, null, config);
		alert("Role has been edited")
		navigate("/");
	};
	


    const [entities, setEntities] = useState<EntityPerPage>(
        {
            entries:50
        }
    );

	const handleEntitiesPerPage = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        axios.post(`${BACKEND_API_URL}/user/modifyEntryPerPage`,entities, config)
        .then((response) => {
            console.log(response.data);
            alert("Entities per page have been modified")
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
                <Stack direction="row" spacing={10}   alignItems="center"> 
                Edit roles   
                </Stack>


                <form onSubmit={editRoles}>
						<Autocomplete
							disablePortal
							id="combo-box-demo"
							options={users.map((user) => user.username)}
							sx={{ mb: 2 }}
							onChange={(e, value) => {
								for (let i = 0; i < users.length; i++) {
									if(users[i].username === value){
                                        setUserId(users[i].id)
									}
								}
							}}
							renderInput={(params) => <TextField {...params} label="User Names" 	
							onChange={(newValue) => {
								setSearchString(newValue.target.value)
							}}/>}
						/>

                        <Autocomplete
							disablePortal
							id="combo-box-demo"
							options={roles}
							sx={{ mb: 2}}
							onChange={(e, value) => {
                                if (value !== null) {
                                    setNewUserRole(value);
                                  }
							}}
							renderInput={(params) => <TextField {...params} label="User Role"
                            />}
						/>
						<Button id = "submitButton" type="submit">Edit role </Button>
					</form>
				</CardContent>
			</Card>
            <Card>
				<CardContent>
                <Stack direction="row" spacing={10}   alignItems="center"> 
                Set entries per page   
                </Stack>


                <form onSubmit={handleEntitiesPerPage}>
                        <TextField
                            type="number"
							id="name"
							label="Entities per page"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(newValue) => entities.entries = Number(newValue.target.value)}
						/>
						<Button id = "submitButton" type="submit">Submit </Button>
					</form>
				</CardContent>
			</Card>
		</Container>
	);
	
};