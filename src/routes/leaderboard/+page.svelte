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

        setTimeout(() => {
            document.documentElement.scrollTop = 0;
        }, 10)
    })

    </script>

<div class="navbar-filler"></div>
<div class="container">
    <div class="heading-line column-text-outer" style="padding-top: 45px;">
        <h1 class="display-large bold-weight column-text-in playfair">L<i>eaderboard</i></h1>
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
    <div class="card">
        <div class="overlay-image">
            <img src="https://static.vecteezy.com/system/resources/previews/022/012/091/original/grunge-dots-and-points-texture-background-abstract-grainy-overlay-graphic-illustration-with-transparent-background-png.png" alt="grain">
        </div>
        <div class="image-circle">
            <img src="https://misc-six.vercel.app/cln/images/3.jpg" alt="pretty thing">
            <img src="https://misc-six.vercel.app/cln/images/3.jpg" alt="pretty thing">
        </div>
        <div class="text-wrapper">
            <div class="top-text label-small">Stan</div>
            <div class="card-title">
                <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="128" height="128"/>
                    <circle cx="64" cy="64.5" r="57.5" stroke="#1A0B00"/>
                    <circle cx="64.5" cy="122" r="3.5" fill="#1A0B00"/>
                    <circle cx="64.5" cy="102.5" r="3.5" fill="#1A0B00"/>
                    <circle cx="64.5" cy="26" r="3.5" fill="#1A0B00"/>
                    <circle cx="64.5" cy="6.5" r="3.5" transform="rotate(90 64.5 6.5)" fill="#1A0B00"/>
                </svg>    
                <div class="headline-small column-text-outer">
                    <div><i>award categories</i></div>
                    <div><i>award categories</i></div>
                </div>
            </div>
            <div class="bottom-text label-small">Awards</div>
            <div class="dots">
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    </div>
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
    .card {
            background-color: var(--beige);
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

            @media (max-width: 560px) {
                width: 90%;
                max-width: 90%;
            }


            .text-wrapper {
                color: var(--dark-text);
                display: flex;
                flex-flow: column nowrap;
                min-height: 225px;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                padding-top: 18px;
                padding: 24px 0 6px 0;
                width: 100%;
                gap: 45px;
                .card-title {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    .headline-small {
                        font-family: 'Playfair Display';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        translate: -50% -50%;
                        width: 100%;
                        text-align: center;
                        background: var(--beige);
                        // padding: 6px 0;
                        height: 32px;
                        font-weight: 500;
                        i {font-weight: 600}
                        div {
                            transition: translate var(--hover-transition);
                            &:nth-child(2) {font-weight: 800}
                        }
                    }
                    svg {scale: 0.97;}
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
                scale: 1.095; // 1.1 was the estimated match
                // overflow: hidden;
                border-radius: 50%;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    box-sizing: border-box;
                    border-radius: 50%;
                    border: 15px solid var(--background);
                    position: absolute;
                    top: 0;
                    left: 0;
                    
                    &:nth-child(2) {
                        transition: rotate var(--hover-transition);
                        clip-path: circle(40% at 50% 50%);
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
                }
                &:nth-of-type(odd):hover {.image-circle img:nth-child(2) {rotate: 15deg}}
                &:nth-of-type(even):hover {.image-circle img:nth-child(2) {rotate: -15deg}}
            }
            &:active {
                background: rgb(250, 239, 220);
                .text-wrapper .card-title .headline-small {
                    background: rgb(250, 239, 220);
                }
            }
        }
</style>