<script>
    import '@material/web/iconbutton/icon-button';
    import '@material/web/button/text-button';
    import '@material/web/icon/icon';
    import '@material/web/button/outlined-button';
    import '@material/web/button/filled-button';
    import '@material/web/button/filled-tonal-button';
    import '@material/web/progress/circular-progress'
    // import '@material/web/textfield/outlined-text-field.js';
    import '../css/app.scss';
    import '../css/theme.css';

    export let data;
   
    import Navrail from './components/navrail.svelte';

    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';

    import { app } from '$lib/index.js';
    import { getAnalytics } from 'firebase/analytics';

    onMount(() => {
        const analytics = getAnalytics(app);
    })
</script>

<main class="app-container">
    <Navrail />
    
    {#key data.url}
    <section class="route-container" in:fade={{duration: 150, delay: 150}} out:fade={{duration: 150}}>
        <slot />
    </section>
    {/key  }
</main>

<style lang="scss">
    main.app-container {
        // display: flex;
        width: 100vw;
        height: 100vh;
        height: 100svh;

        .route-container {
            width: 100vw;
            height: 100vh;
            height: 100svh;
            display: flex;
            justify-content: stretch;
        }
    }
</style>