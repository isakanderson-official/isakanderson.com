const skills = [
	{ name: 'TailwindCSS', progress: 80 },
	{ name: 'Next.JS', progress: 100 },
	{ name: 'Python', progress: 40 },
	{ name: 'Svelte', progress: 20 },
	{ name: 'Linux', progress: 30 },
	{ name: 'DaisyUI', progress: 30 },
	{ name: 'Javascript', progress: 98 },
	{ name: 'ChakraUI', progress: 100 },
	{ name: 'Stripe', progress: 100 },
	{ name: 'PostgreSQL', progress: 90 },
	{ name: 'Supabase', progress: 30 },
	{ name: 'MongoDB', progress: 80 },
	{ name: 'Typescript', progress: 40 }
].sort((a, b) => b.progress - a.progress);

const skillNames = {
	TAILWIND: 'TailwindCSS',
	NEXT: 'Next.JS',
	PYTHON: 'Python',
	SVELTE: 'Svelte',
	LINUX: 'Linux',
	DAISY: 'DaisyUI',
	JAVASCRIPT: 'Javascript',
	CHAKRA: 'ChakraUI'
};

export default skills;
// Define a type for the skill names
type SkillName = (typeof skillNames)[keyof typeof skillNames];
// Define the Project type
type Project = {
	name: string;
	progress: number;
	description: string;
	skills?: SkillName[];
	href?: string;
};

export const projects: Project[] = [
	{ name: 'AppVerify', progress: 50, description: 'A simple API to detect disposable emails.' },
	{ name: 'PrtyTime', progress: 70, description: 'Party invites made easy. Create connections.' },
	{
		name: 'This website',
		progress: 60,
		description: 'My personal portfolio website.'
	},
	{
		name: 'SvelteKit Starter',
		progress: 100,
		description: 'Skip to building your SvelteKit app with DaisyUI.',
		href: 'https://github.com/isakanderson-official?tab=repositories'
	},
	{
		name: 'Storybook Creator',
		progress: 90,
		description: 'Kids create online books using curated assets.'
	},
	{
		name: 'Admin Dashboard',
		progress: 100,
		description: 'Enterprise level dashboard for managing users and data.',
		skills: [skillNames.TAILWIND, skillNames.NEXT]
	},
	{
		name: 'LinkTree Clone',
		progress: 100,
		description: 'Made my own version of the link tree profile site.',
		skills: ['TailwindCSS', 'Next.JS']
	}
].sort((a, b) => b.progress - a.progress);
