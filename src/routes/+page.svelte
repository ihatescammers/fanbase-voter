<script>
    import { onDestroy, onMount } from "svelte";
    import gsap from "gsap";
    import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
    import CustomEase from "gsap/dist/CustomEase";
    import ScrollTrigger from "gsap/dist/ScrollTrigger";
    import Lenis from '@studio-freight/lenis';
    import { fade, scale, slide } from "svelte/transition";

    import { user, voted, setVoted } from "$lib/auth.js";
    import { app } from "$lib/index.js";
    import { signInWithRedirect, getAuth, GoogleAuthProvider } from "firebase/auth";
    import { page } from "$app/stores";

    export let data;

    let container;
    let lenis;
    let opened = false, selected = undefined;
    let goalPosition = 0;
    let artistId;
    
    onMount(() => {
        gsap.registerPlugin(CustomEase);
        gsap.registerPlugin(ScrollTrigger);
        CustomEase.create("emphasized", "M0,0 C0.05,0 0.13333,0.06 0.16666,0.4 0.20833,0.82 0.25,1 1,1 ");

        
        const imageContainers = gsap.utils.toArray('.img-container');
        
        let mn = gsap.matchMedia();
        mn.add('(pointer: coarse)', () => {
            ScrollTrigger.defaults({
                scroller: ".image-list-container",
                scrub: true,
                invalidateOnRefresh: true
            });
        })
        mn.add('(pointer: fine)', () => {
            ScrollTrigger.defaults({
                scrub: true,
                invalidateOnRefresh: true
            });
        })
        
        mn.add("(prefers-reduced-motion: no-preference)", () => {
            imageContainers.forEach((item, index) => {
                gsap.fromTo(item.children[0], 
                {
                    x: () => {
                        return index % 2 === 0 ? window.innerWidth * 0.125 : window.innerWidth * 0.15
                    }
                },
                {
                    x: () => {
                        return window.innerWidth >= 560 ? -window.innerWidth * 0.075 : 0
                    },
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom',
                        end: () => {
                            return window.innerWidth >= 560 ? 'bottom top' : 'center center'
                        },
                    }
                })
                mn.add("(min-width: 560px)", () => {
                    gsap.fromTo(item.children[0].children[0].children[0], 
                    {
                        yPercent: -5,
                        xPercent: -5
                    },
                    {
                        yPercent: 5,
                        xPercent: 5,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top bottom',
                            end: 'bottom top',
                        }
                    })
                }) 
            })
        })

        ScrollTrigger.refresh(true);
        setTimeout(() => {
            ScrollTrigger.refresh(true);
        }, 150)

        const lenis = new Lenis({
            lerp: 0.2
        });
        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        return () => {
            lenis.destroy();
            ScrollTrigger.killAll();
        }
    })

    function setViewTransitionName(id) {
        document.querySelector(`#${id} .card-content`).style.setProperty('view-transition-name', 'artist-card');
    }
</script>

<div class="navbar-filler"></div>
<main class="image-list-container { artistId !== null ? 'opened' : '' }" bind:this={container}>
    <div class="heading-line column-text-outer">
        <h1 class="display-large bold-weight column-text-in" style="margin-bottom: 0;">Vote for Your Artist</h1>
    </div>
    {#each data.artists as $artist, index}
        <a data-sveltekit-noscroll href="/artist/{$artist.id}" class="img-container { artistId === $artist.id ? 'selected' : '' }"
        id="artist-{$artist.id}" on:click={() => {setViewTransitionName(`artist-${$artist.id}`)}}>
            <div class="card-content">
                <div class="image-parallax-wrapper">
                    <img src="{$artist.backgroundImage}" alt="{$artist.name}" draggable="false">
                </div>
                <div class="overlay-background"></div>
                <div class="overlay">
                    <div class="material-symbols-outlined plus-icon">add</div>
                    <div class="material-symbols-outlined plus-icon">add</div>
                    <div class="material-symbols-outlined plus-icon">add</div>
                    <div class="material-symbols-outlined plus-icon">add</div>
                    <div class="overlay-flex-container">
                        <!-- <div class="filler"></div> -->
                        <div class="content-beneath">
                            <div class="lines-wrapper">
                                <div class="line-difference"></div>
                                <div class="line-opaque"></div>
                            </div>
                            <div class="column-text-outer title-medium bold-weight" style="text-transform: uppercase">
                                <div class="column-text-inner difference">{$artist.name}</div>
                                <div class="column-text-inner opaque">{$artist.name}</div>
                            </div>
                            <div class="lines-wrapper">
                                <div class="line-opaque"></div>
                                <div class="line-difference"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <md-ripple></md-ripple>
                <md-focus-ring for="artist-{$artist.id}"></md-focus-ring>
            </div>
        </a>
    {/each}
    <div style="padding: 10vh 0; box-sizing: border-box; opacity: 0;" aria-hidden="true">d</div>
</main>
 
<style lang="scss">
    .image-list-container {
        width: 100%;
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: 1fr 1fr;
        place-items: center;
        gap: 200px 2rem;
        box-sizing: border-box;
        padding: 0 2rem 2rem 2rem;
        user-select: none;

        @media (max-width: 560px) {
            gap: 100px 20px;
            padding: 1rem;
        }

        @media (pointer: coarse) {
            height: 100%;
            overflow-x: hidden;
            overflow-y: visible;
            scroll-snap-type: y mandatory;
        }
    }
    .img-container {
        all: unset;
        position: relative;
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        gap: 10px;
        max-width: 450px;

        animation: fade-in var(--md-sys-motion-duration-medium1) var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized) forwards;
        opacity: 0;

        &:nth-child(even) {
            scroll-snap-align: center;
        }
        &:nth-child(odd) {
            translate: 0 25%;
        }

        .card-content {
            position: relative;
            width: 100%;
            aspect-ratio: 4/3;
            cursor: pointer;

            --md-focus-ring-shape: 24px;
            --md-ripple-hover-opacity: 0;
            
            @media (max-width: 560px) {
                aspect-ratio: 4/5;
            }

            .image-parallax-wrapper {
                width: 100%;
                height: 100%;
                overflow: hidden;
                border-radius: 24px;
            }
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                scale: 1.1;
                transition: var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized) scale,
                var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized) filter;
            }
            md-ripple {border-radius: 24px;}
            .overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 24px;
                // background: linear-gradient(0deg, rgba(2,0,36,0) 0%, rgba(0,0,0,0) 30%, rgba(255,255,255,0.25) 50%, rgba(0,0,0,0) 70%, rgba(0,0,0,0) 100%);


                .plus-icon {
                    position: absolute;
                    transition: var(--md-sys-motion-duration-long4) cubic-bezier(0.175, 0.885, 0.32, 1.275) rotate,
                    var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized) scale;
                    scale: 0;
                    rotate: 180deg;

                    &:nth-child(1) {top: 40px; left: 40px; transition-delay: 35ms;}
                    &:nth-child(2) {bottom: 40px; left: 40px; transition-delay: 70ms;}
                    &:nth-child(3) {top: 40px; right: 40px; transition-delay: 105ms;}
                    &:nth-child(4) {bottom: 40px; right: 40px; transition-delay: 140ms;}
                }

                .overlay-flex-container {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;
                    justify-content: center;
                    
                    .content-beneath {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        height: 60px;
                        transition: var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized) gap;
                        .lines-wrapper {
                            width: 45px;
                            height: 2px;
                            display: flex;
                            transition: var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized) width;
                            .line-difference, .line-opaque {
                                height: 100%;
                                transition: var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized) flex;
                            }
                            .line-difference {
                                mix-blend-mode: difference;
                                background-color: var(--md-sys-color-inverse-on-surface-light);
                                flex: 1;
                            }
                            .line-opaque {
                                background-color: var(--md-sys-color-on-surface);
                                flex: 0;
                            }

                            @media (max-width: 560px) {
                                display: none;
                            }
                        }
                        .column-text-outer {
                            height: 40px;
                            font-family: 'Playfair Display', 'Raleway', system-ui, sans-serif;
                            .difference, .opaque {
                                height: 40px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                text-align: center;
                                transition: var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized) translate;
                            }
                            .difference {
                                translate: 0 0;
                                mix-blend-mode: difference;
                                color: var(--md-sys-color-inverse-on-surface-light);
                            }
                        }
                    }
                }
            }
            .overlay-background {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 24px;
                transition: var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized) background-color;
                background-color: rgba(0,0,0,0)
            }

            @media (pointer: fine) {
                &:hover {
                    .image-parallax-wrapper img {
                        scale: 1.05 !important;
                        filter: blur(5px);
                    }
                    .overlay {
                        .plus-icon {
                            scale: 1;
                            rotate: 0deg;
                        }
                        .overlay-flex-container .content-beneath {
                            gap: 20px;
                            .lines-wrapper {
                                width: 50px;
                                .line-opaque {flex: 1}
                                .line-difference {flex: 0}
                            }
                            .column-text-outer{
                                .difference, .opaque {translate: 0 -40px;}
                            }
                        }
                    }
                    .overlay-background {
                        background-color: rgba(255,255,255,0.3);
                        // background: linear-gradient(0deg, rgba(2,0,36,0) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0) 70%, rgba(0,0,0,0) 100%);
    
                        @media (prefers-color-scheme: dark) {
                            background-color: rgba(0,0,0,0.35);
                        }
                    }
                }
            }
        }
        // &:active {
        //     scale: 0.995;
        // }
    }
    .heading-line {
        scroll-snap-align: start; 
        padding: 90px 0 0 0;
        grid-column: span 2;
        // place-self: start;
        @media (max-width: 560px) {
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
    }
</style>