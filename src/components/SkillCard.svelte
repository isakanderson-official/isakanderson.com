<script>
	/**
	 * @type {{ name: any; level: any; progress: any; }}
	 */
	export let skill;
	console.log('skill', skill);
</script>

<div class="card w-full bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title">{skill.name}</h2>
		<progress class="progress progress-primary w-full" value={skill.progress} max="100"></progress>
	</div>
</div>
