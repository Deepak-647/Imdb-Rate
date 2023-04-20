// Movie list: https://omdbapi.com/?s=thor&page=1&apikey=7b209766
// Movie details: http://www.omdbapi.com/?i=tt3896198&apikey=7b209766


const searchBox =document.getElementById('search-movie');
const searchList =document.getElementById('search-results');
const searchedMovie =document.getElementById('result-container');


//loading movies from API 

async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=7b209766`;
    const response = await fetch(`${URL}`);
    const data = await response.json();
    // console.log(data.Search);
   
        displayMoviesList(data.Search);
        
    }
    function findMovies(){
        let searchTerm =searchBox.value;
        if(searchTerm.length > 0){
            searchList.classList.remove('hide-search-list');
            loadMovies(searchTerm);
        }else{
            searchList.classList.add('hide-search-list')
        }
    }

    function displayMoviesList(movies){
        searchList.innerHTML='';
        for(let i=0; i < movies.length; i++){
            let movieItem =document.createElement('div');
            movieItem.dataset.id=movies[i].imdbID;
            movieItem.classList.add('search-item');
            console.log(movieItem)
            movieItem.innerHTML =`
            <div class="search-item-thumbnail">
              <img
                src=${movies[i].Poster}
                alt="movie-img"
                srcset=""
              />
            </div>
            <div class="search-item-info">
              <h3>${movies[i].Title}</h3>
              <p>${movies[i].Year}</p>
            </div>
            `
            searchList.appendChild(movieItem);
        }
        loadMovieDetails();
    }

    function loadMovieDetails(){
        const searchListMovies = searchList.querySelectorAll('.search-item');
        searchListMovies.forEach(movie => {
            movie.addEventListener('click', async ()=> {
                // console.log(movie.dataset.id);
                searchList.classList.add('hide-search-list');
                searchBox.value="";
                const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=7b209766`);
                const movieDetails =await result.json();

                // console.log(movieDetails)
                displayMovieDetail(movieDetails)


            })
        })
    }
function displayMovieDetail(movie){
  searchedMovie.innerHTML=`
    <div class="movie-poster">
        <img
          src=${movie.Poster}
          alt="movie-image"
          srcset=""
        />
      </div>
      <div class="movie-info">
        <div class="movie-highlights">
          <h2 class="title">${movie.Title}</h2>
          <h3 class="imdb">
          <span><i class="fa-solid fa-star" style="color: #daa520"></i></span>
             ${movie.imdbRating}
          </h3>
          <h4 class="year"><span>Year : </span> ${movie.Year}</h4>
        </div>
        <div class="movie-details">
          <p class="genre">${movie.Genre}</p>
          <p class="actors">
            <span>Actors :</span> ${movie.Actors}
          </p>
          <p class="plot">
            <span>Plot :</span> ${movie.Plot}
          </p>
          <p class="country"><span>Country :</span> ${movie.Country}</p>
          <p class="writer">
            <span>Writer :</span> ${movie.Writer}
          </p>
          <p class="imdb-votes">
            <span>imdbVotes :</span> ${movie.imdbVotes}
          </p>
        </div>
      </div>
    `
}

window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});








































// //grabbing all the Elements
// const inputField =document.getElementById('search-movie');
// const searchResults =document.querySelector('.search-results');
// const searchButton = document.getElementById('search-btn');
// const movieContainer =document.querySelector('.result-container');



// //fetching movies list
// function moviesList(){
//     let searchTerm =inputField.value;
//     const moviesListUrl =`https://www.omdbapi.com/?s=${searchTerm}}&page=1&apikey=7b209766`;
//     fetch(moviesListUrl).then(response => response.json())
//     .then((data)=>{
//         let moviesArray = data.Search;
//         let slicedArray=moviesArray.slice(0,5);
//         console.log(moviesArray);
//          if(inputField.value!==""){
//          for(let i=0 ; i< slicedArray.length ;i++){
            
//             let movieItemList = document.createElement('div');
//             movieItemList.dataset.id = moviesArray[i].imdbID;
//             movieItemList.classList.add('movie-item-list')
//            //  here i have used += sign to cancel the overwritten property of innerHTML 
//          movieItemList.innerHTML +=`
//          <div class="searchitem-thumbnail" >
//          <img src=${moviesArray[i].Poster} alt="movie-img" srcset="">
//          </div>
//          <div class="search-info">
//              <h3>${moviesArray[i].Title}</h3>
//              <p>${moviesArray[i].Year}</p>
//          </div>
//          `
//          searchResults.appendChild(movieItemList);
//        }
//        loadMoviesDetails()
//          } 
//          function loadMoviesDetails(){
//             const searchListMovies = searchResults.querySelectorAll('.movie-item-list');
//             searchListMovies.forEach(movie => {
//                 movie.addEventListener('click', async ()=> {
//                     let imdbID = movie.dataset.id;
//                     // console.log(imdbID)
//                     searchResults.classList.add('hide-search-list');
//                     const movieUrl = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=7b209766`)
//                     const movieDetails =await movieUrl.json();
//                     console.log(movieDetails)
                 
//                     movieContainer.innerHTML = `
//                     <div class="movie-poster">
//                     <img src=${movieDetails.Poster} alt="" srcset="">
//                 </div>
//                 <div class="movie-info">
//                 <h2 class="title">${movieDetails.Title}</h2>
//                 <h3 class="imdb"> <span>Imdb : </span>${movieDetails.imdbRating} <span><i class="fa-solid fa-star" style="color:#daa520;"></i></span></h3>
//                 <p class="year"> <span>Year :</span> ${movieDetails.Year}</p>
//                 <p class="genre"> <span>Genre :</span> ${movieDetails.Genre}</p>
//                 <p class="actors"> <span>Actors :</span>${movieDetails.Actors}</p>
//                 <p class="plot"> <span>Plot :</span>${movieDetails.Plot}</p>
//                 <p class="country"> <span>Country :</span> ${movieDetails.Country}</p>
//                 <p class="writer"> <span>Writer :</span>${movieDetails.Writer} </p>
        
        
        
//                 </div>
//                     `

//                 })
//             } )
//          }
        
//     })
    
// }


// searchButton.addEventListener('click',moviesList);
