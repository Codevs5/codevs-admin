import axios from 'axios';
import config from './config/urls.json';

export const getEntries = (key, pending = false, declined = false, accepted = false) =>
  axios.get(`${config.gasEntriesValidator}?key=${key}&pending=${pending}&declined=${declined}&accepted=${accepted}`)
    .then((res) => res.data)
    .then((data) => (data.message)?console.log('Error, sin acceso!'):data)
    .catch(err => console.log(err));

/*
* Perdoname señor por utilizar un GET en vez de un POST
* es mi último recurso, no quería hacerlo pero me veo obligado.
* He pecado, lo sé. Qué lance la primera piedra quien no haya
* hecho un apaño en el código a la desesperada.
* Hoy es un día muy triste para mi, he incumplido uno de los
* mandamientos del buen programador.
* Rezaré 20 Ave Marias.
* Amen, o lo que se diga cuando se confiesa uno.
*/
export const postUpdateReview = (key, payload) => {
  if(!payload || !payload.url || !payload.state) return Promise.reject('Invalid params');
  axios.get(`${config.updateEntriesValidator}?key=${key}&id=${payload}`)
    .then(res => {console.log(res);return res.data})
    .then(data => (data.message)?console.log('Error, sin acceso!'):data)
    .catch(err => console.log(err));
}

/*
 * Aquí, reincidiendo y tal. Otro GET.
 * La culpa no es mía, es de Google,
 * no me dejan modificar las cabeceras de Google App Script.
 * Tmbién es cierto que no he investigado mucho en el asunto,
 * queda como una cosa pendiente, otra más, a la lista de cagadas
 * por arreglar.
 * Necesito más café, o cerveza, además no son horas.
 * Esto lo arreglo por mis cojones morenos.
 * TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO
 */
export const postNewReviewer = (key, payload) =>
  axios.post(`${config.gasEntriesValidator}?key=${key}`, payload)
    .then(res => console.log(res))
    .catch(err => console.log(err));
