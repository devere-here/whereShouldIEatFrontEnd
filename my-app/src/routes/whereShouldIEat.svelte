<script context="module">
  import Cookies from 'js-cookie'
	export async function preload() {
		if (!Cookies.get('whereShouldIEat')) {
			return this.redirect(302, '/');
		}
  }
</script>

<script>
  import { restaurants, restaurantHistory } from '../store.js'
  import axios from "axios"

  let chosenRestaurant
  let nearbyRestaurants
  const getNewRestaurant = () => {
    const idx = Math.floor(Math.random(nearbyRestaurants.length))
    chosenRestaurant = nearbyRestaurants[idx]
  }
  const confirmSelection = async () => {
    const newRestaurant = await axios.post('http://localhost:80/mongo/chosenMeal', {
      id: chosenRestaurant.id,
      name: chosenRestaurant.name,
    })

    restaurantHistory.update(history => [...history, newRestaurant])
  }
  const unsubscribe = restaurants.subscribe(value => {
    nearbyRestaurants = value
    const idx = Math.floor(Math.random(nearbyRestaurants.length))
    chosenRestaurant = nearbyRestaurants[idx]
  });
</script>

<div>
  <h1>You should eat here</h1>
  <h2>{chosenRestaurant && chosenRestaurant.name ? chosenRestaurant.name : 'Loading...'}</h2>
  <button on:click={() => confirmSelection()}>Confirm</button>
  <button on:click={() => getNewRestaurant()}>Try a different restaurant</button>
</div>