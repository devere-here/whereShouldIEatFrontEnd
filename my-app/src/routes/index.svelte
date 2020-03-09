<script context="module">
  import Cookies from 'js-cookie'
	export async function preload() {
		if (Cookies.get('whereShouldIEat')) {
			return this.redirect(302, '/Dashboard');
		}
  }
</script>

<script>
  import axios from 'axios'
  import { goto } from '@sapper/app';
  let version = 'login'
  let username = ''
  let password = ''
  let error = ''

  const handleClick = async () => {
    let response
    if (version === 'login') {
      response = await axios.post('http://localhost:80/user/login', {
        username,
        password
      })
    } else {
      response = await axios.post('http://localhost:80/user/signup', {
        username,
        password
      })
		}
    if (response.data.success) {
      Cookies.set('whereShouldIEast', response.data.token)
      goto('/Dashboard')
    } else if (response.data.error) {
      error = response.data.error
    }
  }

  const changeVersion = () => {
    if (version === 'login') version = 'signup'
    else version = 'login'
  }
</script>

<main>
	<div>
    <h3>{version}</h3>
    <input
      name="username"
      placeholder="username"
      bind:value={username}
    />
    <input
      name="password"
      placeholder="password"
      bind:value={password}
    />
    <button on:click={handleClick}>
      {version === 'login' ? "Log In" : "Sign Up"}
    </button>
    <button on:click={() => changeVersion()}>
      Don't have an account. {version === 'login' ? "Sign In" : "Log Up"} here
    </button>
    {#if error}
      <h1>{error}</h1>
    {/if}
	</div>
</main>