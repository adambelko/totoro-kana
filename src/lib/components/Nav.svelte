<nav class="navbar">
	<div class="container">
		<a class="navbar-brand" href="/">Learn KANA</a>
		<ul class="navbar-nav">
			<li class="nav-link">ABOUT</li>
			<li class="nav-link">OUR METHOD</li>
		</ul>
	</div>
</nav>

<style>
	.navbar {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--nav-bg-color);
		flex-wrap: nowrap;
		width: 100vw;
		height: 125px;
	}

	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1120px;
		width: 100%;
	}

	.navbar-brand {
		font-size: 1.3em;
		font-weight: bold;
		padding-right: 30px;
	}

	.navbar-nav {
		display: flex;
		gap: 2.2em;
		font-size: 0.8em;
		font-weight: 600;
	}
</style>
