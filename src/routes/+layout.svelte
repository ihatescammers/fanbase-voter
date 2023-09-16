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

    export let data;
</script>

<!-- {#key data.url} -->
<main class="app-container">
    <Navrail />

    <section class="route-container" in:fade={{y: -10, duration: 100, delay: 100}} out:fade={{y: 10, duration: 100}}>
        <slot />
    </section>
</main>
<!-- {/key} -->

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