// import React from "react";
// import {gql, useQuery } from '@apollo/client';
// import { Avatar, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText,DeleteIcon,EditIcon } from "@mui/material";


// const QUERY_ALL_POSTS=gql`
//   {
//        posts{
//             id
//             tag
//             title
//             date	  
//    }
//  }
// `;

//  const GET_USER_DATA=gql`
// {
//         user{
//             id
//             username
//         }

// }
 
//  `

// function DisplayData(){
//     const {loading,data,error} =useQuery(QUERY_ALL_POSTS);
//     const {loading: userloading, error: usererror, data: userdata } = useQuery(
//         GET_USER_DATA
//       );
//     if (loading){
//         return 'Loading..';
//     }
//     if(error) return(<>{JSON.stringify(error)}</>);

    
//     return (<div>
//        <List>
//           {data?.posts?.map((item, i) => (
//             <ListItem button key={i}>
//               <ListItemIcon>
//                 <Avatar
//                   style={{
//                     backgroundColor: "blue",
//                   }}
//                 >
//                   {i + 1}
//                 </Avatar>
//               </ListItemIcon>
//               <ListItemText primary={item?.title} />
//             </ListItem>
//           ))}
//         </List>

//     </div>);
//     }

// export default DisplayData;