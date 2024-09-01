const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_FpuJzs9h9qXqlkIY6wIWudQciNM4rjaGrSG2XlcZEPJvBD9tkpRXv5FYW5CNH7LI`;

const spanError = document.getElementById('error');

async function loadRandomMichis() { 

  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.group("Michis Randon 🦊") 
  console.log('status',res.status);
  console.log(data);
  console.groupEnd()

  if (res.status != 200) {
    spanError.innerHTML = "hubo un error " + res.status;
  } else {

    const img1 = document.querySelector('.img1');
    const img2 = document.querySelector('.img2');
    
    img1.src = data[0].url;
    img2.src = data[1].url;

    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");


    btn1.onclick = () => saveFavoritesMichi(data[ 0 ].id);
    btn2.onclick = () => saveFavoritesMichi(data[ 1 ].id);
   
  }

}

loadRandomMichis()