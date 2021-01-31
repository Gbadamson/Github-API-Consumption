import React,{useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import pix from '../photo/a.jpg'
import {axios} from '../axios'

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });




function CardApp() {
    const classes = useStyles()
    const [initial, setInitial] = useState([])
    const [searchState, setSearchState]= useState([])
    const [dataInput, setDataInput]= useState("")

    
    const getdata = async ()=>{
        const result = await axios.get('/')
        console.log(result)
        if(result.data){
            return setInitial(result.data)
        }
    }
    const checker = async()=>{
        console.log(dataInput)
        const result= await axios.get(`/${dataInput}`)
        console.log(result)
        if(result.data){
            return setSearchState(result.data)
        }
    }



    useEffect(()=>{
        getdata()
        
        checker()
    }, [])
    return (
        <>
         <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <SearchIcon/>
          </Grid>
          <Grid item>
            <TextField onChange={(e)=>setDataInput(e.target.value)}
            value={dataInput}
             id="input-with-icon-grid" label="Search" />
            <Button onClick={checker} variant="contained" color="primary">
                Search
            </Button>
          </Grid>
        </Grid>
      </div>
        {
           
                <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={searchState.avatar_url}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {searchState.login}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
             {" "} Following: 
                {searchState.following}</Typography>
                <Typography>
                {" "} Followers: 
                {searchState.followers}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
            
        }
        </>
    )
}

export default CardApp



