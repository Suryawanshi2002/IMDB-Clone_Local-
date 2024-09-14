import {useState, useEffect} from "react";

import Header from "../components/common/Header"
import {Box,Typography,styled} from "@mui/material"
import { categoryMovies } from "../services/api";

// import {POPULAR_API_URL, TOPRATED_API_URL, UPCOMING_API_URL} from '../constants/constat'

import Carousel from "react-multi-carousel";
import { useLocation } from "react-router-dom";
import { POPULAR_API_URL, TOPRATED_API_URL, UPCOMING_API_URL , moviesType } from "../constants/constant";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1 ,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};


const StyledBanner = styled('img')({
    height: 450,
    width : '100%' 

});

const Component = styled(Box)`
    width : 80%;
    margin: auto;
    `


const CategoryMovies = () =>
    {
        const [movies, setMovies] = useState([]);
        const {search} = useLocation();
        useEffect(() => {
            const getData = async (API_URL) => {
                let response = await categoryMovies(API_URL);
                setMovies(response.results);
            }
            
            let API_URL;
            if(search.includes('popular')){
                API_URL = POPULAR_API_URL;
            }else if(search.includes('upcoming')){
                API_URL = UPCOMING_API_URL;
            }else if(search.includes('toprated')){
                API_URL = TOPRATED_API_URL;
            }
            getData(API_URL);
        },[search]
    )
        return (
            <>
            <Header/> 

            <Component>
            <Carousel
                swipeable={false}
                draggable={false}
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                keyBoardControl={true}
                showDots={false}
                slidesToSlide={1}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {
                    movies.map(movie => (
                        <>
                            <StyledBanner key={movie.id} src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} />
                            {/* <Title>{movie.original_title}</Title> */}
                        </>
                    ))
                }
            </Carousel>

            <Box>
                <Typography>IMDb Charts</Typography>
                <Typography>{moviesType[search.split('=')[1]]}</Typography>
            </Box>
            </Component>
            </>
        )
    }


export default CategoryMovies;