<script>
  import { fade } from 'svelte/transition'
  import { scroll, number } from '$lib/stores.js'
  import Carrousel from '$lib/components/Carrousel/index.svelte'
  import Thumbnail from '$lib/components/Thumbnail/index.svelte'

  import { getProjects } from '$lib/gql'
  let projects
  getProjects('MusicProduction')
    .then(data => {
      projects = data.map(project => {
        return {
          thumbnail: {
            component: Thumbnail,
            data: {
              alt: `${project.title} | Ahmed Mitry | Music Production`,
              src: project.thumbnail ? project.thumbnail.url : '',
            },
          },
          title: project.title,
          image: project.clientLogo ? project.clientLogo.url : null,
          videoUrl: project.videoUrl,
        }
      })
    })
    .catch(e => console.error(e))
</script>

{#if $number === 2 && !!projects}
  <div
    in:fade={{ duration: 500, delay: 300 }}
    out:fade={{ duration: 250 }}
  >
    <Carrousel
      items={projects}
      on:complete={() => {
        $scroll = true
      }}
      on:finish={() => {
        $number++
      }}
      on:rewatch={() => {
        $scroll = false
      }}
    />
  </div>
{/if}
