import { createMapPage } from './createMapPage';
import { mount } from 'redom';
import { getBanks } from '../../api/getRequest';
import ymaps from 'ymaps';
import { deleteLoader } from '../../components/loader';

export class MapPage {
  points;
  YMaps;
  myMap;

  constructor() {
    this.start();
  }

  async fetchData() {
    this.points = await getBanks();
  }

  start() {
    try {
      this.fetchData();
      ymaps
        .load(
          'https://api-maps.yandex.ru/2.1/?apikey=a23405dc-8e72-4364-90c8-7a74b849d680&lang=ru_RU',
        )
        .then((res) => {
          this.YMaps = res;

          res.geolocation
            .get()
            .then(function (result) {
              return result.geoObjects.position;
            })
            .then((coord) => {
              this.initMap(coord);
            });
        })
        .then(() => {
          this.render();
        })
    }
    catch(err) {
      console.log(err.message)
    }
  }

  render() {
    const renderMap = createMapPage();
    mount(window.document.body, renderMap);
    deleteLoader();
  }

  initMap(coord) {
    this.myMap = new this.YMaps.Map(
      document.getElementsByClassName('map__container')[0],
      {
        center: coord,
        zoom: 9,
      },
    );

    for (let elem of this.points) {
      this.myMap.geoObjects.add(
        new this.YMaps.Placemark([elem.lat, elem.lon], {
          iconCaption: 'Coin',
        }),
      );
    }
  }
}
