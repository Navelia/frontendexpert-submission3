import API_ENDPOINT from '../globals/api-endpoint';

class TheRestaurantDbSource {
  static async listOfRestaurant() {
    const response = await fetch(API_ENDPOINT.HOME);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailOfRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }
}

export default TheRestaurantDbSource;
