export const site = {
	name: 'Isak Anderson',
	domain: 'isakanderson.com',
	url: 'https://isakanderson.com',
	tagline: 'I make stuff.',
	description: 'I build apps, read a lot of books, and write down what I learn.',
	github: 'https://github.com/isakanderson-official',
	/**
	 * Cloudflare Web Analytics token (Cloudflare dashboard → Analytics & Logs → Web Analytics).
	 * Leave empty to load no analytics. If you enable Web Analytics on the Pages project itself,
	 * Cloudflare injects the beacon for you and this can stay empty.
	 */
	cloudflareAnalyticsToken: '',
	/** Base URL of the public R2 bucket that holds demo videos, without a trailing slash. */
	mediaUrl: 'https://media.isakanderson.com',
	/** Amazon Associates tracking ID (e.g. `yourid-20`), added to every book link. Leave empty for plain links. */
	amazonTag: 'isakanderso05-20'
};

export const nav = [
	{ href: '/projects', label: 'projects' },
	{ href: '/writing', label: 'writing' },
	{ href: '/courses', label: 'courses' },
	{ href: '/books', label: 'books' },
	{ href: '/about', label: 'about' }
];
