const city = document.querySelector('.titulo');

//Ubicación actual con geolocation y luego con geocode
const obtenerUbicacionActual = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos),
      (err) => reject(err)
    );
  });
};

//Temperatura en celsius
const FahrenheitToCelsius = function (k) {
  return Math.trunc((celcius = k - 273.15));
};

//insertar al DOM la ciudad y la temperatura
const insertingDOM = function (data) {
  city.textContent = `Usted está en la ciudad de ${data.name}, ${
    data.sys.country
  }, la temperatura es:${FahrenheitToCelsius(data.main.temp)} ºC`;
};

//consulta clima
const clima = async function (data) {
  const resClima = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${data.city}&appid=ad226a44dedb3b77340424c5a27e237d`
  );

  const dataClima = await resClima.json();
  console.log(dataClima);
  insertingDOM(dataClima);
};

//consulta ciudad
const ciudadDondeEstoy = async function () {
  try {
    const pos = await obtenerUbicacionActual();
    // console.log(pos);
    const { latitude: lat, longitude: lng } = pos.coords;
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);

    if (!resGeo.ok) throw new Error('Problemas obteniendo tu ciudad');

    const dataGeo = await resGeo.json();

    clima(dataGeo);

    console.log(dataGeo.city);
  } catch (err) {
    console.error(err.message);
  }
};
ciudadDondeEstoy();
