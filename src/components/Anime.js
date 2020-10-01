import React, { useState } from 'react';
import {Row, Col, Card, CardImg, CardBody, CardTitle, Button, Input, FormGroup, Jumbotron} from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function CircularProgressWithLabel(props) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="static" {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" component="div" color="#CCCCCC" style={{fontFamily: 'Quicksand'}}>{props.value}%</Typography>
        </Box>
      </Box>
    );
  }
  
CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};
function Anime(){
    const [anime, setAnime] = useState([]);
    const movieApi = (search)=>{
        axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${search}`)
             .then(res=>{
                setAnime(res.data.data);
             })
    } 
    const searchHandler = (event)=>{
       movieApi(event)
    }
    const viewAnime = (slug)=>{
        const url = "https://kitsu.io/anime/" + slug;
        window.location.href = url;
    }
    return(
        <div className="container">
             <Jumbotron className="mt-5 bg-dark">
                 <h4 className="text-white text-center">Enter your anime name</h4>
             <FormGroup className="container">
                 <Input type="search" className="mt-5" placeholder="Search the anime" onChange={(e)=>searchHandler(e.target.value)}></Input>
             </FormGroup>
             </Jumbotron>
             <Row>
                 {anime.map(anime=>(
                <Col sm="12" md="6" lg="4" className="mt-5 mb-2" key={anime.id}>
                    <Card className="bg-dark text-white">
                        <CardImg top src={anime.attributes.posterImage.medium} alt={anime.attributes.titles.en_jp}/>
                        <CardBody>
                            <CardTitle className="text-center"><h5>{anime.attributes.canonicalTitle}</h5></CardTitle>
                            <CircularProgressWithLabel value={(Math.floor(anime.attributes.averageRating))} />
                            <div className="text-center">
                            <Button color="info" style={{borderRadius: "20px"}} className="dark" onClick={()=>viewAnime(anime.attributes.slug)}>View</Button>
                            </div>
                        </CardBody>
                </Card>
                </Col>
                ))}
            </Row>
        </div>
    )
}

export default Anime;