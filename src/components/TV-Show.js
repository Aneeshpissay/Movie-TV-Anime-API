import React, { useState } from 'react';
import {Row, Col, Card, CardImg, CardBody, CardTitle, Button, Input, FormGroup, Jumbotron, CardSubtitle} from 'reactstrap';
import axios from 'axios';
import Pagination from './Pagination';
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

function TV(){
    const [tv, setTv] = useState([]);
    const [pages, setPages] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const viewTv = (id)=>{
        const url = "https://www.themoviedb.org/tv/" + id;
        window.location.href = url;
    }
    const movieApi = (search)=>{
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=ef6d12c7d1cb8b3367d58fbd2543819b&language=en-US&query=${search}`)
             .then(res=>{
                setTv(res.data.results);
                setTotalPages(res.data.total_pages);
                setSearch(search);
             })
    } 
    const searchHandler = (event)=>{
       movieApi(event)
    }
    const nextPage = (pageNumber) =>{
        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=ef6d12c7d1cb8b3367d58fbd2543819b&language=en-US&query=${search}&page=${pageNumber}`)
             .then(res=>{
                setTv(res.data.results);
                setPages(pageNumber);
             })
    }
    return(
        <div className="container">
             <Jumbotron className="mt-5 bg-dark">
                 <h4 className="text-white text-center">Enter your tv show name</h4>
             <FormGroup className="container">
                 <Input type="search" className="mt-5" placeholder="Search the tv show" onChange={(e)=>searchHandler(e.target.value)}></Input>
             </FormGroup>
             <hr className="my-2" />
             <div style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end'}}>
                 <Pagination numberPages={totalPages} nextPage={nextPage} pages={pages}/>
             </div>
             </Jumbotron>
             <Row>
             {tv.map(tv=>(
                <Col sm="12" md="6" lg="4" className="mt-5 mb-2" key={tv.id}>
                    <Card className="bg-dark text-white">
                    { tv.poster_path === null ? <CardImg top src={"https://res.cloudinary.com/adv-blog/image/upload/v1597687458/default-image_xyffdj.jpg"} alt={tv.title}/>: <CardImg top src={"https://image.tmdb.org/t/p/w185" + tv.poster_path} alt={tv.title}/>}
                        <CardBody>
                            <CardTitle className="text-center"><h5>{tv.name}</h5></CardTitle>
                            <CircularProgressWithLabel value={(tv.vote_average * 10)} />
                                <CardSubtitle>Air Date: {tv.first_air_date}</CardSubtitle>
                            <div className="text-center">
                            <Button color="info" style={{borderRadius: "20px"}} className="dark" onClick={()=>viewTv(tv.id)}>View</Button>
                            </div>
                        </CardBody>
                </Card>
                </Col>
              ))}
            </Row>
        </div>
    )
}

export default TV;