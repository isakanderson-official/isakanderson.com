<script lang="ts">
	import type { ProjectStatus } from '#lib/content.ts';
	import { cn } from '#lib/utils.ts';

	let { status }: { status: ProjectStatus } = $props();
</script>

<span class={cn('meta whitespace-nowrap', status === 'live' && 'text-live')}>[{status}]</span>
