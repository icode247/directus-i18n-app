<script>
  import { goto } from '$app/navigation';
  export let data;
  $: ({ article, languages, languageCode } = data);

  let selectedLanguageCode = languageCode;

  function handleLanguageChange(event) {
    const newLanguageCode = event.target.value;
    selectedLanguageCode = newLanguageCode; 
    goto(`?lang=${newLanguageCode}`, { replaceState: true });
  }
</script>

{#if article}
  <h1>{article.translations[0].title}</h1>
  {@html article.translations[0].body}
  <select value={selectedLanguageCode} on:change={handleLanguageChange}>
    {#each languages as language}
      <option value={language.code}>{language.name}</option>
    {/each}
  </select>
{:else}
  <p>News not found.</p>
{/if}