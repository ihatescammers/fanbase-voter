<script>
    import { onMount } from "svelte";
    import gsap from "gsap";
    import CustomEase from "gsap/dist/CustomEase";
    import { voted } from "$lib/auth.js";

    export let data;

    onMount(() => {
        gsap.registerPlugin(CustomEase);
        CustomEase.create("emphasized", "M0,0 C0.05,0 0.13333,0.06 0.16666,0.4 0.20833,0.82 0.25,1 1,1 ");
        
        const mtl = gsap.timeline();
        mtl.to('.heading-line h1', {y: 0, duration: 1, ease: 'emphasized'});
        mtl.to('.leaderboard-artist .profile-picture', {
            scale: 1, 
            ease: "elastic.out(1, 0.5)",
            duration: 1,
            stagger: 0.075
        }, "<+=0.25")
        mtl.to('.leaderboard-artist .name, .leaderboard-artist .leaderboard-position, .leaderboard-artist .votes', {
            y: 0,
            duration: 1,
            ease: "emphasized",
            stagger: 0.025
        }, "<")
    }, "<")

    </script>

<!-- <img src="https://misc-six.vercel.app/cln/images/3.jpg" alt="background" style="position: fixed; width: 100%; height: 100%; top: 0; left: 0; object-fit: cover; z-index: 0"> -->
<div class="container">
    <div class="heading-line column-text-outer" style="padding-top: 45px;">
        <h1 class="display-large bold-weight" style="translate: 0 100%;">Leaderboard</h1>
    </div>
    <!-- {#if $voted} -->
    <div class="leaderboard">
        {#each data.leaderboard as artist, index}
            <div class="leaderboard-artist">
                <div class="position medium-weight title-large column-text-outer">
                    <div class="leaderboard-position" style="translate: 0 100%">{index + 1}. </div>
                </div>
                <div class="profile-picture">
                    <img src="{artist.backgroundImage}" alt="{artist.name}">
                </div>
                <div class="name-container">
                    <div class="column-text-outer">
                        <div class="name column-text-inner medium-weight body-large" style="translate: 0 100%">
                            {artist.name}
                        </div>
                    </div>
                </div>
                <div class="filler"></div>
                <div class="votes-container column-text-outer">
                    <div class="votes" style="translate: 0 100%">{artist.votes} votes</div>
                </div>
                <md-ripple></md-ripple>
            </div>
        {/each}
    </div>
    <div class="bottom-spacer"></div>
</div>


<style lang="scss">
    .container {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;
    }
    .bottom-spacer {
        height: 20px;
    }
    .heading-line {
        margin: 45px 0;
        h1 {margin: 0}
    }
    .leaderboard {
        width: 100%;
        box-sizing: border-box;
        padding: 20px 0px;
        border-radius: 36px;
        background: var(--md-sys-color-surface-container-blurred);
        backdrop-filter: blur(var(--background-blur-value));
        
        --md-ripple-hover-opacity: 0.025;
        --md-ripple-pressed-opacity: 0.1;

        opacity: 0;
        animation: fade-in 250ms 100ms cubic-bezier(0.445, 0.05, 0.55, 0.95) forwards;

        .leaderboard-artist {
            height: 80px;
            display: flex;
            align-items: center;
            padding: 0 20px;
            gap: 25px;
            position: relative;

            .profile-picture {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background-color: var(--md-sys-color-surface-container-high);
                overflow: hidden;
                scale: 0;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
    }
    @media (max-width: 560px) {
        .heading-line {
            text-align: center;
            h1 {
                font-family: var(--md-sys-typescale-headline-large-font-family-name);
                font-style: var(--md-sys-typescale-headline-large-font-family-style);
                font-size: var(--md-sys-typescale-headline-large-font-size);
                letter-spacing: var(--md-sys-typescale-headline-large-tracking);
                line-height: var(--md-sys-typescale-headline-large-height);
                text-transform: var(--md-sys-typescale-headline-large-text-transform);
                text-decoration: var(--md-sys-typescale-headline-large-text-decoration);
            }
        }
        .leaderboard {
            .leaderboard-artist {
                height: 88px;
                gap: 15px;
            }
        }
        .bottom-spacer {
            height: 100px;
            opacity: 0;
        }
    }
</style>