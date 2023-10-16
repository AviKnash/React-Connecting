import { Box, Checkbox } from "@mui/material";
import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import { gql, useQuery } from "@apollo/client";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

//Material Ui expand default
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;

    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


function Post(){
    var ts = new Date().getTime(); //Doesnt work. (1)Try refresh api url every second?

    const {loading,error,data}=useQuery(QUERY_USER);

    const [expanded, setExpanded] = React.useState(false);

    //Material Ui
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return(
        <div>
            {data?.posts?.map((item)=>(
                  <Card sx={{margin:5 }}>
                      <CardHeader
                          avatar={
                            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                              R
                            </Avatar>
                          } //More icon ADD: Update, Delete, etc..
                          action={
                            <IconButton aria-label="settings">
                              <MoreVertIcon />  
                            </IconButton>
                          }
                          title={item?.user.username}
                          subheader={item?.date}
                      />
                      
                      <CardMedia
                        component="img"
                        height="20%"
                        image="http://thecatapi.com/api/images/get?format=src&type=img" //Repeat image(+ts doesnt work)(2)Try restrict size
                        alt="Image"
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          {item?.tag}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                      <Checkbox
                        icon={<BookmarkBorderIcon />}
                        checkedIcon={<BookmarkIcon />}
                      />
                        <ExpandMore
                          expand={expanded}
                          onClick={handleExpandClick}
                          aria-expanded={expanded}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </ExpandMore>
                      </CardActions>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                          <Typography paragraph>ENTRY:</Typography>
                          <Typography paragraph>
                            {item?.title}
                          </Typography>
                        </CardContent>
                      </Collapse>
                </Card>
                      ))
                  }
        </div>
    )

}


const QUERY_USER=gql`

{
  posts{
    id
    tag
    title
    date
    user{
      username
    }
  }

}
`

export default Post;