<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  export let data;

  let searchQuery = $page.url.searchParams.get("q") || "";

  function handleSearchChange() {
    goto(`/?q=${searchQuery}`, { replaceState: true });
  }
</script>

<h1>Trending Today!</h1>
<div>
  <input type="text" bind:value={searchQuery} placeholder="Search News..." />
  <button on:click={handleSearchChange}>Search</button>
</div>
<ul>
  {#each data.news as article}
    <li>
      <div>
        <h2>
          <a href={`/${article.id}`}>
            {article.translations[0].title}
          </a>
        </h2>
        <p>By {article.author}</p>
      </div>
    </li>
  {/each}
</ul>
