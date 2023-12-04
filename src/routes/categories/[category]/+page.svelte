<script>
    import { onMount } from "svelte";
    import Lenis from "@studio-freight/lenis";
    import { page } from "$app/stores";
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";
    import { getAuth, signInWithRedirect, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
    import { app, updateArtistVotes } from "$lib";
    import { user, voted, setVoted, additionalUserInfo } from "$lib/auth.js";

    export let data;

    let url = decodeURIComponent($page.url.pathname);
    const category = url.split("/")[2];

    const artists = data.leaderboard
        .filter(artist => artist.enrolledIn.includes(category))
        .sort((a, b) => {
            const votesA = a.votesArr[a.enrolledIn.findIndex(c => c === category)];
            const votesB = b.votesArr[b.enrolledIn.findIndex(c => c === category)];
            return votesB - votesA; // Sort in descending order
        });

    onMount(() => {
        const lenis = new Lenis({});
        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        lenis.scrollTo(0)

        return () => {
            lenis.destroy();
        }
    })

    let votingResult;

    let selectedArtist;
    let votingModalOpen = false;
    votingModalOpen = false;
    function openVotingModal(artist) {
        selectedArtist = artist;
        votingModalOpen = true;
    }
    function closeVotingModal() {
        votingModalOpen = false;
        votingResult = null;
    }

    const handleSignIn = () => {
        if ($user !== null) return;
        const auth = getAuth(app);
        signInWithPopup(auth, new GoogleAuthProvider())
    }

    let voting = 'Cast your vote!';
    const vote = async (id, category, amount) => {
        voting = 'Voting...';
        votingResult = await updateArtistVotes(id, category, amount);
        voting = 'Thank you for voting!';
        setVoted(category);
        setTimeout(closeVotingModal, 1500)
    }

    console.log($additionalUserInfo)

    let shopModalOpen = true;
    function openShopModal() {
        shopModalOpen = true;
    }
    function closeShopModal() {
        shopModalOpen = false;
    }
</script>

<div class="navbar-filler"></div>
<div class="container">
    <div class="w-full p-3 fixed top-0 z-20">
        <a on:click={() => {history.back()}} class="cursor-pointer translucent-background rounded-full h-12 w-36 flex items-center justify-center">Go back</a>
    </div>
    <div class="heading-line column-text-outer pt-[45px] w-full flex flex-col items-center">
        <div class="display-medium bold-weight column-text-in playfair">{category}</div>
    </div>
    {#if $voted.includes(category)}
    <div class="w-full flex justify-center">
        <div class="border border-green-500 text-green-500 rounded-lg py-1 px-2 text-xs w-fit">voted</div>
    </div>
    {/if}
    <div class="leaderboard">
        {#each artists as artist, index}
        <a on:click={() => {openVotingModal(artist)}} class="group card">
            <div class="overlay-image">
                <img src="https://static.vecteezy.com/system/resources/previews/022/012/091/original/grunge-dots-and-points-texture-background-abstract-grainy-overlay-graphic-illustration-with-transparent-background-png.png" alt="grain">
            </div>
            <div class="image-circle">
                <img src="{artist.backgroundImage}" alt="{artist.name}">
                <img src="{artist.backgroundImage}" alt="{artist.name}">
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 playfair italic text-2xl overflow-hidden">
                    <div class="translate-y-full group-hover:translate-y-0 hover-transition drop-shadow-lg">Vote</div>
                </div>
            </div>
            <div class="text-wrapper">
                <div class="top-text label-small">no. {index + 1}</div>
                <div class="card-title">
                    <svg class="hidden" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" height=128 width=128 viewBox="0 0 128 128" style="enable-background:new 0 0 128 128;" xml:space="preserve">
                        <style type="text/css">
                            .st0{fill:none;}
                            .st1{fill:none;stroke:#FFF2E0;}
                            .st2{fill:#FFF2E0;}
                        </style>
                        <rect x="0.2" y="-0.2" class="st0" width="128" height="128"/>
                        <path class="st1" d="M23.6,23.6C34,13.2,48.4,6.8,64.2,6.8s30.3,6.4,40.7,16.8"/>
                        <path class="st1" d="M104.9,104.9c-10.4,10.4-24.8,16.8-40.7,16.8s-30.3-6.4-40.7-16.8"/>
                        <circle class="st2" cx="64.7" cy="121.8" r="3.5"/>
                        <circle class="st2" cx="64.7" cy="102.3" r="3.5"/>
                        <circle class="st2" cx="64.7" cy="25.8" r="3.5"/>
                        <circle class="st2" cx="64.7" cy="6.3" r="3.5"/>
                        </svg> 
                    <div class="headline-medium column-text-outer">
                        <div><i>{artist.name}</i></div>
                        <div><i>{artist.name}</i></div>
                    </div>
                </div>
                <div class="bottom-text label-small">{artist.votesArr[artist.enrolledIn.findIndex((c) => c === category)]} votes</div>
                <div class="dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        </a>
        {/each}
    </div>
</div>

{#if votingModalOpen === true}
    <div in:fade={{duration: 150}} out:fade={{duration: 150}} class="fixed top-0 left-0 z-20 w-full h-full backdrop-blur-lg" on:click={closeVotingModal}></div>
    <div in:fly={{duration: 350, y: 10, ease: cubicOut}} out:fade={{duration: 150}} class="w-96 fixed top-1/2 left-1/2 text-center -translate-y-1/2 
    -translate-x-1/2 translucent-foreground text-black rounded-2xl p-6 flex flex-col gap-6 items-center z-20">
        {#if $voted.includes(category) && $additionalUserInfo.paidVotesRemaining <= 0}
        <h2 class="text-2xl playfair">Purchase more votes</h2>
        <p class="text-center">Do you want to vote for {selectedArtist?.name} as {category}?</p>
        {:else}
        <h2 class="text-2xl playfair">Vote for {selectedArtist?.name}</h2>
        <p>You have already voted in this category. Purchase additional votes to vote for this fanbase again.</p>
        {/if}
        <div class="flex-auto"></div>
        {#if $user !== null}
            {#if $voted.includes(category) && $additionalUserInfo.paidVotesRemaining <= 0}
            <button on:click={openShopModal} class="w-full h-12 rounded-full border border-black flex items-center justify-center playfair">
                Purchase votes
            </button>
            {:else}
                <button on:click={() => {vote(selectedArtist.id, category, 1)}} class="w-full h-12 rounded-full border border-black flex items-center justify-center playfair">
                    {voting}
                </button>
                {#if votingResult?.status == true}
                <div class="p-3 border border-gray-500 text-green-900 opacity-75 translucent-background rounded-xl">
                    Your vote has been cast!
                </div>
                {:else if votingResult?.status == false}
                <div class="p-3 border border-gray-500 text-red-900 translucent-background rounded-xl">
                    An error occurred, please try again later.
                </div>
                {/if}
            {/if}
        {:else}
            <button on:click={handleSignIn} class="w-full h-12 rounded-full border border-black flex items-center justify-center playfair">
                Vote with Google
            </button>
        {/if}
    </div>
{/if}


{#if shopModalOpen === true}
    <div in:fade={{duration: 150}} out:fade={{duration: 150}} class="fixed top-0 left-0 z-30 w-full h-full backdrop-blur-lg" on:click={closeShopModal}></div>
    <div in:fly={{duration: 350, y: 10, ease: cubicOut}} out:fade={{duration: 150}} class="w-11/12 w-[75%] min-h-[450px] z-30 fixed top-1/2 left-1/2 text-center -translate-y-1/2 
    -translate-x-1/2 translucent-foreground text-black rounded-2xl p-6 flex flex-col gap-6 items-center">
        <h1 class="headline-large playfair">Purchase <i>votes</i></h1>
    </div>
{/if}

<style lang="scss">
    // sd
    .container {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;
        @media (max-width: 560px) {
            padding: 0 10px;
        }
    }
    .leaderboard {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 40px 20px;
        place-items: center;
        padding-bottom: 220px;

        .card {
            &:nth-of-type(3n - 2) {translate: 0 0}
            &:nth-of-type(3n - 1) {translate: 0 100px}
            &:nth-of-type(3n) {translate: 0 200px}

            svg circle {
                stroke: var(--beige);
                &[fill] {
                    fill: var(--beige);
                }
            }
            div.text-wrapper div.dots div.dot {
                &:nth-child(1) {border-color: var(--beige)}
                &:nth-child(2) {background-color: var(--beige)}
            }
        }
        @media (max-width: 1200px) {
            grid-template-columns: 1fr 1fr;

            .card {
                &:nth-of-type(3n) {translate: none}
                &:nth-of-type(3n - 2) {translate: none}
                &:nth-of-type(3n - 1) {translate: none}

                &:nth-of-type(even) {translate: 0 75px}
            }
        }
        @media (max-width: 560px) {
            gap: 20px 10px;
            .card {
                .text-wrapper {
                    min-height: none;
                    gap: 15px;

                    .card-title {
                        .headline-small, .headline-medium, .title-medium, .title-large {
                            font-size: 20px;
                            height: 26.4px;
                        }
                        svg {
                            scale: 0.9;
                        }
                    }
                }
            }
        }
    }
    .heading-line {
        margin: 45px 0;
        width: 100%;
        text-align: center;
        h1 {margin: 0}
    }
    .card {
            background-color: var(--translucent-background);
            // aspect-ratio: 4/7;
            max-width: 100%;
            max-height: 100%;
            display: flex;
            flex-flow: column nowrap;
            width: 100%;
            position: relative;
            transition: border-radius var(--hover-transition);
            cursor: pointer;
            text-decoration: none;
            border-radius: 250px 250px 4px 48px;

            .text-wrapper {
                color: var(--beige);
                display: flex;
                flex-flow: column nowrap;
                min-height: 225px;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                padding-top: 18px;
                padding: 6px 0 6px 0;
                width: 100%;
                gap: 45px;
                .card-title {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    .headline-medium {
                        font-family: 'Playfair Display';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        translate: -50% -50%;
                        width: 100%;
                        text-align: center;
                        // background: var(--translucent-background);
                        // padding: 6px 0;
                        height: 42px;
                        font-weight: 500;
                        i {font-weight: 600}
                        div {
                            transition: translate var(--hover-transition);
                            &:nth-child(2) {font-weight: 800}
                        }
                    }
                    svg {scale: 0.95;}
                }
                .top-text, .bottom-text {
                    text-transform: uppercase;
                    font-weight: 800;
                    font-size: 10px;
                }        
                .dots {
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    display: flex;
                    gap: 4px;
                    .dot {
                        height: 8px;
                        width: 8px;
                        border-radius: 50%;
                        box-sizing: border-box;
                        transition: translate var(--hover-transition);
                        &:nth-child(1) {border: 1px solid var(--background)}
                        &:nth-child(2) {background: var(--background)}
                    }   
                }
            }

            .image-circle {
                width: 100%;
                position: relative;
                aspect-ratio: 1;
                scale: 0.95; // 1.1 was the estimated match
                // overflow: hidden;
                border-radius: 50%;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    box-sizing: border-box;
                    border-radius: 50%;
                    // border: 15px solid var(--background);
                    position: absolute;
                    top: 0;
                    left: 0;
                    
                    &:nth-child(2) {
                        transition: var(--hover-transition);
                        clip-path: circle(42.5% at 50% 50%);
                    }
                }
            }
            
            .overlay-image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                mix-blend-mode:multiply;
                z-index: 2;
                opacity: 0.05;
                pointer-events: none;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            @media (pointer: fine) {
                &:hover {
                    border-radius: 250px 250px 48px 48px;
                    .text-wrapper {
                        .column-text-outer div {
                            translate: 0 -100%;
                        }
                    }
                    .dots .dot:nth-child(1) {translate: 12px -12px;}
                    .dots .dot:nth-child(2) {translate: -12px 0px;}
                    .image-circle img:nth-child(2) {
                        clip-path: circle(0% at 50% 50%);
                        rotate: 10deg;
                        // filter: blur(2.5px);
                    }
                }
                // &:nth-of-type(odd):hover {.image-circle img:nth-child(2) {rotate: 15deg}}
                // &:nth-of-type(even):hover {.image-circle img:nth-child(2) {rotate: -15deg}}
            }
        }
</style>