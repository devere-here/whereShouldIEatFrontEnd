<script context="module">
  import Cookies from 'js-cookie'
	export async function preload() {
		if (!Cookies.get('whereShouldIEat')) {
			return this.redirect(302, '/');
		}
  }
</script>

<script>
  import axios from "axios"
  import { onMount } from "svelte"
  import { restaurantHistory } from '../store.js'
  let restaurants

  const unsubscribe = restaurantHistory.subscribe(value => {
    restaurants = value
  });

  onMount(async () => {
    if (!restaurants) {
      const meals = await axios.get('http://localhost:80/mongo/recentMeals')
      restaurantHistory.update(() => meals.data)
    }
  })
</script>

<div>
  {#if restaurants && restaurants.length === 0}
    <h1>No Restaurants</h1>
  {:else if restaurants}
    {#each restaurants as restaurant}
      <div>
        <h2>{restaurant.name}</h2>
      </div>
    {/each}
  {:else}
    <h1>Loading History...</h1>
  {/if}
</div>
