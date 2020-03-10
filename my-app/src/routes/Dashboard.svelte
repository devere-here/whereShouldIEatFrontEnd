<script context="module">
  import Cookies from 'js-cookie'
	export async function preload() {
		if (!Cookies.get('whereShouldIEat')) {
			return this.redirect(302, '/');
		}
  }
</script>

<script>
  import { onMount } from "svelte"
  import { goto } from '@sapper/app';
  import { restaurants, restaurantHistory, settings } from '../store.js'
  import WhereShouldIEat from './whereShouldIEat.svelte'
  import axios from "axios"
  let radius = 3000
  let nearbyRestaurants

  const success = async (pos) => {
    const { latitude, longitude } = pos.coords
    const places = await axios.post('http://localhost:80/places/placesNearby', {
      radius,
      latitude,
      longitude
    })

    nearbyRestaurants = places.data
    restaurants.update(() => places.data)
  }

  const getHistory = async (userId) => {
    const meals = await axios.get(`http://localhost:80/mongo/recentMeals?userId=${userId}`)
    restaurantHistory.update(() => meals.data)
  }

  const getSettings = async (userId) => {
    const settings = await axios.get(`http://localhost:80/mongo/settings?userId=${userId}`)
    if (settings.data.distance) {
      radius = settings.data.distance
    }
    settings.update((value) => {
      return { ...value, ...settings.data }
    })
  }

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`)
  }

  onMount(async () => {
    const userId = Cookies.get('whereShouldIEat')
    getSettings(userId)
    getHistory(userId)
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
