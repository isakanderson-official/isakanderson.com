<script>
	import NiceFade from '../components/NiceFade.svelte';
	import SkillsSection from '../components/SkillsSection.svelte';
	import skills from '../lib/constants';
	import { projects } from '../lib/constants';
</script>

<div class="bg-base-200">
	<div class="hero min-h-screen">
		<NiceFade>
			<div class="hero-content text-center">
				<div class="max-w-lg">
					<span class="text-5xl">👋</span>
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
	<NiceFade>
		<SkillsSection items={skills} title="Skills" />
	</NiceFade>
	<NiceFade>
		<SkillsSection items={projects} title="Projects" />
	</NiceFade>
	<div class="h-96 w-full" />
</div>
