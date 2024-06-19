<script>
	export let data
	$: ({ countries } = data)
</script>

<ul>
	{#each countries as country}
		<li>{country.name}</li>
	{/each}
</ul>
