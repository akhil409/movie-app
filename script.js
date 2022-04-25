const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

//Initially get the favourite movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);  //Fetching movies list from api
    const respData = await resp.json(); //Fetching movies list from api
    
    console.log(respData);

    // respData.results.forEach(movie => {  //Fetching images list from api
    //     const img = document.createElement('img'); //Fetching images list from api
    //     img.src = IMGPATH + movie.backdrop_path;  //poster_path

    //     document.body.appendChild(img);         //Fetching images list from api
    // });
    showMovies(respData.results);
    // return respData;
};

function showMovies(movies) {
    //Clear Main
    main.innerHTML = '';


    movies.forEach((movie) => {  //Fetching images list from api
        const {poster_path,title,vote_average,overview} = movie; //Declaring the variables
        const movieEl = document.createElement('div'); //Fetching images list from api
        movieEl.classList.add('movie');

        movieEl.innerHTML=`
             <img src="${IMGPATH + poster_path}"
                  alt="${title}">
             <div class="movie-info">
                 <h3>${title}</h3>
                 <span class="${getClassByRate(vote_average)}">${vote_average}</span>
             </div>

             <div class="overview">
             <h4>Overview: </h4>
             ${overview}  </div>
        `
        main.appendChild(movieEl);
    });
}

//Color change for the specified rating
function getClassByRate(vote) {
     if(vote >= 8){
           return 'green';
     } else if (vote >= 5) {
         return 'orange';
     } else {
         return 'red';
     }
}

//Searh For the movies Event
form.addEventListener('submit',(e)=>{
      e.preventDefault();

      const searchTerm = search.value;

      if(searchTerm){
          getMovies(SEARCHAPI + searchTerm);

        search.value = '';
      }
});

// Reference: https://www.youtube.com/watch?v=dtKciwk_si4&t=18636s
// 05:23:05
//Mistakes Took
//1.Forgot to give the over view in for each of showMovies(movies) so the error is - script.js:46 Uncaught (in promise) ReferenceError: overview is not defined