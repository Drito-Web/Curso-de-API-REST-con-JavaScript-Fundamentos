const API_URL = "https://api.thecatapi.com/v1/images/search?limit=3&&api_key=live_ZBuZrwg3MmKeg2ut46LciVMyiGu022BQJ0CXAy2A9U1jDEGScPUSoZu7WqjLAoz3";



async function loadRandomMichis() {
  
  const res = await fetch(API_URL);
  const data = await res.json();
  
  console.log(data);
  
  const img1 = document.querySelector('.img1');
  const img2 = document.querySelector('.img2');
  
  img1.src = data[0].url;
  img2.src = data[1].url;
  
  
  
  
}
const button = document.querySelector("#btnReload")
button.addEventListener('click', loadRandomMichis)