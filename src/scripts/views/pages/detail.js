import UrlParser from '../../routes/url-parser';
import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant-detail"></div>
      <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await TheRestaurantDbSource.detailOfRestaurant(url.id);
    const restaurantContainer = document.querySelector('#restaurant');
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.remove();
    }

    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant.restaurant);
    console.log(restaurant.restaurant.id);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        description: restaurant.restaurant.description,
        city: restaurant.restaurant.city,
        pictureId: restaurant.restaurant.pictureId,
        rating: restaurant.restaurant.rating,
      },
    });
  },
};

export default Detail;
