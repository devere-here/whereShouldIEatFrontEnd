<script>
  import { nearbyRestaurants } from './Dashboard.svelte'
  let restaurants
  let chosenRestaurant
  const getNewRestaurant = () => {
    const idx = Math.floor(Math.random(nearbyRestaurants.length))
    chosenRestaurant = nearbyRestaurants[idx]
  }
  const confirmSelection = () => {}

  nearbyRestaurants.subscribe(value => {
    restaurants = nearbyRestaurants
    const idx = Math.floor(Math.random(nearbyRestaurants.length))
    chosenRestaurant = nearbyRestaurants[idx]
  })


</script>

<div>
  <h1>You should eat here</h1>
  <h2>{chosenRestaurant.name}</h2>
  <button on:click={() => confirmSelection()}>Confirm</button>
  <button on:click={() => getNewRestaurant()}>Try a different restaurant</button>
</div>