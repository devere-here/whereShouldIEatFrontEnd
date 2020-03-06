<script>
  import axios from 'axios'
  import Cookies from 'js-cookie'
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
    if (response.success) {
      Cookies.set('username', username)
    } else if (response.error) {
      error = response.error
    }
  }

  const changeVersion = () => {
    if (version === 'login') version = 'signup'
    else version = 'login'
  }
  const onSubmit = () => {}
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
    <button on:click={handleClick}>Submit</button>
    <p on:click={() => changeVersion()}>
      Don't have an account. Sign in here
    </p>
    <button on:click={() => onSubmit()}>
      {version === 'login' ? "Log In" : "Sign Up"}
    </button>
    {#if error}
      <h1>error</h1>
    {/if}
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
