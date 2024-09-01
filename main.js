const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_FpuJzs9h9qXqlkIY6wIWudQciNM4rjaGrSG2XlcZEPJvBD9tkpRXv5FYW5CNH7LI`;
const API_URL_FAVORITES = `https://api.thecatapi.com/v1/favourites`;
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

const spanError = document.getElementById('error');

async function loadRandomMichis() { 
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log("Michis Randon 🦊") 
  console.log(data);

  if (res.status != 200) {
    spanError.innerHTML = "hubo un error " + res.status;
  } else {
    const img1 = document.querySelector('.img1');
    const img2 = document.querySelector('.img2');
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    
    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => saveFavoriteMichi(data[0].id);
    btn2.onclick = () => saveFavoriteMichi(data[1].id);
  }
}

async function loadFavoritesMichis() {
  const res = await fetch(API_URL_FAVORITES,{
    method: 'GET',
    headers: {
      'x-api-key': 'live_FpuJzs9h9qXqlkIY6wIWudQciNM4rjaGrSG2XlcZEPJvBD9tkpRXv5FYW5CNH7LI',
    }
  });
  const data = await res.json();
  console.log('Favoritos ❤️');
  console.log(data);
  
  if (res.status != 200) {
    spanError.innerHTML = "hubo un error " + res.status +  data.messege;
  } else {

    const section = document.getElementById('MichisFavoritos');
    section.innerHTML = "";

    const h2 = document.createElement('h2')
    const h2Text = document.createTextNode('Michsi favoritos')
    h2.appendChild(h2Text)
    section.append(h2)

    data.forEach(michi => {
      const article = document.createElement('div');
      const img = document.createElement('img');
      const btn = document.createElement('button')
      const btnText = document.createTextNode('Quitar de favoritos  ❌')

      btn.appendChild(btnText)
      img.src = michi.image.url;
      btn.onclick = () => deleteFavoriteMichi(michi.id)
      article.appendChild(img)
      article.appendChild(btn)
      section.appendChild(article)
    });   
  }
}

async function saveFavoriteMichi(id) {
  const res = await fetch(API_URL_FAVORITES, {
    method: 'POST',
    headers: {
      'x-api-key': 'live_FpuJzs9h9qXqlkIY6wIWudQciNM4rjaGrSG2XlcZEPJvBD9tkpRXv5FYW5CNH7LI',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      image_id: id
    }),
  })
  const data = res.json()

  console.log('Save Favorites!');
  console.log(data);
  
  if (res.status != 200) {
    spanError.innerHTML = "Hubo un Error en Favoritos " + res.status + data.message;
  } else {
    console.log('Michis guardado en favorito');
    loadFavoritesMichis()
  } 
}

async function deleteFavoriteMichi(id) {
  const res = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: 'DELETE',
    headers: {
      'x-api-key': 'live_FpuJzs9h9qXqlkIY6wIWudQciNM4rjaGrSG2XlcZEPJvBD9tkpRXv5FYW5CNH7LI'
    }
  })
  const data = await res.json()

  if (res.status != 200) {
    spanError.innerHTML = "Hubo un Error en Favoritos " + res.status + data.message;
  } else {
    console.log('Michis eliminado de favorito');
    loadFavoritesMichis();
  }
}

loadRandomMichis();
loadFavoritesMichis();