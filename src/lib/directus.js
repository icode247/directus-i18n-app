import { createDirectus, rest } from '@directus/sdk';
import { PUBLIC_DIRECTUS_API_URL } from '$env/static/public';

function getDirectusInstance(fetch) {
  	const options = fetch ? { globals: { fetch } } : {};
	const directus = createDirectus(PUBLIC_DIRECTUS_API_URL).with(rest());
	return directus;
}

export default getDirectusInstance;