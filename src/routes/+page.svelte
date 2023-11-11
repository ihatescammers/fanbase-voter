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
        gsap.registerPlugin(ScrollToPlugin);
        CustomEase.create("emphasized", "M0,0 C0.05,0 0.13333,0.06 0.16666,0.4 0.20833,0.82 0.25,1 1,1 ");

        ScrollTrigger.normalizeScroll(true);
        
        let mn = gsap.matchMedia();
    
        // ScrollTrigger.refresh(true);
        // setTimeout(() => {
        //     ScrollTrigger.refresh(true);
        // }, 150)

        // const lenis = new Lenis({
        //     lerp: 0.07,
        //     infinite: true
        // });
        // function raf(time) {
        //     lenis.raf(time)
        //     requestAnimationFrame(raf)
        // }
        // requestAnimationFrame(raf)

        // return () => {
        //     lenis.destroy();
        //     ScrollTrigger.killAll();
        // }
    })

    function setViewTransitionName(id) {
        document.querySelector(`#${id} .card-content`).style.setProperty('view-transition-name', 'artist-card');
    }
</script>

<section class="container">
    <div class="top">
        <h2 class="headline-small " style="font-family: 'Playfair Display'"><b>Stan <i>Awards</i></b></h2>
    </div>
    <div class="cards">
        <a class="card" href="/leaderboard">
            <div class="overlay-image">
                <img src="https://static.vecteezy.com/system/resources/previews/022/012/091/original/grunge-dots-and-points-texture-background-abstract-grainy-overlay-graphic-illustration-with-transparent-background-png.png" alt="grain">
            </div>
            <div class="image-circle">
                <img src="https://misc-six.vercel.app/cln/images/6.jpg" alt="pretty thing">
                <img src="https://misc-six.vercel.app/cln/images/6.jpg" alt="pretty thing">
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
                        <div>the <i>artist leaderboard</i></div>
                        <div>the <i>artist leaderboard</i></div>
                    </div>
                </div>
                <div class="bottom-text label-small">Awards</div>
                <div class="dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        </a>
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
        <div class="card">
            <div class="overlay-image">
                <img src="https://static.vecteezy.com/system/resources/previews/022/012/091/original/grunge-dots-and-points-texture-background-abstract-grainy-overlay-graphic-illustration-with-transparent-background-png.png" alt="grain">
            </div>
            <div class="image-circle">
                <img src="https://misc-six.vercel.app/cln/images/5.jpg" alt="pretty thing">
                <img src="https://misc-six.vercel.app/cln/images/5.jpg" alt="pretty thing">
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
                        <div><i>upcoming concerts</i></div>
                        <div><i>upcoming concerts</i></div>
                    </div>
                </div>
                <div class="bottom-text label-small">Awards</div>
                <div class="dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="overlay-image">
                <img src="https://static.vecteezy.com/system/resources/previews/022/012/091/original/grunge-dots-and-points-texture-background-abstract-grainy-overlay-graphic-illustration-with-transparent-background-png.png" alt="grain">
            </div>
            <div class="image-circle">
                <img src="https://misc-six.vercel.app/cln/images/4.jpg" alt="pretty thing">
                <img src="https://misc-six.vercel.app/cln/images/4.jpg" alt="pretty thing">
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
                        <div>about <i>stan awards</i></div>
                        <div>about <i>stan awards</i></div>
                    </div>
                </div>
                <div class="bottom-text label-small">Awards</div>
                <div class="dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        </div>
        <!-- {#each data.artists as $artist, index}
            <img src="{$artist.backgroun    dImage}" data-x="{() => {Math.floor(-500 + Math.random() * 500)}}" data-y="{() => {Math.floor(-500 + Math.random() * 500)}}" alt="Sepia tone beach">
        {/each} -->
    </div>
</section>

<style lang="scss">
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;

        .top {
            flex: 100px 0 0;
            box-sizing: border-box;
            padding: 0 25px;
            display: flex;
            align-items: center;
        }
    }
    .cards {
        flex: auto;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 25px;
        place-items: end;
        padding: 25px;
        box-sizing: border-box;

        @media (max-width: 560px) {
            grid-template-columns: 1fr;
        }

        --hover-transition: 1s cubic-bezier(0.77, 0, 0.175, 1);

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
            // &:nth-of-type(even) {border-radius: 250px 250px 48px 4px;}

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
                mix-blend-mode: overlay;
                z-index: 2;
                opacity: 0.75;
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
    }
</style>