export const site = {
	name: 'Isak Anderson',
	domain: 'isakanderson.com',
	url: 'https://isakanderson.com',
	tagline: 'I make stuff.',
	description:
		'I build apps, read a lot of books, and write down what I learn, from camera gear to paying off debt.',
	github: 'https://github.com/isakanderson-official',
	/**
	 * Cloudflare Web Analytics token (Cloudflare dashboard → Analytics & Logs → Web Analytics).
	 * Leave empty to load no analytics. If you enable Web Analytics on the Pages project itself,
	 * Cloudflare injects the beacon for you and this can stay empty.
	 */
	cloudflareAnalyticsToken: '',
	/** Base URL of the public R2 bucket that holds demo videos, without a trailing slash. */
	mediaUrl: 'https://media.isakanderson.com'
};

export const nav = [
	{ href: '/projects', label: 'projects' },
	{ href: '/writing', label: 'writing' },
	{ href: '/courses', label: 'courses' },
	{ href: '/books', label: 'books' },
	{ href: '/about', label: 'about' }
];
