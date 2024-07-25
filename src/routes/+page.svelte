<script>
	import FadeSection from '../components/FadeSection.svelte';
	import SkillsSection from '../components/SkillsSection.svelte';
</script>

<div class="hero min-h-screen bg-base-200">
	<FadeSection>
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">Isak's Homepage!</h1>
				<p class="py-6">
					Visit <a href="https://kit.svelte.dev" class="text-blue-500 underline">kit.svelte.dev</a> to
					read the documentation.
				</p>
				<button class="btn btn-primary">Get Started</button>
				<button class="btn btn-secondary ml-2">Learn More</button>
				<button class="btn btn-outline btn-primary">hello</button>
			</div>
		</div>
	</FadeSection>
	<div>
		<!-- <SkillsSection /> -->
	</div>
</div>
