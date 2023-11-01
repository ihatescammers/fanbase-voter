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

        ScrollTrigger.normalizeScroll(true);
        
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

        imageContainers.forEach((item, index) => {
            // gsap.fromTo(item.children[0], 
            // {

            // }, 
            // {

            // })
            // const tl = gsap.timeline({
            //     scrollTrigger: {
            //         trigger: item,
            //         // pin: item,
            //         // scrub: true,
            //         start: "center center",
            //         end: "+=1200"
            //     }
            // })
            // gsap.set(item.children[0], {x: index % 2 === 0 ? item.children[0].clientWidth / 2 : -item.children[0].clientWidth / 2,})
            // gsap.to(item.children[0], {
            //     opacity: 0,
            //     scrollTrigger: {
            //         scrub: true,
            //         start: 'top bottom',
            //         end: 'top bottom'
            //     }
            // })
            // gsap.fromTo(item.children[0], 
            // {
            //     scale: 0.5,
            //     opacity: 0,
            // }, 
            // {
            //     scale: 1,
            //     opacity: 2,
            //     scrollTrigger: {
            //         trigger: item,
            //         // pin: item, 
            //         scrub: true, 
            //         start: 'center center',
            //         end: '+=1000'
            //     }
            // })
            // gsap.fromTo(item.children[0], 
            // {
            //     x: 0,
            //     // oapcity: 1,
            // }, 
            // {
            //     x: index % 2 === 0 ? item.children[0].clientWidth / 1.5: -item.children[0].clientWidth / 1.5,
            //     // opacity: 0,
            //     scrollTrigger: {
            //         trigger: item,
            //         // pin: item, 
            //         scrub: true, 
            //         start: 'center 50%+=500px',
            //         end: '+=500'
            //     }
            // })
            // gsap.fromTo(item.children[0], 
            // {
            //     x: index % 2 === 0 ? 200 : -200,
            // }, 
            // {
            //     x: index % 2 === 0 ? 200 : -200,
            // }, "<")
        })

        ScrollTrigger.refresh(true);
        setTimeout(() => {
            ScrollTrigger.refresh(true);
        }, 150)

        const lenis = new Lenis({
            lerp: 0.08
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
    <div class="title-large">CA<i>TE</i>GO<i>RIE</i>S</div>
    <!-- <div class="image-list-wrapper"> -->
        {#each data.artists as $artist, index}
        <a data-sveltekit-noscroll href="/artist/{$artist.id}" class="img-container"
        id="artist-{$artist.id}" on:click={() => {setViewTransitionName(`artist-${$artist.id}`)}}>
            <div class="card-content">
                <div class="image-wrapper">
                    <img src="{$artist.backgroundImage}" alt="{$artist.name}" draggable="false">
                    <div class="line1"></div>
                    <div class="line2"></div>
                </div>
                <div class="text">
                    <h2>{$artist.name}</h2>
                    <div class="line3"></div>
                </div>
            </div>
        </a>
        {/each}
    <!-- </div> -->
</main>
 
<style lang="scss">
    .image-list-container {
        width: 100%;
        position: relative;
        z-index: 1;
        box-sizing: border-box;
        user-select: none;
        display: grid;
        grid-template-columns: 1fr 1fr;
        place-items: center;
        gap: 300px 0;
        // flex-flow: column nowrap;
        // align-items: center;
        // justify-content: center;

        .title-large {
            font-family: 'Playfair Display', serif;
            grid-column: span 2;
            font-size: 64px;
            font-weight: 500;
            padding-top: 75px;
            // font-style: italic;
        }

        @media (max-width: 560px) {
            // gap: 100px 20px;
            // padding: 1rem;
        }

        @media (pointer: coarse) {
            height: 100%;
            overflow-x: hidden;
            overflow-y: visible;
            scroll-snap-type: y mandatory;
        }

        .img-container {
            width: 400px;
            height: 300px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            color: black;
            
            &:nth-of-type(even) {
                translate: 0 250px;
           }

            .card-content {
                width: 100%;
                height: 100%;
                display: flex;
                flex-flow: column nowrap;
                overflow: hidden;
                border-radius: 8px;
                background: var(--md-sys-color-surface-container-blurred);
                // background-image: url("data:image/svg+xml,%3C!-- svg: first layer --%3E%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                transition: 0.6s cubic-bezier(0.86, 0, 0.07, 1);
                .image-wrapper {
                    width: 100%;
                    height: 100%;
                    flex: 1;
                    position: relative;
                    img {
                        width: 100%;
                        height: 102%;
                        object-fit: cover;
                        border-radius: 8px;
                        transition: 0.6s cubic-bezier(0.86, 0, 0.07, 1) filter;
                    }
                    .line1, .line2 {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        translate: -50% -50%;
                        background: rgb(255, 255, 255);
                        box-sizing: border-box;
                        scale: 0;
                        transition: 0.6s cubic-bezier(0.86, 0, 0.07, 1);
                    }
                    .line1 {height: 1px; width: 45px; transition-delay: 0.1s;}
                    .line2 {height: 45px; width: 1px; transition-delay: 0.15s;}
                }
                .text {
                    height: 0px;
                    flex: 0 0 0;
                    transition: 0.6s cubic-bezier(0.86, 0, 0.07, 1) height, 0.6s cubic-bezier(0.86, 0, 0.07, 1) padding;
                    box-sizing: border-box;
                    padding: 0 15px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    justify-content: space-between;
                    padding-left: 15px;
                    h2 {
                        margin: 0;
                        font-family: 'Playfair Display', sans-serif;
                        font-style: italic;
                        font-weight: 500;
                        font-size: 20px;
                    }
                }

                &:hover {
                    padding: 10px 10px 0 10px;
                    height: 107.5%;
                    img {
                        filter: contrast(0.65);
                    }
                    .text {
                        height: 56px;
                        padding: 12px 12px 12px 0;
                    }
                    .line1, .line2 {scale: 1; rotate: 90deg;}
                }
            }
        }
    }
    // .img-container {
    //     all: unset;
    //     position: relative;
    //     display: flex;
    //     flex-flow: column nowrap;
    //     align-items: flex-start;
    //     gap: 10px;
    //     max-width: 450px;

    //     animation: fade-in var(--md-sys-motion-duration-medium1) var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized) forwards;
    //     opacity: 0;

    //     &:nth-child(even) {
    //         scroll-snap-align: center;
    //     }
    //     &:nth-child(odd) {
    //         translate: 0 25%;
    //     }

    //     .card-content {
    //         position: relative;
    //         width: 100%;
    //         aspect-ratio: 4/3;
    //         cursor: pointer;

    //         --md-focus-ring-shape: 24px;
    //         --md-ripple-hover-opacity: 0;
            
    //         @media (max-width: 560px) {
    //             aspect-ratio: 4/5;
    //         }

    //         .image-parallax-wrapper {
    //             width: 100%;
    //             height: 100%;
    //             overflow: hidden;
    //             border-radius: 24px;
    //         }
    //         img {
    //             width: 100%;
    //             height: 100%;
    //             object-fit: cover;
    //             scale: 1.1;
    //             transition: var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized) scale,
    //             var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized) filter;
    //         }
    //         md-ripple {border-radius: 24px;}
    //         .overlay {
    //             position: absolute;
    //             top: 0;
    //             left: 0;
    //             width: 100%;
    //             height: 100%;
    //             border-radius: 24px;
    //             // background: linear-gradient(0deg, rgba(2,0,36,0) 0%, rgba(0,0,0,0) 30%, rgba(255,255,255,0.25) 50%, rgba(0,0,0,0) 70%, rgba(0,0,0,0) 100%);


    //             .plus-icon {
    //                 position: absolute;
    //                 transition: var(--md-sys-motion-duration-long4) cubic-bezier(0.175, 0.885, 0.32, 1.275) rotate,
    //                 var(--md-sys-motion-duration-medium1) var(--md-sys-motion-easing-emphasized) scale;
    //                 scale: 0;
    //                 rotate: 180deg;

    //                 &:nth-child(1) {top: 40px; left: 40px; transition-delay: 35ms;}
    //                 &:nth-child(2) {bottom: 40px; left: 40px; transition-delay: 70ms;}
    //                 &:nth-child(3) {top: 40px; right: 40px; transition-delay: 105ms;}
    //                 &:nth-child(4) {bottom: 40px; right: 40px; transition-delay: 140ms;}
    //             }

    //             .overlay-flex-container {
    //                 width: 100%;
    //                 height: 100%;
    //                 display: flex;
    //                 flex-flow: column nowrap;
    //                 align-items: center;
    //                 justify-content: center;
                    
    //                 .content-beneath {
    //                     display: flex;
    //                     align-items: center;
    //                     gap: 15px;
    //                     height: 60px;
    //                     transition: var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized) gap;
    //                     .lines-wrapper {
    //                         width: 45px;
    //                         height: 2px;
    //                         display: flex;
    //                         transition: var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized) width;
    //                         .line-difference, .line-opaque {
    //                             height: 100%;
    //                             transition: var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized) flex;
    //                         }
    //                         .line-difference {
    //                             mix-blend-mode: difference;
    //                             background-color: var(--md-sys-color-inverse-on-surface-light);
    //                             flex: 1;
    //                         }
    //                         .line-opaque {
    //                             background-color: var(--md-sys-color-on-surface);
    //                             flex: 0;
    //                         }

    //                         @media (max-width: 560px) {
    //                             display: none;
    //                         }
    //                     }
    //                     .column-text-outer {
    //                         height: 40px;
    //                         font-family: 'Playfair Display', 'Raleway', system-ui, sans-serif;
    //                         .difference, .opaque {
    //                             height: 40px;
    //                             display: flex;
    //                             align-items: center;
    //                             justify-content: center;
    //                             text-align: center;
    //                             transition: var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized) translate;
    //                         }
    //                         .difference {
    //                             translate: 0 0;
    //                             mix-blend-mode: difference;
    //                             color: var(--md-sys-color-inverse-on-surface-light);
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //         .overlay-background {
    //             position: absolute;
    //             top: 0;
    //             left: 0;
    //             width: 100%;
    //             height: 100%;
    //             border-radius: 24px;
    //             transition: var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized) background-color;
    //             background-color: rgba(0,0,0,0)
    //         }

    //         @media (pointer: fine) {
    //             &:hover {
    //                 // scale: 0.95 !important;
    //                 .image-parallax-wrapper img {
    //                     scale: 1.05 !important;
    //                     filter: blur(5px);
    //                 }
    //                 .overlay {
    //                     .plus-icon {
    //                         scale: 1;
    //                         rotate: 0deg;
    //                     }
    //                     .overlay-flex-container .content-beneath {
    //                         gap: 20px;
    //                         .lines-wrapper {
    //                             width: 50px;
    //                             .line-opaque {flex: 1}
    //                             .line-difference {flex: 0}
    //                         }
    //                         .column-text-outer{
    //                             .difference, .opaque {translate: 0 -40px;}
    //                         }
    //                     }
    //                 }
    //                 .overlay-background {
    //                     background-color: rgba(255,255,255,0.3);
    //                     // background: linear-gradient(0deg, rgba(2,0,36,0) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0) 70%, rgba(0,0,0,0) 100%);
    
    //                     @media (prefers-color-scheme: dark) {
    //                         background-color: rgba(0,0,0,0.35);
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     // &:active {
    //     //     scale: 0.995;
    //     // }
    // }
    // .heading-line {
    //     scroll-snap-align: start; 
    //     padding: 90px 0 0 0;
    //     grid-column: span 2;
    //     // place-self: start;
    //     @media (max-width: 560px) {
    //         h1 {
    //             font-family: var(--md-sys-typescale-headline-large-font-family-name);
    //             font-style: var(--md-sys-typescale-headline-large-font-family-style);
    //             font-size: var(--md-sys-typescale-headline-large-font-size);
    //             letter-spacing: var(--md-sys-typescale-headline-large-tracking);
    //             line-height: var(--md-sys-typescale-headline-large-height);
    //             text-transform: var(--md-sys-typescale-headline-large-text-transform);
    //             text-decoration: var(--md-sys-typescale-headline-large-text-decoration);
    //         }
    //     }
    // }
</style>