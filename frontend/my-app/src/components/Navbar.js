import {styled} from "@mui/material/styles"
import { AppBar, Box, Toolbar, Typography,theme, InputBase, Badge, Avatar, Menu, MenuItem, Button } from "@mui/material";
import React, { useState } from "react";
import { borderRadius } from "@mui/system";
import { useQuery,gql } from "@apollo/client";
import PetsIcon from '@mui/icons-material/Pets';


const StyledToolBar=styled(Toolbar)({
    display:"flex",
    justifyContent:"space-between",
    backgroundColor:"gray",
});

//Removed. Test again with posts
const Search=styled("div")(({theme})=>({
    backgroundColor:"white",
    padding:"0 10px",
    borderRadius:"10px",
    width:"40%",

}));

//Only avatar implemented:(1)Add birthdays?(2)Reminder event?
    
const UserBox=styled(Box)(({theme})=>({
    display:"flex",
    gap:"10px",
    alignItems:"center",
    [theme.breakpoints.up("sm")]:{
        display:"none",
    },

}));

const Icons=styled(Box)(({theme})=>({
    display:"none",
    gap:"12px",
    alignItems:"center",
    [theme.breakpoints.up("sm")]:{
        display:"flex",
    },

}));

function Navbar(){

    const [open,setOpen]=useState(false)
    const logoutNow=()=>{
        window.localStorage.clear()
        window.location.href="/";
    }


    const{data}=useQuery(QUERY_USER)


    return(
        <AppBar position="sticky">
            <StyledToolBar>
                    <Typography variant="h6" sx={{display:{xs:"none",sm:"block"}}}>MEOWRY</Typography>
                    <PetsIcon sx={{display:{xs:"block",sm:"none"}}}/>
                    <Typography>Welcome {data?.user?.username}! How was your day?...</Typography>
                    <Icons>
                        <Avatar onClick={e=>setOpen(true)}  sx={{width:30,height:30}}/>
                    </Icons>
                    <UserBox onClick={e=>setOpen(true)}>
                            <Avatar sx={{width:30,height:30}}/>
                            <Typography variant="span">User</Typography>
                    </UserBox>
            </StyledToolBar>
             <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    open={open}   
                    onClose={(e)=>setOpen(false)} 
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}>
                <MenuItem onClick={logoutNow} >Logout</MenuItem>
            </Menu>
        </AppBar>
    )

}

const QUERY_USER=gql`

{
  user{
    username
  }
}
`

export default Navbar;