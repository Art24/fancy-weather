/* eslint-disable class-methods-use-this */
class MapService {
    getMap(lat, lon) {
        console.log(lat, lon);
        mapboxgl.accessToken = 'pk.eyJ1IjoicmVhemlzIiwiYSI6ImNrM28xOHI1YTBncjczZnFlOHlkNmRqOHoifQ.M_yfg6-VTUMIQQjVaVmuFg';
        const map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/dark-v10', // hosted style id
        center: [lon, lat], // starting position
        zoom: 9 // starting zoom
        });
    }
}

export default MapService;