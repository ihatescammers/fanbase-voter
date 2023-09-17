<script>
    import '@material/web/iconbutton/icon-button';
    import '@material/web/button/text-button';
    import '@material/web/icon/icon';
    import '@material/web/button/outlined-button';
    // import '@material/web/textfield/outlined-text-field.js';
    import '../css/app.scss';
    import '../css/theme.css';
   
    import Navrail from './components/navrail.svelte';

    import { fade } from 'svelte/transition';

    // export let data;
</script>

<main class="app-container">
    <Navrail />
    
    <!-- {#key data.url} -->
    <section class="route-container" in:fade={{duration: 100, delay: 100}} out:fade={{duration: 100}}>
        <slot />
    </section>
    <!-- {/key} -->
</main>

<style lang="scss">
    main.app-container {
        display: flex;
        width: 100%;
        height: 100%;

        .route-container {
            flex: auto;
        }
    }
</style>