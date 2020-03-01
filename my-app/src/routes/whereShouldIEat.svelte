<script>
  import { restaurants } from '../store.js'
  let chosenRestaurant
  let nearbyRestaurants
  const getNewRestaurant = () => {
    const idx = Math.floor(Math.random(nearbyRestaurants.length))
    chosenRestaurant = nearbyRestaurants[idx]
  }
  const confirmSelection = () => {}
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