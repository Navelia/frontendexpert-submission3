import {
  // eslint-disable-next-line no-unused-vars
  beforeEach, describe, expect, it, jest,
} from '@jest/globals';
// import { spyOn } from 'jest-mock';
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-view';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);

    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('restaurant a');

      expect(presenter.latestQuery).toEqual('restaurant a');
    });

    it('should ask the model to search for liked restaurants', () => {
      favoriteRestaurants.searchRestaurants.mockImplementation(() => []);

      searchRestaurants('restaurant a');

      expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('restaurant a');
    });

    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          const restaurantNames = document.querySelectorAll('.restaurant-name');
          expect(restaurantNames.item(0).textContent).toEqual('restaurant abc');
          expect(restaurantNames.item(1).textContent).toEqual('restaurant abcd');
          expect(restaurantNames.item(2).textContent).toEqual('restaurant abcde');

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [
            { id: 111, name: 'restaurant abc' },
            { id: 222, name: 'restaurant abcd' },
            { id: 333, name: 'restaurant abcde' },
          ];
        }

        return [];
      });

      searchRestaurants('restaurant a');
    });

    it('should show - when the restaurant returned does not contain a name', (done) => {
      document.getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          const restaurantNames = document.querySelectorAll('.restaurant-name');
          expect(restaurantNames.item(0).textContent)
            .toEqual('-');

          done();
        });

      favoriteRestaurants.searchRestaurants.mockImplementation((query) => {
        if (query === 'restaurant a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchRestaurants('restaurant a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchRestaurants('    ');
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item-not-found').length).toEqual(1);

          done();
        });

      // eslint-disable-next-line no-unused-vars
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);

      searchRestaurants('restaurant a');
    });

    it('should not show any restaurant', (done) => {
      document
        .getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item').length).toEqual(1);

          done();
        });
      // eslint-disable-next-line no-unused-vars
      favoriteRestaurants.searchRestaurants.mockImplementation((query) => []);

      searchRestaurants('restaurant a');
    });
  });
});
