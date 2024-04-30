import { readItem, readItems } from "@directus/sdk";
import getDirectusInstance from "$lib/directus";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params, url }) {
  const directus = getDirectusInstance(fetch);

  const id = params.id;
  const languageCode = url.searchParams.get("lang") || "en-US";
  try {
    const [newsData, languagesData] = await Promise.all([
      directus.request(
        readItem("news", id, {
          deep: {
            translations: {
              _filter: {
                _and: [
                  { languages_code: { _eq: languageCode } },
                ],
              },
            },
          },
          fields: ["*", { "*": ["*"] }],
        })
      ),
      directus.request(readItems("languages")),
    ]);

    return {
      article: newsData ? newsData : null,
      languages: languagesData,
      languageCode,
    };
  } catch (err) {
    error(404, "Post not found");
  }
}
