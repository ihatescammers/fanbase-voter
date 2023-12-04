<script>
    import { onMount } from 'svelte';
    import Lenis from '@studio-freight/lenis';

    export let data;

    onMount(() => {
        const lenis = new Lenis({});
        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        return () => {
            lenis.destroy();
        }
    })
</script>

<div class="w-full h-full flex flex-col gap-3 p-3">
    <div class="w-full flex-shrink-0 flex flex-col p-3 h-1/3 items-center justify-center text-center">
        <h1 class="text-3xl lg:text-6xl playfair italic">The Award Categories</h1>
        <h2 class="text-lg lg:text-xl pt-3 playfair italic">Vote for your favourite fanbases!</h2>
    </div>
    {#each data.categories as category}
    <a href="/categories/{category}" class="w-full flex-shrink-0 flex flex-col items-center justify-center p-3 h-1/2 translucent-background rounded-lg">
        <h1 class="text-xl lg:text-3xl playfair italic">{category}</h1>
    </a>
    {/each}
    <div class="h-px flex-shrink-0"></div>
</div>