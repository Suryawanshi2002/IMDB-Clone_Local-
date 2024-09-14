import { useEffect , useState  } from "react";

import Header from "../components/common/Header";
import Banner from "../components/Banner";

import {categoryMovies} from "../services/api"

import UpNext from "../components/UpNext";



import Slides from "../components/Slides";

import {NOWPLAYING_API_URL} from "../constants/constant"

import {Box, styled} from "@mui/material"

const Wrapper = styled(Box)`
    display: flex;
    padding: 20px;
`

const Component = styled(Box)`
    padding: 0 115px;
`

const Home = () =>
{   
    const [movies, setMovies] = useState([]);
    useEffect(() =>
    {    
        
        const getData = async() => {
            let response = await categoryMovies(NOWPLAYING_API_URL);
            setMovies(response.results);
        }
        getData();
    },[])
    return (
        <>
        <Header/>

        <Component>
        <Wrapper>
            <Banner movies={movies} />
            <UpNext movies={movies}/>
             
        </Wrapper>
       
        
        <Slides movies={movies}/>
        <Slides movies={movies}/>
        <Slides movies={movies}/>
        <Slides movies={movies}/>
        <Slides movies={movies}/>
        <Slides movies={movies}/>
        <Slides movies={movies}/>
        <Slides movies={movies}/>
        <Slides movies={movies}/>
        <Slides movies={movies}/>
        </Component> 
        
        
        </>
    )
}

export default Home;