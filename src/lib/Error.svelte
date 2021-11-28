<script>
	export let error
</script>

{#if  error}
	<strong  class="text-red-600">{error.message}</strong>
{/if}