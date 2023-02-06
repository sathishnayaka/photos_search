import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addImages, clearImages } from './redux/store/imageSlice';

function SearchBar() {
  const imagesFromRedux = useSelector(state => state.images.value);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [imagesFound, setImagesFound] = useState(0);
  const [search , setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchImages();
  };
  const fetchMoreImages = () => {
    setPage(page + 1);
    fetchImages();
  };

  const fetchImages = async () => {
    if(searchTerm === search){
        dispatch(clearImages());
        const result = await axios.get(
            `https://api.unsplash.com/search/photos?query=${searchTerm}&page=${page}`,
            {
              headers: {
                Authorization: `Client-ID 9Ma2e7Gn3n38b7yGNw6bkAbtD0lNcw5oauJhDcPo9HM`,
              },
            }
          );
          dispatch(addImages([...imagesFromRedux,...result.data.results]));
          setImagesFound(result.data.total);
    }else{
        setPage(1);
        setSearch(searchTerm);
        const result = await axios.get(
            `https://api.unsplash.com/search/photos?query=${searchTerm}&page=${page}`,
            {
              headers: {
                Authorization: `Client-ID 9Ma2e7Gn3n38b7yGNw6bkAbtD0lNcw5oauJhDcPo9HM`,
              },
            }
          );
          dispatch(addImages([...result.data.results]));
          setImagesFound(result.data.total);
    }
  };

  return (
    <div className='span'>
    <form onSubmit={handleSubmit} style={{display:'flex', width:'90vw'}}>
      <input
        className="form-control form-control-lg w-100 mr-sm-2 span"
        type="search"
        placeholder="Search for photos"
        aria-label="Search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button class="btn btn-outline-success btn-lg my-2 my-sm-0" type="submit" style={{marginLeft:'35px'}}>
        <i class="fas fa-search"></i>
      </button>
    </form>
    <div>
    {imagesFromRedux.length > 0 && (
        <div className='span'><h1 className='header'>{search}</h1><span>{imagesFound} images found</span></div>
      )}
    </div>
    <div className="d-flex flex-wrap">
        {imagesFromRedux?.map((image) => (
          <img
            key={image.id}
            src={image.urls?.small}
            alt={image.description}
            className="m-2"
            style={{ width: '300px', height: '200px' }}
          />
        ))}
      </div>
      <div className='d-flex' style={{alignItems:'center',justifyContent:'center', marginTop:'17%'}}>
        {imagesFromRedux.length === 0 && <h1>Images not found enter correct input value</h1>}
      </div>
      {imagesFromRedux.length > 0 && (
        <button className="btn btn-primary btn-lg my-5" onClick={fetchMoreImages} style={{marginLeft:'45%', backgroundColor:'#000'}}>
          Load More
        </button>
      )}
    </div>
  );
}
export default SearchBar;