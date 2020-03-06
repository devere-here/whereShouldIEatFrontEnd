<script context="module">
  import Cookies from 'js-cookie'
	export async function preload() {
		if (!Cookies.get('username')) {
			return this.redirect(302, '/');
		}
  }
</script>

<script>
  import { onMount } from "svelte";
  import axios from "axios";
  let radius = '5'
  let nearbyRestaurants = []

  navigator.geolocation.getCurrentPosition(success)

  const success = async (pos) => {
    const { latitude, longitude } = pos.coords

    const places = await axios.post('https://localhost:80/places/placesNearby', {
      radius,
      latitude,
      longitude
    })

    nearbyRestaurants = places
  }

  onMount(async () => {
    navigator.geolocation.getCurrentPosition(success)
  })
</script>

<main>
	<div>
    <h3>Nearby Restaurants</h3>
    {#each nearbyRestaurants as restaurant}
      <div>
        <p>{restaurant.name}</p>
      </div>
    {/each}
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
