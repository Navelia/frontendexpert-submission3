import FavoriteRestaurantView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-view';
import FavoriteRestaurantPlacePresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-place-presenter';

describe('Showing all favorite restaurants', () => {
  let view;

  const renderTemplate = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been liked', () => {
    it('should ask for the favorite restaurants', () => {
      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      // eslint-disable-next-line no-new
      new FavoriteRestaurantPlacePresenter({
        view,
        favoriteRestaurants,
      });

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no restaurants have been liked', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item-not-found').length).toEqual(1);
        done();
      });

      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => []),
      };

      // eslint-disable-next-line no-new
      new FavoriteRestaurantPlacePresenter({
        view,
        favoriteRestaurants,
      });
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should show the restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(2);
        done();
      });

      const favoriteRestaurants = {
        getAllRestaurants: jest.fn().mockImplementation(() => [
          {
            id: 11,
            name: 'A',
            rating: 3,
            description: 'Sebuah restaurant A',
          },
          {
            id: 22,
            name: 'B',
            rating: 4,
            description: 'Sebuah film B',
          },
        ]),
      };

      // eslint-disable-next-line no-new
      new FavoriteRestaurantPlacePresenter({
        view,
        favoriteRestaurants,
      });
    });
  });
});
