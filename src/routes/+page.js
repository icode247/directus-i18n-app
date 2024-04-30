/** @type {import('./$types').PageLoad} */
import getDirectusInstance from "$lib/directus";
import { readItems } from "@directus/sdk";

// @ts-ignore
export async function load({ fetch, url }) {
  const directus = getDirectusInstance(fetch);
  const defaultLanguageCode = 'en-US';
  const searchQuery = url.searchParams.get('q') || '';
  return {
    news: await directus.request(
      readItems("news", {
        search: searchQuery,
        deep: {
          translations: {
            _filter: {
              _and: [
                { languages_code: { _eq: defaultLanguageCode } },
              ],
            },
          },
        },
        fields: ["*", { translations: ["*"] }],
      })
    ),
  };
}