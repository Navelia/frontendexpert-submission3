import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
        <h1 class="content-title">Explore Restaurant</h1>
        <div id="list-restaurant">
        </div>
      `;
  },

  async afterRender() {
    const restaurants = await TheRestaurantDbSource.listOfRestaurant();
    const restaurantContainer = document.querySelector('#list-restaurant');
    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
