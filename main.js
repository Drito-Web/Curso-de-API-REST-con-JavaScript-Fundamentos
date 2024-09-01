const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_FpuJzs9h9qXqlkIY6wIWudQciNM4rjaGrSG2XlcZEPJvBD9tkpRXv5FYW5CNH7LI`;
const API_URL_FAVORITES = `https://api.thecatapi.com/v1/favourites?api_key=live_FpuJzs9h9qXqlkIY6wIWudQciNM4rjaGrSG2XlcZEPJvBD9tkpRXv5FYW5CNH7LI`;
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_FpuJzs9h9qXqlkIY6wIWudQciNM4rjaGrSG2XlcZEPJvBD9tkpRXv5FYW5CNH7LI`;

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
async function loadFavoritesMichis() {
  
  const res = await fetch(API_URL_FAVORITES);
  const data = await res.json();
  console.group('Favoritos ❤️');
  console.log('status', res.status);
  console.log(data);
  
  const h2 = document.createElement('h2')
  h2.innerHTML = 'h';
  section.append(h2)
  
  if (res.status != 200) {
    spanError.innerHTML = "hubo un error " + res.status + data.messege;
  }else {
    data.forEach(michis => {
      const h1 = document.createElement('h1')
      const section = document.getElementById('MichisFavoritos');
      const article = document.createElement('div');
      const img = document.createElement('img');
      const btn = document.createElement('button')

      btn.textContent = 'Quitar de favoritos  ❌'
      img.src = michis.image.url;
      btn.onclick = deleteFavoriteMichi(michis.id)
      article.appendChild(img)
      article.appendChild(btn)

      section.append(article)
    });
     
  }
  
}

async function saveFavoritesMichi(id) {
  const res = await fetch(API_URL_FAVORITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_id: id
    }),
  })
  const data = res.json()
  console.log('Save Favorites!');
  console.log(res);
  console.log(data);
  

  if (res.status != 200) {
    spanError.innerHTML = "Hubo un Error en Favoritos " + res.status + data.message;
  }else {
    console.log('Michis guardado en favorito');
    loadFavoritesMichis()
  }
  
}

loadRandomMichis();
loadFavoritesMichis();