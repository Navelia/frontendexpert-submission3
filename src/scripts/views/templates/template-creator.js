/* eslint-disable no-unused-vars */
import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const START = 10;
const NUMBER_OF_IMAGES = 100;

const createRestaurantDetailTemplate = (restaurant) => {
  const {
    name, description, city, address, pictureId, categories, menus, rating, customerReviews,
  } = restaurant;
  let detailHtml = `<h2 class="restaurant-name">${name}</h2>
                        <h2 class="restaurant-rating">⭐${rating}</h2>
                        <img class="lazyload restaurant-photo" data-src="${CONFIG.BASE_IMAGE_URL + pictureId}" alt="${name}" crossorigin="anonymous" />
                        <div class="restaurant-info">
                        <h3>Description</h3>
                        <p>${description}</p>
                        <h3>City</h3>
                        <p>${city}</p>
                        <h3>Address</h3>
                        <p>${address}</p>
                        </div>`;
  const categoriesData = categories.map((category) => `<li> ${category.name}</li>`).join('');
  const foodsData = menus.foods.map((food) => `<li> ${food.name}</li>`).join('');
  const drinksData = menus.drinks.map((drink) => `<li> ${drink.name}</li>`).join('');
  const reviewsData = customerReviews.map((custReview) => `<div class="review-card">
                                                            <h4>${custReview.name}</h4>
                                                            <p>${custReview.date}</p>
                                                            <p>${custReview.review}</p>
                                                            </div>`).join('');
  detailHtml += `<div class="restaurant-categories">
                    <h3>Category:</h3>
                    <ol>${categoriesData}</ol></div>
                    <div class="restaurant-menus">
                    <h3>Menus:</h3>
                    <h4>- Foods:</h4>
                    <ol>${foodsData}</ol>
                    <h4>- Drinks:</h4>
                    <ol>${drinksData}</ol>
                    </div>
                    <div class="restaurant-reviews">
                    <h3>Customer Review</h3>
                    ${reviewsData}
                    </div>`;
  return detailHtml;
};

const createRestaurantItemTemplate = (restaurant) => `
  <article class="restaurant-item">
    <a href="#/detail/${restaurant.id}">
    <img class="lazyload restaurant-photo" data-src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name || '-'}" crossorigin="anonymous" />
    <h3 class="restaurant-name">${restaurant.name || '-'}</h3>
    <p class="restaurant-description">${restaurant.description || '-'}</p>
    <p class="restaurant-city">City: ${restaurant.city || '-'}</p>
    <p class="restaurant-rating">Rating: ${restaurant.rating || '-'}</p>    
    </a>
  </article>
`;

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
