<script>
    import { fade } from 'svelte/transition';
    import { enhance } from '$app/forms';

    export let data;
    export let form;

    let adding = false,
    confirmAddition = false,
    confirmDeletion = false, deleteArtistIndex = -1;

    const categories = data.categories;
    // const categoriesFlags = categories.map(category => false);
    // categories.map((category, index) => categoriesFlags[index] && category)
    // .filter(category => category != false && category != undefined)
    let selectedCategories = []; // Array to store selected categories

    let updatesModalOpen = false;
</script>

<div class="h-8 w-full fixed top-0 left-0 bg-blue-500 flex gap-9 px-6 items-center justify-center">
    <button on:click={() => {updatesModalOpen = true}} class="underline">
        Updates published. Click to view
    </button>
</div>
{#if updatesModalOpen}
<div in:fade={{duration: 100}} out:fade={{duration: 100}} class="fixed top-0 left-0 z-0 w-full h-full backdrop-blur-lg" on:click={() => {updatesModalOpen = false}}></div>
<div in:fade={{duration: 100}} out:fade={{duration: 100}} class="w-96 fixed top-1/2 left-1/2 -translate-y-1/2 
-translate-x-1/2 translucent-foreground text-black rounded-lg p-6 flex flex-col gap-6">
    <h2 class="text-lg font-semibold">Updates</h2>
    <ol>
        <li>1. Categories can be added on new fanbases through the admin page. In order to select multiple categories at once, command + click</li>
        <li>2. The site's background image can be changed through the admin page</li>
        <li>3. Replaced the word "Artist" with "Fanbase" or "Fandom" in different parts of the site</li>
        <li>4. Design changes for the countdown timer</li>
    </ol>
    <div class="flex gap-3 justify-center">
        <button on:click={() => {updatesModalOpen = false}} type="submit" class="text-black rounded-full pl-3 pr-4 h-10 flex items-center gap-1.5 text-sm">
            Close
        </button>
    </div>
</div>
{/if}

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
                Add a fanbase
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
                <h2 class="text-3xl font-semibold playfair italic text-center">New Fanbase</h2>
                <form action="?/addArtist" method="post" class="flex flex-col gap-3" use:enhance>
                    <input class="bg-transparent p-3 pl-4 border border-gray-500 rounded-full flex-1 min-w-[250px]" required type="text" placeholder="Artist Name (not fandom name)" name="name">
                    <input class="bg-transparent p-3 pl-4 border border-gray-500 rounded-full flex-1 min-w-[250px]" type="text" placeholder="(optional) Fandom Name..." name="fandomName">
                    <div class="flex gap-3 flex-col lg:flex-row">
                        <input class="bg-transparent p-3 pl-4 border border-gray-500 rounded-full flex-1 min-w-[250px]" required type="text" placeholder="Link to image" name="backgroundImage">
                        <!-- <input class="bg-transparent p-3 pl-4 border border-gray-500 rounded-full flex-1 min-w-[250px]" type="number" placeholder="Initial votes (0, optional)" name="votes"> -->
                    </div>
                    <select class="text-black rounded-lg p-1.5" required multiple bind:value={selectedCategories} name="categories">
                        {#each categories as category (category)}
                          <option class="p-1.5 font-semibold">{category}</option>
                        {/each}
                      </select>
                      
                      <div class="flex flex-col gap-3">
                        <p class="italic playfair p-3 rounded-lg border border-cyan-500 text-cyan-200">Tip: Ctrl + Click to select multiple categories</p>
                        <h2 class="text-xl font-bold">Selected categories for this fanbase: </h2>
                          {#each selectedCategories as category}
                            <p>- {category}</p>
                          {/each}
                      </div>
                    <!-- <div class="flex gap-3 flex-col lg:flex-row">
                        <input class="bg-transparent p-3 pl-4 border border-gray-500 rounded-full flex-1 min-w-[250px]" type="text" placeholder="Category (optional)" name="category">
                    </div> -->
                    <button type="button" on:click={() => confirmAddition = true} class="translucent-background translucent-background-hover hover:text-black rounded-full pl-3 pr-4 h-12 flex items-center justify-center gap-1.5 text-sm">
                        <span class="material-symbols-outlined" style="font-size: 18px">add</span>
                        Add Fanbase
                    </button>
                    {#if confirmAddition}
                    <div in:fade={{duration: 100}} out:fade={{duration: 100}} class="fixed top-0 left-0 z-0 w-full h-full backdrop-blur-lg" on:click={() => {confirmAddition = false}}></div>
                    <div in:fade={{duration: 100}} out:fade={{duration: 100}} class="w-96 fixed top-1/2 left-1/2 -translate-y-1/2 
                    -translate-x-1/2 translucent-foreground text-black rounded-lg p-6 flex flex-col gap-6">
                        <h2 class="text-lg font-semibold">Confirm Fanbase details</h2>
                        <p>Are you sure you want to add this Fanbase? Please double check all details before confirming</p>
                        <div class="flex gap-3 justify-center">
                            <button on:click={() => {confirmAddition = false}} type="button" class="translucent-background translucent-background-hover hover:text-black rounded-full pl-3 pr-4 h-10 flex items-center gap-1.5 text-sm">
                                <span class="material-symbols-outlined" style="font-size: 18px">close</span>
                                Go back
                            </button>
                            <button on:click={() => {confirmAddition = false}} type="submit" class="bg-green-500 hover:bg-green-600 text-black rounded-full pl-3 pr-4 h-10 flex items-center gap-1.5 text-sm">
                                <span class="material-symbols-outlined" style="font-size: 18px">check</span>
                                Add Fanbase
                            </button>
                        </div>
                    </div>
                    {/if}
                </form>
            </div>
            {/if}
        </div>
        <div class="w-full h-px translucent-background"></div>
        <div class="w-full translucent-background rounded-lg p-3 flex flex-col gap-3">
            <h2 class="text-xl font-bold">Background Image</h2>
            <p class="">Default background image link (purple concert) <br> (the following textbox is scrollable):</p>
            <p class="overflow-x-scroll p-3 w-60 border border-white flex items-center rounded-lg">https://as1.ftcdn.net/v2/jpg/01/40/12/92/1000_F_140129299_rdGmmAN13sm04eJchcULL3Szt5BJ7bVp.jpg</p>
            <h2 class="text-xl font-bold">New background:</h2>
            <form action="?/setBackgroundImage" method="post" class="flex items-center gap-3">
                <input class="bg-transparent p-3 pl-4 border border-gray-500 rounded-full flex-1 min-w-[250px]" required type="text" placeholder="New image link" name="link">
                <button type="submit" class="translucent-background translucent-background-hover hover:text-black rounded-full pl-3 pr-4 h-10 flex items-center gap-1.5 text-sm">
                    Confirm
                </button>
            </form>
        </div>
        <div class="w-full h-px translucent-background"></div>
        <div class="flex flex-col gap-3">
            {#each data.leaderboard as artist, index}
            <div class="translucent-background flex flex-col gap-3 p-3 rounded-lg">
                <div class="w-full flex gap-3 items-center">
                    <img src="{artist.backgroundImage}" alt="" class="h-16 w-16 rounded-full object-cover">
                    <div class="flex flex-col gap-0">
                        <h2 class="text-lg font-semibold">{artist.fandomName ? artist.fandomName : artist.name + ' Fans'}</h2>
                        <div class="text-base"></div>
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
                            <p>Are you sure you want to delete this artist? <span class="font-bold">Votes that this fanbase has already recieved will be lost permanently.</span></p>
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