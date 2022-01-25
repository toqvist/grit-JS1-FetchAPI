//Lägg till din egna KEY
const KEY = 'b4e997214e2f87d6f3582422b364dab9';
let searchText = 'frog';

//Vi söker endast på 1foto per sida och 1 sida
const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=1&page=1`;

fetch(url).then(
    function(response){
        console.log(response);
        if(response.status>=200 && response.status<300){
            return response.json();
        }
        else{
            throw 'Something went wrong. :(';
        }
    }
).then(
    function(data){
        console.log(data);
        //Vi hämtar första bilden
        getImageUrl(data.photos.photo[0]);
    }
).catch(
    function(error){
        console.log(error);
    }
);

//här ska vi pussla ihop bild-urlen
function getImageUrl(photoObject){
    let photo = photoObject;
    let size = 'm';

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    // console.log(imgUrl);
    displayImg(imgUrl);
}

//för att visa bilden
function displayImg(url){
    let img = document.createElement('img');
    img.src = url;

    document.body.appendChild(img);
}