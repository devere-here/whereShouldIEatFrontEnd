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
  import { goto } from '@sapper/app';
  import { settings } from '../store'

  let repeatRestaurants
  let distance
  const updateSettings = async () => {
    const userId = Cookies.get('whereShouldIEat')
    await axios.put('http://localhost:80/mongo/settings', {
      repeatRestaurants,
      distance,
      userId
    })

    settings.update(() => {
      repeatRestaurants,
      distance
    })
    goto('/Dashboard')
  }

  const unsubscribe = settings.subscribe((value = {}) => {
    repeatRestaurants = value.repeatRestaurants
    distance = value.distance || 3000
  });

</script>

<div>
  <h1>Settings</h1>
  <div>
    <h2>Distance</h2>
    <label for="distance">Miles: {distance * 0.0006213712}</label>
    <input
      type="range"
      id="distance"
      name="distance"
      min="500"
      max="10000"
      bind:value={distance}
    >
  </div>
  <div>
    <h2>Repeat Restaurants</h2>
    <h4>Do you want to see restaurants you've already eaten at?</h4>
    <select bind:value={repeatRestaurants}>
      <option value={true}>Yes</option>
      <option value={false}>No</option>
    </select>
  </div>
  <button on:click={updateSettings}>Submit</button>
</div>