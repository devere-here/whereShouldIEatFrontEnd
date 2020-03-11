<script context="module">
  import Cookies from 'js-cookie'
	export async function preload() {
		if (!Cookies.get('whereShouldIEat')) {
			return this.redirect(302, '/');
		}
  }
</script>

<script>
  import axios from 'axios'
  import { restaurants, restaurantHistory } from '../store.js'
  import { postMeal } from '../apiClient.js'

  let chosenRestaurant
  let nearbyRestaurants
  const getNewRestaurant = () => {
    const length = nearbyRestaurants.length
    const idx = Math.floor(Math.random() * length)
    chosenRestaurant = nearbyRestaurants[idx]
  }
  const confirmSelection = async () => {
    const userId = Cookies.get('whereShouldIEat')
    const restaurantObj = {
      id: chosenRestaurant.id,
      name: chosenRestaurant.name,
      userId
    }
    const newRestaurant = await postMeal(restaurantObj)

    restaurantHistory.update(history => [...history, newRestaurant])
  }
  const unsubscribe = restaurants.subscribe(value => {
    nearbyRestaurants = value
    const length = nearbyRestaurants.length
    const idx = Math.floor(Math.random() * length)
    chosenRestaurant = nearbyRestaurants[idx]
  });
</script>

<div>
  <h1>You should eat here</h1>
  <h2>{chosenRestaurant && chosenRestaurant.name ? chosenRestaurant.name : 'Loading...'}</h2>
  <button on:click={() => confirmSelection()}>Confirm</button>
  <button on:click={() => getNewRestaurant()}>Try a different restaurant</button>
</div>