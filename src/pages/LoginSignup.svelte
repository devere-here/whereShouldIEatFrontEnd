<script>
import axios from 'axios'
  let version = 'login'
  let username = ''
  let password = ''

  const handleClick = () => {
    if (version === 'login') {
      axios.put('/signup', (req, res) => {
        console.log('in signup req, res', req, res)
      })
    } else {
      axios.put('/signup', (req, res) => {
        console.log('in signup req, res', req, res)
      })
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
    />
    <input
      name="password"
      placeholder="password"
    />
    <button on:click={handleClick}>Submit</button>
    <p on:click={() => changeVersion()}>Don't have an account. Sign in here</p>
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
