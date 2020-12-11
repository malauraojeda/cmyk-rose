const ciudad = document.querySelector('.titulo');
const containerTitulo = document.querySelector('.container__titulo');

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
const kelvinACelsius = function (k) {
  return Math.trunc(k - 273.15);
};

//insertar al DOM la ciudad y la temperatura
const insertarDOM = function (data) {
  ciudad.textContent = `Usted está en la ciudad de ${data.name}, ${
    data.sys.country
  }, la temperatura es:${kelvinACelsius(data.main.temp)} ºC`;
};

//consulta clima
const clima = async function (lat, lon) {
  const resClima = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ad226a44dedb3b77340424c5a27e237d`
  );

  if (!resClima.ok) throw new Error('Error en la busqueda del clima');
  const dataClima = await resClima.json();
  console.log(dataClima);
  insertarDOM(dataClima);
};

//Mostrar error
// const mostrarError = function (err) {
//   ciudad.style.display = 'none';
//   ciudad.textContent = err;
// };
//mostrar error
const mostrarError = function (msj) {
  ciudad.textContent = `${msj}`;
};

//consulta ciudad
const ciudadDondeEstoy = async function () {
  try {
    const pos = await obtenerUbicacionActual();
    const { latitude: lat, longitude: lon } = pos.coords;
    clima(lat, lon);
  } catch (err) {
    mostrarError(err.message);
  }
};
ciudadDondeEstoy();
