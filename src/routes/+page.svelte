<script>
	import NiceFade from '../components/NiceFade.svelte';
	import SkillsSection from '../components/SkillsSection.svelte';
</script>

<div class="bg-base-200">
	<div class="hero min-h-screen">
		<NiceFade>
			<div class="hero-content text-center">
				<div class="max-w-lg">
					<h1 class="text-5xl font-bold">Isak Anderson</h1>
					<p class="py-6">Empowering Freedom through Innovative Applications</p>
					<NiceFade delay={1000}>
						<button class="btn btn-primary">Get Started</button>
						<button class="btn btn-secondary ml-2">Learn More</button>
					</NiceFade>
				</div>
			</div>
		</NiceFade>
	</div>
	<SkillsSection />
</div>
