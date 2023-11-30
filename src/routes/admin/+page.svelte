<script>
    import { fade } from 'svelte/transition';
    import { enhance } from '$app/forms';

    export let data;
    export let form;

    let adding = false,
    confirmAddition = false,
    confirmDeletion = false, deleteArtistIndex = -1;
</script>

<div class="h-full w-full p-3">
    <div class="w-full p-3 lg:p-9 flex flex-col gap-9 translucent-background rounded-lg">
        <h1 class="playfair text-6xl font-semibold text-center">The <span class="italic">Admin Page</span></h1>
        <div class="w-full h-px translucent-background"></div>
        {#if form?.type == 'deleteArtist' && form?.success}
        <div class="p-3 border border-green-500 text-green-400 translucent-background rounded-lg">
            {form.message}
        </div>
        {/if}
        <div class="translucent-background flex items-center gap-6 p-6 rounded-lg justify-center">
            {#if !adding}
            <button on:click={() => adding = true} class="translucent-background translucent-background-hover hover:text-black rounded-full pl-3 pr-4 h-10 flex items-center gap-1.5 text-sm">
                <span class="material-symbols-outlined" style="font-size: 18px">add</span>
                Add an artist
            </button>
            {:else}
            <div class="flex flex-col gap-6">
                {#if form?.error && form?.type == 'addArtist'}
                <div class="p-3 border border-red-500 text-red-400 translucent-background rounded-lg">
                    {form.error}
                </div>
                {/if}
                {#if form?.success && form?.type == 'addArtist'}
                <div class="p-3 border border-green-500 text-green-400 translucent-background rounded-lg">
                    {form.message}
                </div>
                {/if}
                <h2 class="text-3xl font-semibold playfair italic text-center">New Artist</h2>
                <form action="?/addArtist" method="post" class="flex flex-col gap-3" use:enhance>
                    <input class="bg-transparent p-3 pl-4 border border-gray-500 rounded-full flex-1 min-w-[250px]" required type="text" placeholder="Artist Name..." name="name">
                    <input class="bg-transparent p-3 pl-4 border border-gray-500 rounded-full flex-1 min-w-[250px]" type="text" placeholder="(optional) Fandom Name..." name="fandomName">
                    <div class="flex gap-3 flex-col lg:flex-row">
                        <input class="bg-transparent p-3 pl-4 border border-gray-500 rounded-full flex-1 min-w-[250px]" required type="text" placeholder="Link to image" name="backgroundImage">
                        <input class="bg-transparent p-3 pl-4 border border-gray-500 rounded-full flex-1 min-w-[250px]" type="number" placeholder="Initial votes (0, optional)" name="votes">
                    </div>
                    <!-- <div class="flex gap-3 flex-col lg:flex-row">
                        <input class="bg-transparent p-3 pl-4 border border-gray-500 rounded-full flex-1 min-w-[250px]" type="text" placeholder="Category (optional)" name="category">
                    </div> -->
                    <button type="button" on:click={() => confirmAddition = true} class="translucent-background translucent-background-hover hover:text-black rounded-full pl-3 pr-4 h-12 flex items-center justify-center gap-1.5 text-sm">
                        <span class="material-symbols-outlined" style="font-size: 18px">add</span>
                        Add artist
                    </button>
                    {#if confirmAddition}
                    <div in:fade={{duration: 100}} out:fade={{duration: 100}} class="fixed top-0 left-0 z-0 w-full h-full backdrop-blur-lg" on:click={() => {confirmAddition = false}}></div>
                    <div in:fade={{duration: 100}} out:fade={{duration: 100}} class="w-96 fixed top-1/2 left-1/2 -translate-y-1/2 
                    -translate-x-1/2 translucent-foreground text-black rounded-lg p-6 flex flex-col gap-6">
                        <h2 class="text-lg font-semibold">Confirm artist details</h2>
                        <p>Are you sure you want to add this artist? Please double check all details before confirming</p>
                        <div class="flex gap-3 justify-center">
                            <button on:click={() => {confirmAddition = false}} type="button" class="translucent-background translucent-background-hover hover:text-black rounded-full pl-3 pr-4 h-10 flex items-center gap-1.5 text-sm">
                                <span class="material-symbols-outlined" style="font-size: 18px">close</span>
                                Go back
                            </button>
                            <button on:click={() => {confirmAddition = false}} type="submit" class="bg-green-500 hover:bg-green-600 text-black rounded-full pl-3 pr-4 h-10 flex items-center gap-1.5 text-sm">
                                <span class="material-symbols-outlined" style="font-size: 18px">check</span>
                                Add artist
                            </button>
                        </div>
                    </div>
                    {/if}
                </form>
            </div>
            {/if}
        </div>
        <div class="w-full h-px translucent-background"></div>
        <div class="flex flex-col gap-3">
            {#each data.leaderboard as artist, index}
            <div class="translucent-background flex flex-col gap-3 p-3 rounded-lg">
                <div class="w-full flex gap-3 items-center">
                    <img src="{artist.backgroundImage}" alt="" class="h-16 w-16 rounded-full object-cover">
                    <div class="flex flex-col gap-0">
                        <h2 class="text-lg font-semibold">{artist.name}</h2>
                        <div class="text-base">{artist.votes} votes</div>
                    </div>
                    <div class="flex-auto"></div>
                    <form action="?/deleteArtist" method="post" use:enhance>
                        <button on:click={() => {confirmDeletion = true; deleteArtistIndex = index}} type="button" class="translucent-background translucent-background-hover text-white hover:text-black border border-transparent hover:border-gray-400 rounded-full w-10 h-10 flex items-center gap-1.5 text-sm flex items-center justify-center">
                            <span class="material-symbols-outlined" style="font-size: 18px">delete</span>
                        </button>
                        <input type="hidden" name="id" value={artist.id}>
                        {#if confirmDeletion && deleteArtistIndex == index}
                        <div in:fade={{duration: 100}} out:fade={{duration: 100}} class="fixed top-0 left-0 z-0 w-full h-full backdrop-blur-lg" on:click={() => {confirmDeletion = false; deleteArtistIndex = -1}}></div>
                        <div in:fade={{duration: 100}} out:fade={{duration: 100}} class="w-96 fixed top-1/2 left-1/2 -translate-y-1/2 
                        -translate-x-1/2 translucent-background rounded-lg p-6 flex flex-col gap-6">
                            <h2 class="text-lg font-semibold">Delete {artist.name}?</h2>
                            <p>Are you sure you want to delete this artist? <span class="font-bold">Votes that this artist has already recieved will be lost permanently.</span></p>
                            <div class="flex gap-3 justify-center">
                                <button on:click={() => {confirmAddition = false; deleteArtistIndex = -1}} type="button" class="translucent-background translucent-background-hover hover:text-black rounded-full pl-3 pr-4 h-10 flex items-center gap-1.5 text-sm">
                                    <span class="material-symbols-outlined" style="font-size: 18px">close</span>
                                    Go back
                                </button>
                                <button on:click={() => {confirmAddition = false; deleteArtistIndex = -1}} type="submit" class="bg-red-500 text-white hover:bg-red-600 rounded-full pl-3 pr-4 h-10 flex items-center gap-1.5 text-sm">
                                    <span class="material-symbols-outlined" style="font-size: 18px">delete</span>
                                    Delete
                                </button>
                            </div>
                        </div>
                        {/if}
                    </form>
                </div>
            </div>
            {/each}
        </div>
    </div>
</div>