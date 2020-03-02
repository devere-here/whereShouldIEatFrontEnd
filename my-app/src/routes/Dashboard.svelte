<script>
  import { onMount } from "svelte"
  import { goto } from '@sapper/app';
  import { restaurants } from '../store.js';
  import WhereShouldIEat from './whereShouldIEat.svelte'
  import axios from "axios"
  let radius = 5
  let nearbyRestaurants

  const success = async (pos) => {
    const { latitude, longitude } = pos.coords
    const places = await axios.post('http://localhost:80/places/placesNearby', {
      radius,
      latitude,
      longitude
    })

    nearbyRestaurants = places.data
    restaurants.update((value) => places.data)
  }

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  onMount(async () => {
    navigator.geolocation.getCurrentPosition(success, error)
  })
</script>

<main>
  <div>
    <span on:click={() => goto('whereShouldIEat')}>
      Where Should I Eat?
    </span>
  </div>
  <div>
    <span on:click={() => goto('history')}>
      History
    </span>
  </div>
  <div>
    <span on:click={() => goto('settings')}>
      Settings
    </span>
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
