import { Box, Typography } from "@mui/material";
import React from "react";

//Idea:(1)Book marked entries?(2)Events?(3)Todos?(4)expand jukebox?
function Rightbar(){
    return(
        <Box  flex={2} p={2} sx={{display:{xs:"none",sm:"block"} }}>
            <Typography>:JUKEBOX: Click to play~</Typography>
            <embed align= "center" src="music.mp3" height={100} width={220} autoplay="true" loop="true"></embed>
            <Box position="fixed">

            </Box>
            
            </Box>
    )
}

export default Rightbar;