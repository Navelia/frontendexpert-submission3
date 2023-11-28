const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');

  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item-not-found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item-not-found');

  I.amOnPage('/');

  I.waitForElement('.restaurant-item a', 5);
  I.seeElement('.restaurant-item a');
  const firstRestaurant = locate('.restaurant-item a .restaurant-name').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const likedRestaurantName = await I.grabTextFrom('.restaurant-name');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item-not-found');

  I.amOnPage('/');

  I.waitForElement('.restaurant-item a', 5);
  I.seeElement('.restaurant-item a');

  const names = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant-item a').at(i));

    I.waitForElement('#likeButton', 5);
    I.seeElement('#likeButton');
    I.click('#likeButton');

    // eslint-disable-next-line no-await-in-loop
    names.push(await I.grabTextFrom('.restaurant-name'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(names.length, visibleLikedRestaurants);

  const searchQuery = names[1].substring(1, 3);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const matchingRestaurants = names.filter((name) => name.indexOf(searchQuery) !== -1);
  const visibleSearchedLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(matchingRestaurants.length, visibleSearchedLikedRestaurants);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < matchingRestaurants.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const visibleName = await I.grabTextFrom(locate('.restaurant-name').at(i + 1));
    assert.strictEqual(matchingRestaurants[i], visibleName);
  }
});
