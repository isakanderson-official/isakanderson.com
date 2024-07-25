<script lang="ts">
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
						<a href="#projects">
							<button class="btn btn-primary">Projects</button>
						</a>
						<a href="#skills">
							<button class="btn btn-secondary ml-2">Skills</button>
						</a>
					</NiceFade>
				</div>
			</div>
		</NiceFade>
	</div>
	<div id="skills">
		<NiceFade>
			<SkillsSection items={skills} title="Skills" />
		</NiceFade>
	</div>
	<div id="projects" class="py-20">
		<NiceFade>
			<SkillsSection items={projects} title="Projects" />
		</NiceFade>
	</div>
</div>
