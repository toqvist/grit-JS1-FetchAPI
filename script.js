
const input = document.querySelector("input");

const button = document.querySelector("button");
button.addEventListener('click', imageSearch);


function imageSearch () {

    clearImagesAndErrors();

    let searchText = input.value;

    const KEY = 'b4e997214e2f87d6f3582422b364dab9';

    const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=1&page=1`;
    console.log(url)

    fetch(url).then(
        function(response){
            console.log(response);
            if(response.status>=200 && response.status<300){
                return response.json();
            }
            else{
                displayError(response.status);
                throw 'Error: ' + response.status;

            }
        }
    ).then(
        function(data){
            console.log(data);
            //Vi hämtar första bilden
            buildImageUrl(data.photos.photo[0]);
        }
    ).catch(
        function(error){
            console.log(error);
            displayError(error.name)
        }
    );
}
//här ska vi pussla ihop bild-urlen
function buildImageUrl(photoObject){
    let photo = photoObject;
    let size = 'm';

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    // console.log(imgUrl);
    displayImg(imgUrl);
}

//för att visa bilden
function displayImg(imgUrl){
    let img = document.createElement('img');
    img.src = imgUrl;

    document.body.appendChild(img);
}

function displayError(errorCode) {
    let p = document.createElement('p');
    p.innerText = `${errorCode} occured: Search query yielded no results`;
    document.body.appendChild(p);
}

function clearImagesAndErrors () {
  
    const images = document.querySelectorAll('img');

    for(const img of images){
        img.remove();
    }

    const messages = document.querySelectorAll('p');

    for(const message of messages){
        message.remove();
    }
}