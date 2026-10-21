<script lang="ts">
	import BookCover from '#lib/components/BookCover.svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Stars from '#lib/components/Stars.svelte';
	import { currentlyReading, finishedBooks, type Book } from '#lib/books.ts';
	import { formatMonth } from '#lib/utils.ts';

	const reading = currentlyReading();
	const finished = finishedBooks();
</script>

<Seo title="Books" description="Books I've read, with ratings." />

<section class="flex flex-col gap-4">
	<h1 class="text-5xl leading-tight font-semibold tracking-[-0.02em]">Books</h1>
	<p>Everything I've read lately, newest first. {finished.length} so far.</p>
</section>

{#snippet row(book: Book)}
	<li class="flex gap-4">
		<BookCover {book} />
		<div class="flex min-w-0 flex-1 flex-col gap-0.5">
			<span>
				{#if book.link}<a href={book.link}>{book.title}</a>{:else}{book.title}{/if}
				<span class="text-muted-foreground">by {book.author}</span>
			</span>
			{#if book.note}<span class="text-[17px]">{book.note}</span>{/if}
			<span class="meta flex flex-wrap gap-x-3">
				{#if book.rating}<Stars rating={book.rating} />{/if}
				{#if book.dateRead}<span>read {formatMonth(book.dateRead)}</span>{/if}
			</span>
		</div>
	</li>
{/snippet}

{#if reading.length}
	<section class="flex flex-col gap-4">
		<h2 class="label">Currently reading</h2>
		<ul class="flex flex-col gap-5">
			{#each reading as book, i (i)}{@render row(book)}{/each}
		</ul>
	</section>
{/if}

<section class="flex flex-col gap-4">
	<h2 class="label">Read</h2>
	<ul class="flex flex-col gap-5">
		{#each finished as book, i (i)}{@render row(book)}{/each}
	</ul>
</section>

<p class="meta">
	Some links may be affiliate links. Buying through them supports the site at no extra cost to you.
</p>
