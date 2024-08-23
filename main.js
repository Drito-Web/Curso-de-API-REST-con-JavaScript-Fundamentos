const api_url = "https://api.thecatapi.com/v1/images/search?limit=3";

const button = document.querySelector("button")


async function reload() {

  const res = await fetch(api_url);
  const data = await res.json();

  console.log(data);

  const img1 = document.querySelector('.img1');
  const img2 = document.querySelector('.img2');
  const img3 = document.querySelector('.img3');
  
  img1.src = data[0].url;
  img2.src = data[1].url;
  img3.src = data[2].url;



}
reload()
button.addEventListener('click', reload)