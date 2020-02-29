<script>
  import { onMount } from "svelte"
  import { writable } from "svelte/store"
  import axios from "axios"
  let radius = 5
  let nearbyRestaurants = []
  const restaurants = writable([])

  const success = async (pos) => {
    console.log('in success')
    const { latitude, longitude } = pos.coords

    const places = await axios.post('http://localhost:80/places/placesNearby', {
      radius,
      latitude,
      longitude
    })

    // restaurants.set(places)

    // restaurants.subscribe(value => {
    //   console.log('restaurants are', value)
    // })

    nearbyRestaurants = places

    console.log('nearbyRestaurants are', nearbyRestaurants)


  }

  onMount(async () => {
    navigator.geolocation.getCurrentPosition(success)
  })
</script>

<main>
	<div>
    Where Should I Eat?
	</div>
  <div>
    History
	</div>
  <div>
    Settings
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
