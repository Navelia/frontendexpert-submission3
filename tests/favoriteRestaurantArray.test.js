import { itActsAsFavoriteRestaurantModel } from './contracts/favoriteRestaurantContract';

let favoriteRestaurants = [];

const FavoriteRestaurantArray = {
  getRestaurant(id) {
    if (!id) {
      return;
    }

    // eslint-disable-next-line eqeqeq
    return favoriteRestaurants.find((Restaurant) => Restaurant.id == id);
  },

  getAllRestaurants() {
    return favoriteRestaurants;
  },

  putRestaurant(Restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!Restaurant.hasOwnProperty('id')) {
      return;
    }

    if (this.getRestaurant(Restaurant.id)) {
      return;
    }

    favoriteRestaurants.push(Restaurant);
  },

  deleteRestaurant(id) {
    // eslint-disable-next-line eqeqeq
    favoriteRestaurants = favoriteRestaurants.filter((Restaurant) => Restaurant.id != id);
  },

  searchRestaurants(query) {
    return this.getAllRestaurants()
      .filter((restaurant) => {
        const loweredCaseRestaurantName = (restaurant.name || '-').toLowerCase();
        const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');

        const loweredCaseQuery = query.toLowerCase();
        const jammedQuery = loweredCaseQuery.replace(/\s/g, '');

        // eslint-disable-next-line eqeqeq
        return jammedRestaurantName.indexOf(jammedQuery) != -1;
      });
  },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteRestaurants = [];
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});
