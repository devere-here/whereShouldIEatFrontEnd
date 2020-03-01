<script>
  import { onMount } from "svelte"
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

    nearbyRestaurants = places
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
    <a href='whereShouldIEat'>
      Where Should I Eat?
    </a>
  </div>
  <div>
    <a href='history'>
      History
    </a>
  </div>
  <div>
    <a href='settings'>
      Settings
    </a>
  </div>
  <WhereShouldIEat />
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
