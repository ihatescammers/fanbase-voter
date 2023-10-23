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

    // export let data;
   
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

    onNavigate((navigation) => {
        if (!document.startViewTransition) {
            return new Promise((resolve) => {
                gsap.to('.route-container', {
                    opacity: 0,
                    duration: 0.125,
                    onComplete: async () => {
                        resolve();
                        await navigation.complete;
                    }
                })
            })
        }
        else {
            return new Promise((resolve) => {
                document.startViewTransition(async () => {
                    resolve();
                    await navigation.complete;
                })
            })
        }
    })

    afterNavigate((navigation) => {
        if (!document.startViewTransition) {
            gsap.to('.route-container', {
                opacity: 1,
                duration: 0.175
            })
        }
    }) 
</script>

<svelte:head>
    {@html webManifestLink} 
</svelte:head>

<Clouds />

<main class="app-container">
    <Navrail />
    
    <!-- {#key data.url}
    <section class="route-container" in:fade={{duration: 150, delay: 150}} out:fade={{duration: 150}}>
        <slot />
    </section>
    {/key} -->

    <section class="route-container">
        <slot />
    </section>
</main>

<style lang="scss">
    main.app-container {
        // display: flex;
        width: 100vw;
        height: 100vh;
        height: 100svh;
        background-size: 100% 100%;
        background-position: 0px 0px,0px 0px,0px 0px,0px 0px,0px 0px,0px 0px,0px 0px,0px 0px,0px 0px,0px 0px,0px 0px;
        // background-image: radial-gradient(18% 28% at 24% 50%, var(--md-sys-color-surface) 7%, var(--md-sys-color-on-surface) 100%),radial-gradient(18% 28% at 18% 71%, var(--md-sys-color-surface-container) 6%, var(--md-sys-color-on-surface) 100%),radial-gradient(70% 53% at 36% 76%, var(--md-sys-color-primary-container) 0%, var(--md-sys-color-on-surface) 100%),radial-gradient(42% 53% at 15% 94%, var(--md-sys-color-surface-container-lowest) 7%, var(--md-sys-color-on-surface) 100%),radial-gradient(42% 53% at 34% 72%, var(--md-sys-color-surface-container-lowes) 7%, var(--md-sys-color-on-surface) 100%),radial-gradient(18% 28% at 35% 87%, var(--md-sys-color-surface-container-lowes) 7%, var(--md-sys-color-on-surface) 100%),radial-gradient(31% 43% at 7% 98%, var(--md-sys-color-surface-container-lowes) 24%, var(--md-sys-color-on-surface) 100%),radial-gradient(21% 37% at 72% 23%, var(--md-sys-color-secondary-container) 24%, var(--md-sys-color-on-surface) 100%),radial-gradient(35% 56% at 91% 74%, var(--md-sys-color-tertiary) 9%, var(--md-sys-color-on-surface) 100%),radial-gradient(74% 86% at 67% 38%, var(--md-sys-color-secondary-container) 24%, var(--md-sys-color-on-surface) 100%),linear-gradient(125deg, var(--md-sys-color-error) 1%, var(--md-sys-color-tertiary) 100%);
        .route-container {
            width: 100vw;
            height: 100vh;
            height: 100svh;
            display: flex;
            justify-content: stretch;
        }
    }
</style>