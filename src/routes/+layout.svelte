<script>
    import '@material/web/iconbutton/icon-button';
    import '@material/web/button/text-button';
    import '@material/web/icon/icon';
    import '@material/web/button/outlined-button';
    import '@material/web/button/filled-button';
    import '@material/web/button/filled-tonal-button';
    import '@material/web/progress/circular-progress';
    // import '@material/web/textfield/outlined-text-field.js';
    import '../css/app.scss';
    import '../css/theme.css';

    export let data;
   
    import Navrail from './components/navrail.svelte';

    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { beforeNavigate, afterNavigate, onNavigate } from '$app/navigation';

    import gsap from 'gsap';

    import { app } from '$lib/index.js';
    import { getAnalytics } from 'firebase/analytics';

    import { pwaInfo } from 'virtual:pwa-info'; 
    import Clouds from './components/clouds.svelte';
    $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : '' 

    onMount(() => {
        const analytics = getAnalytics(app);
    })

    // onNavigate((navigation) => {
    //     if (!document.startViewTransition) {
    //         return new Promise((resolve) => {
    //             gsap.to('.route-container', {
    //                 opacity: 0,
    //                 duration: 0.125,
    //                 onComplete: async () => {
    //                     resolve();
    //                     await navigation.complete;
    //                 }
    //             })
    //         })
    //     }
    //     else {
    //         return new Promise((resolve) => {
    //             document.startViewTransition(async () => {
    //                 resolve();
    //                 await navigation.complete;
    //             })
    //         })
    //     }
    // })

    // afterNavigate((navigation) => {
    //     if (!document.startViewTransition) {
    //         gsap.to('.route-container', {
    //             opacity: 1,
    //             duration: 0.175
    //         })
    //     }
    // }) 
</script>

<svelte:head>
    {@html webManifestLink} 
</svelte:head>

<!-- <Clouds /> -->

<main class="app-container">
    <Navrail />

    {#key data.url}
    <section in:fade={{duration: 250}} class="route-container">
        <slot />
    </section>
    {/key}
</main>

<style lang="scss">
    main.app-container {
        display: flex;
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
        .route-container {
            flex: auto;
            flex-shrink: 0;
            display: flex;
            justify-content: stretch;
        }

        @media (max-width: 560px) {
            flex-flow: column nowrap;
        }
    }
</style>