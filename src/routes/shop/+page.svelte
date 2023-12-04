<script>
    import { fade, fly } from "svelte/transition";
    import {enhance} from "$app/forms";
    import {user} from '$lib/auth.js';
    import { cubicOut } from "svelte/easing";

    let shopModalOpen = false;
    let shopSelectedVotes = 0;
    function openShopModal() {
        shopModalOpen = true;
    }
    function closeShopModal() {
        shopModalOpen = false;
    }
</script>

<div class="h-full w-full p-3">
    <div class="w-full h-full p-3 lg:p-9 flex flex-col gap-9 translucent-background rounded-lg">
        <h1 class="playfair text-6xl font-semibold text-center">The <span class="italic">Stan</span> Shop</h1>
        <div class="w-full h-px translucent-background"></div>
        <div class="w-full grid grid-cols-2 lg:grid-cols-2 gap-3 items-center">
            <div class="translucent-background rounded-xl min-h-[200px] p-3 gap-3 flex flex-col items-center">
                <h1 class="playfair text-2xl">Purchase <span class="italic font-semibold">3</span> Votes</h1>
                <div class="flex-auto"></div>
                <button on:click={() => {openShopModal(); shopSelectedVotes = 3}} class="w-full h-12 rounded-full border border-white flex items-center justify-center playfair">
                    Purchase votes
                </button>
            </div>
            <div class="translucent-background rounded-xl min-h-[200px] p-3 gap-3 flex flex-col items-center">
                <h1 class="playfair text-2xl">Purchase <span class="italic font-semibold">5</span> Votes</h1>
                <div class="flex-auto"></div>
                <button on:click={() => {openShopModal(); shopSelectedVotes = 5}} class="w-full h-12 rounded-full border border-white flex items-center justify-center playfair">
                    Purchase votes
                </button>
            </div>
            <div class="translucent-background rounded-xl min-h-[200px] p-3 gap-3 flex flex-col items-center">
                <h1 class="playfair text-2xl">Purchase <span class="italic font-semibold">10</span> Votes</h1>
                <div class="flex-auto"></div>
                <button on:click={() => {openShopModal(); shopSelectedVotes = 10}} class="w-full h-12 rounded-full border border-white flex items-center justify-center playfair">
                    Purchase votes
                </button>
            </div>
            <div class="translucent-background rounded-xl min-h-[200px] p-3 gap-3 flex flex-col items-center">
                <h1 class="playfair text-2xl">Purchase <span class="italic font-semibold">20</span> Votes</h1>
                <div class="flex-auto"></div>
                <button on:click={() => {openShopModal(); shopSelectedVotes = 20}} class="w-full h-12 rounded-full border border-white flex items-center justify-center playfair">
                    Purchase votes
                </button>
            </div>
        </div>
    </div>
</div>

{#if shopModalOpen === true}
    <div in:fade={{duration: 150}} out:fade={{duration: 150}} class="fixed top-0 left-0 z-30 w-full h-full backdrop-blur-lg" on:click={closeShopModal}></div>
    <div in:fly={{duration: 350, y: 10, ease: cubicOut}} out:fade={{duration: 150}} class="w-11/12 w-[75%] min-h-[450px] z-30 fixed top-1/2 left-1/2 text-center -translate-y-1/2 
    -translate-x-1/2 translucent-foreground text-black rounded-2xl p-6 flex flex-col gap-6 items-center">
        <h1 class="headline-large playfair">Purchase <i>votes</i></h1>
        <form class="flex flex-col gap-3 h-full flex-auto" action="?/purchaseVotes" method="post" use:enhance on:submit={() => {setTimeout(() => {closeShopModal(); location.reload()}, 1500)}}>
            <div class="flex items-center gap-3 w-full">
                <input class="w-full p-3 translucent-foreground rounded-2xl" type="hidden" name="votesAmount" value={shopSelectedVotes} />
            </div>
            <input type="hidden" name="uid" value={$user?.uid}>
            <input class="w-full p-3 translucent-foreground rounded-2xl" type="number" placeholder="Card Number" />
            <div class="flex items-center gap-3 w-full">
                <input class="w-full p-3 translucent-foreground rounded-2xl" type="number" placeholder="Expires..." />
                <input class="w-full p-3 translucent-foreground rounded-2xl" type="number" placeholder="CVC" />
            </div>
            <div class="flex-auto flex items-end justify-between">
                <div class="text-2xl font-semibold">
                    {shopSelectedVotes && shopSelectedVotes > 3 ? shopSelectedVotes : 3} votes
                </div>
                <div class="text-2xl font-semibold">
                    ${shopSelectedVotes && shopSelectedVotes > 3 ? shopSelectedVotes * 0.75 : 3 * 0.75}
                </div>
            </div>
            <button type="submit" class="w-full h-12 rounded-full border border-black flex items-center justify-center playfair">
                Checkout
            </button>
        </form>
    </div>
{/if}