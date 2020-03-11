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
  import { login, signup } from '../apiClient.js'
  let version = 'login'
  let username = ''
  let password = ''
  let error = ''

  const handleClick = async () => {
    const action = version === 'login' ? login : signup
    const user = await action({
      username,
      password
    })

    if (user.success) {
      Cookies.set('whereShouldIEat', user.userId)
      goto('/Dashboard')
    } else if (user.error) {
      error = user.error
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