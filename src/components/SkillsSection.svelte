<script>
	import SkillCard from './SkillCard.svelte';

	const skills = [
		{ name: 'TailwindCSS', level: 'Advanced', progress: 80 },
		{ name: 'Next.JS', level: 'Advanced', progress: 100 },
		{ name: 'Python', level: 'Intermediate', progress: 40 },
		{ name: 'Svelte', level: 'Beginner', progress: 10 },
		{ name: 'Linux', level: 'Intro', progress: 60 },
		{ name: 'Svelte', level: 'Beginner', progress: 10 }
	].sort((a, b) => b.progress - a.progress);
</script>

<section class="mx-auto flex flex-col items-center p-4">
	<h2 class="mb-8 w-full max-w-4xl text-center text-4xl font-bold sm:text-left">Skills</h2>
	<div
		class="grid min-w-72 max-w-4xl grid-cols-1 gap-4 sm:w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
	>
		{#each skills as skill}
			<SkillCard {skill} />
		{/each}
	</div>
</section>
