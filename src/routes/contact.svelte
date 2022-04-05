<script>
  import { goto } from '$app/navigation'

  import Button from '$lib/components/Button/index.svelte'
  import Form from '$lib/components/Form/index.svelte'
  
  
  import { contact, profile } from '$lib/presets'
  import { number, user, scroll } from '$lib/stores'
  import { fade } from 'svelte/transition'
  $scroll = false
  
  import zaagel from 'zaagel'
  zaagel.configure(profile);

  function send(e) {
    $user = e.detail
    $number = 5
    goto('/thankyou/')

    let message = {
      to: profile.siteEmail,
      subject: `New Message Received from ${e.detail.name}`,
      template: 'message-received',
      body: e.detail,
      replyTo: e.detail.email,
    }

    zaagel.mail(message)

    let confirmation = {
      to: e.detail.email,
      subject: `Message sent to ${profile.siteOwner}`,
      template: 'message-sent',
      body: e.detail,
      replyTo: profile.siteEmail,
    }

    zaagel.mail(confirmation)
  }
</script>

{#if $number === 4}
  <div
    class="p-4 max-w-5xl mx-auto pt-20 md:mt-0"
    transition:fade={{ duration: 500 }}
  >
    <div class="mt-16 md:mt-4 -ml-[10%] hidden md:block">
      <a href="tel:{profile.phone}" class="inline-block">
        <Button
          label="call"
          className="mx-0 transform -rotate-90 origin-bottom-right"
        />
      </a>
      <a href="mailto:{profile.email}" class="inline-block">
        <Button label="Email" className="mx-0" />
      </a>
    </div>
    <div class="md:hidden text-center w-full">
      <a href="tel:{profile.phone}" class="">
        <Button label="call" className="mx-auto mb-8" />
      </a>
      <h1>OR</h1>
    </div>
    <Form
      {...contact}
      on:submit={send}
      className="max-w-[90%] md:max-w-[75%] mx-auto"
    />
  </div>
{/if}
