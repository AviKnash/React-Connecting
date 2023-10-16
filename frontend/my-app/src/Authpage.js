import React, { useState } from "react";
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { useMutation,gql } from "@apollo/client";



const AuthPage=()=>{
    const [registernow,setRegisternow]=useState(true);
    const [username,setUsername]=useState('');
    const [password1,setPassword1]=useState("");
    const [password2,setPassword2]=useState("");
    const [tokenAuth]=useMutation(LOGIN_MUTATION,{
        onCompleted(data){
            console.log("Token Data",data);
            if (data?.tokenAuth?.token){
                    window.localStorage.setItem("token",data?.tokenAuth?.token);    
                window.location.href="/";}
            else{
                alert("Error");
            }
        }
    });

    const [createUser,{loading:resgisterloading,error:registerError}]=useMutation(REGISTER_NEW_USER,{
        onCompleted(data){
            if(data.createUser.user.username){
                alert("User created");
                setRegisternow(false);
            }
            else{
                alert("Error-try again please");
            }
            
        }
    });
    //Check password
    const loginNow=()=>{
        tokenAuth({variables:{username:username,password:password1}})
    };
    const RegisterNewUser=()=>{
        if (password1===password2){
            createUser({variables:{username:username,password:password1}})
        }
        else{
            alert("Password not matching")
        }
    }
    return(
        <Container>
            <Typography variant="h3" align ="center">
                {registernow ? "Register Now"  : "Login Now"}
            </Typography>
            <Grid container spacing={3} style={{
                maxWidth:"500px",
                margin:"0 auto"
            }}>
                <Grid item xs ={12} md={12} lg={12}>
                    <TextField
                        fullWidth id="outlined-basic"
                        label="Username"
                        name="username"
                        variant="outlined"
                        onChange={(event)=>setUsername(event.target.value)}
                    />
                </Grid>
                <Grid item xs ={12} md={12} lg={12}>
                    <TextField
                        fullWidth id="outlined-basic"
                        label="Password"
                        name="password"
                        variant="outlined"
                        type="password"
                        onChange={(event)=>setPassword1(event.target.value)}
                    />
                </Grid>
                {registernow && (
                <Grid item xs ={12} md={12} lg={12}>
                    <TextField
                        fullWidth id="outlined-basic"
                        label="Confirm Password"
                        name="password"
                        variant="outlined"
                        type="password"
                        onChange={(event)=>setPassword2(event.target.value)}
                    />
                </Grid>)}
                <Box style={{
                    margin:"0 auto",
                }}>
                {registernow ?
                    (
                        <>
                        <Button onClick={RegisterNewUser} colour="primary" variant="contained">Register</Button>
                        <Button onClick={()=>setRegisternow(false)}>Already registered? Login!</Button>
                        </>
                    ):
                    (
                        <>
                        <Button onClick={loginNow} disabled={!username || !password1} colour="primary" variant="contained">Login</Button>
                        <Button onClick={()=>setRegisternow(true)}>New? Register!</Button>
                        </>
                    )
                }
                </Box>
            </Grid>
        </Container>
    );
};


const LOGIN_MUTATION=gql`
mutation LoginNow($username:String!,$password:String!){
  tokenAuth(username:$username,password:$password){
    token
  }
}
`

const REGISTER_NEW_USER=gql`
mutation Register($username:String!,$password:String!){
  	createUser(username:$username,password:$password){
  	user{
      id
      username
      
    }
    
  }
      
    }


`

export default AuthPage;




