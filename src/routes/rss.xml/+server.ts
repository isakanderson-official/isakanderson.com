import { getPosts } from '#lib/content.ts';
import { site } from '#lib/site.ts';

export const prerender = true;

const escape = (value: string) =>
	value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
	const items = getPosts()
		.map((post) => {
			const url = `${site.url}/writing/${post.slug}`;
			return `
		<item>
			<title>${escape(post.title)}</title>
			<link>${url}</link>
			<guid>${url}</guid>
			<pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
			${post.description ? `<description>${escape(post.description)}</description>` : ''}
		</item>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escape(site.name)}</title>
		<link>${site.url}</link>
		<description>${escape(site.description)}</description>
		<language>en-us</language>
		<atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />${items}
	</channel>
</rss>
`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
	});
}
