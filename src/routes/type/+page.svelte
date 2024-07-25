<script>
	import { marked } from 'marked';
	const mdContent = `
# Hello!

Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis cumque vero ducimus deserunt nostrum optio fugit possimus, neque molestiae eum?

## What's up?
    `;
	const markdownContent = marked(mdContent);
</script>

<article class="prose p-4">
	{@html markdownContent}
</article>
