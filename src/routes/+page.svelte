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

    // let container;
    // let lenis;
    // let opened = false, selected = undefined;
    // let goalPosition = 0;
    // let artistId;
    
    let currentTopArtistIndex = 0;
    let mounted = false;

    onMount(() => {
        mounted = true;

        gsap.registerPlugin(CustomEase);
        CustomEase.create("emphasized", "M0,0 C0.05,0 0.13333,0.06 0.16666,0.4 0.20833,0.82 0.25,1 1,1 ");

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

        // gsap.to('.circle, .text-bottom', {
        //     scale: 1,
        //     stagger: 0.1,
        //     duration: 0.75,
        //     ease: 'emphasized'
        // })
        
        let swapperFlag = true, lastValue = 0;
        const artistInterval = setInterval(() => {
            const tl = gsap.timeline();
            tl.to('.top-artist-card', {
                scale: 0.975,
                filter: 'blur(15px)',
                opacity: 0,
                duration: 1,
                ease: "quint.inOut",
                onComplete: () => {
                    if (swapperFlag) {
                        currentTopArtistIndex = Math.min(lastValue + 1, data.leaderboard.length - 1);
                        lastValue + 1 === data.leaderboard.length && (currentTopArtistIndex = 0);
                        lastValue = currentTopArtistIndex;
                    } else {
                        currentTopArtistIndex = 0;
                    }
                    swapperFlag = !swapperFlag;
                }
            });
            tl.to('.top-artist-card', {
                scale: 1,
                filter: 'blur(0px)',
                opacity: 1,
                duration: 1,
                ease: "quint.inOut"
            });
        }, 7500)

        const interval = setInterval(() => {
            timeRemaining = getTimeRemaining();
        }, 1000);

        return () => {
            clearInterval(interval)
            clearInterval(artistInterval)
        };
    })

    function getTimeRemaining() {
        const targetDate = new Date("May 14, 2024");
        const currentDate = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = targetDate - currentDate;

        // Calculate the remaining time in months, days, hours, minutes, and seconds
        const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30.44));
        const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        return { months, days, hours, minutes, seconds };
    }

    $: timeRemaining = getTimeRemaining();
</script>

<section class="container relative">
    <div class="top-artist">
        <a href="/artist/{data.leaderboard[currentTopArtistIndex].id}" class="card top-artist-card">
            <div class="overlay-image">
                <img src="https://static.vecteezy.com/system/resources/previews/022/012/091/original/grunge-dots-and-points-texture-background-abstract-grainy-overlay-graphic-illustration-with-transparent-background-png.png" alt="grain">
            </div>
            <div class="image-circle">
                <img src="{data.leaderboard[currentTopArtistIndex].backgroundImage}" alt="top artist">
                <div class="glass">
                    <div>
                        <span style="font-size: 48px"></span>
                        <span style="font-size: 64px">{currentTopArtistIndex + 1}</span>
                    </div>
                </div>
            </div>
            <div class="text-wrapper">
                <div class="top-text label-small">Stan</div>
                <div class="card-title"> 
                    <div class="center-text-wrapper">
                        <div class="headline-small column-text-outer">
                            <div><i>{data.leaderboard[currentTopArtistIndex].name}</i></div>
                            <div><i>{data.leaderboard[currentTopArtistIndex].name}</i></div>
                        </div>
                        <div class="small-caps-text">{data.leaderboard[currentTopArtistIndex].votes} votes</div>
                    </div>
                </div>
                <div class="bottom-text label-small">Awards</div>
                <div class="dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        </a>
        <a href="/categories" class="card bottom-card">
            <div class="overlay-image">
                <img src="https://static.vecteezy.com/system/resources/previews/022/012/091/original/grunge-dots-and-points-texture-background-abstract-grainy-overlay-graphic-illustration-with-transparent-background-png.png" alt="grain">
            </div>
            <div class="text-wrapper">
                <div class="top-text label-small">Vote for your</div>
                <div class="card-title">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" height=128 width=128 viewBox="0 0 128 128" style="enable-background:new 0 0 128 128;" xml:space="preserve">
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
                    <div class="headline-small column-text-outer">
                        <div>view <i>the categories</i></div>
                        <div>view <i>the categories</i></div>
                    </div>
                </div>
                <div class="bottom-text label-small">favourite fanbases</div>
                <div class="dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        </a>
    </div>
    <div class="second-column gap-[5px]">
        <div class="countdown-container flex-center-container flex-column translucent-background" style="border-radius: 200px 40px 4px 4px">
            <div class="flex-center-container">
                <div class="circle flex-center-container flex-column title-large bold-weight playfair">
                    {timeRemaining.months}
                    <div class="label-medium">months</div>
                </div>
                <div class="circle flex-center-container flex-column title-large bold-weight playfair">
                    {timeRemaining.days}
                    <div class="label-medium">days</div>
                </div>
            </div>
            <div class="flex-center-container">
                <div class="circle flex-center-container flex-column title-large bold-weight playfair">
                    {timeRemaining.hours}
                    <div class="label-medium">hours</div>
                </div>
                <div class="circle flex-center-container flex-column title-large bold-weight playfair">
                    {timeRemaining.minutes}
                    <div class="label-medium">minutes</div>
                </div>
                <div class="circle flex-center-container flex-column title-large bold-weight playfair">
                    {timeRemaining.seconds}
                    <div class="label-medium">seconds</div>
                </div>
            </div>
            <div class="text-bottom playfair">remaining until next concert</div>
            <a class="text-bottom large-button" href="https://tickermaster.com">Purchase Tickets</a>
        </div>
        <div class="small-caps-text text-center">
            <div class="">
                {#each [0] as bing}
                <!-- ** INSERT ANIMATION HERE ** ** Join the <b class="text-xs">15918</b> voters by voting for your favourite artist! ** ** INSERT ANIMATION HERE ** -->
                {/each}
            </div>
        </div>
        <div class="card bottom-card">
            <div class="overlay-image">
                <img src="https://static.vecteezy.com/system/resources/previews/022/012/091/original/grunge-dots-and-points-texture-background-abstract-grainy-overlay-graphic-illustration-with-transparent-background-png.png" alt="grain">
            </div>
            <div class="text-wrapper">
                <a href="/shop" class="top-text label-small">Visit the shop</a>
                <div class="card-title">
                    <a href="/about" class="large-button">About Stan Awards</a>
                </div>
                <div class="bottom-text label-small"><a href="/categories">Explore our categories</a></div>
                <div class="dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<style lang="scss">
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: row wrap;
        box-sizing: border-box;
        padding: 20px 8px 8px 8px;
        gap: 10px;

        @media (max-width: 560px) {
            flex-flow: column nowrap;
        }

        .top-artist {
            flex: 1;
            display: flex;
            flex-flow: column nowrap;
            gap: 10px;
            width: 100%;
            
            @media (max-width: 560px) {
                align-items: center;
            }

            .card svg circle {
                stroke: var(--beige);
                &[fill] {
                    fill: var(--beige);
                }
            }
            .card div.text-wrapper div.dots div.dot {
                &:nth-child(1) {border-color: var(--beige)}
                &:nth-child(2) {background-color: var(--beige)}
            }

            .card {
                background-color: var(--translucent-background);
                max-width: 100%;
                display: flex;
                flex-flow: column nowrap;
                width: 100%;
                position: relative;
                transition: border-radius var(--hover-transition);
                cursor: pointer;
                text-decoration: none;
                border-radius: 250px 250px 4px 4px;
                color: var(--beige);
                
                &.bottom-card {
                    border-radius: 4px 4px 4px 48px;
                    height: 225px;

                    .text-wrapper {
                        padding: 6px 0;
                    }
                    
                    &:hover {
                        border-radius: 4px 4px 30px 48px;
                    }
                }
                &:not(.bottom-card) {
                    flex: 1;
                    .center-text-wrapper {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        translate: -50% -50%;
                        width: 100%;
                        display: flex;
                        flex-flow: column;
                        justify-content: center;
                        align-items: center;
                        .headline-small {
                            position: static !important;
                            translate: 0 0 !important;
                        }
                        .small-caps-text {
                            text-transform: none;
                        }
                    }   
                }

                @media (max-width: 560px) {
                    width: 90%;
                    max-width: 90%;
                }

                .text-wrapper {
                    color: var(--beige);
                    display: flex;
                    flex-flow: column nowrap;
                    min-height: 180px;
                    align-items: center;
                    justify-content: space-between;
                    box-sizing: border-box;
                    padding-top: 18px;
                    padding: 6px 0 6px 0;
                    width: 100%;
                    height: 100%;
                    justify-content: space-between;
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
                            width: 90%;
                            text-align: center;
                            // background: var(--beige);
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
                        font-size: 13px;
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
                    flex-shrink: 0;
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
                            transition: rotate var(--hover-transition);
                            clip-path: circle(40% at 50% 50%);
                        }
                    }
                    .glass {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        translate: -50% -50%;
                        width: 50%;
                        height: 50%;
                        border-radius: 50%;
                        background: var(--translucent-background);
                        backdrop-filter: blur(25px);
                        z-index: 10;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0px 2px 5px 4px rgba(0,0,0,0.1);
                        transition: var(--hover-transition);
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
                        .image-circle .glass {
                            scale: 0.96;
                        }
                    }
                }
            }
        }
        .second-column {
            flex: 2;
            display: flex;
            flex-flow: column nowrap;

            @media (max-width: 560px) {
                align-items: center;
                gap: 25px;
                padding: 25px 0;
            }

            .countdown-container {
                flex: auto;
                gap: 0px;
                .flex-center-container {gap: 15px;}
                position: relative;
                
                .circle {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    border: 2px solid var(--beige);
                    gap: 7px;
                    filter: drop-shadow(0 0 0.75rem crimson);
                }
                .text-bottom {
                    margin-top: 20px;
                }
            }

            .card {
                background-color: var(--translucent-background);
                max-width: 100%;
                display: flex;
                flex-flow: column nowrap;
                width: 100%;
                position: relative;
                transition: border-radius var(--hover-transition);
                text-decoration: none;
                border-radius: 250px 250px 4px 48px;
                color: var(--beige);
                a {color: var(--beige); &:hover {text-decoration: underline;}}

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
                
                &.bottom-card {
                    border-radius: 4px 4px 48px 4px;
                    height: 225px;

                    .text-wrapper {
                        padding: 6px 0;
                    }
                    
                    &:hover {
                        border-radius: 4px 4px 48px 48px;
                    }
                }
                &:not(.bottom-card) {
                    flex: 1;
                    .center-text-wrapper {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        translate: -50% -50%;
                        width: 100%;
                        display: flex;
                        flex-flow: column;
                        justify-content: center;
                        align-items: center;
                        .headline-small {
                            position: static !important;
                            translate: 0 0 !important;
                        }
                        .small-caps-text {
                            text-transform: none;
                        }
                    }   
                }

                @media (max-width: 560px) {
                    width: 90%;
                    max-width: 90%;
                }

                .text-wrapper {
                    color: var(--beige);
                    display: flex;
                    flex-flow: column nowrap;
                    min-height: 180px;
                    align-items: center;
                    justify-content: space-between;
                    box-sizing: border-box;
                    padding-top: 18px;
                    padding: 24px 0 6px 0;
                    width: 100%;
                    height: 100%;
                    justify-content: space-between;
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
                            width: 90%;
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
                        font-size: 13px;
                    }        
                    .dots {
                        position: absolute;
                        bottom: 18px;
                        right: 18px;
                        display: flex;
                        gap: 4px;
                        .dot {
                            height: 8px;
                            width: 8px;
                            border-radius: 50%;
                            box-sizing: border-box;
                            transition: translate var(--hover-transition);
                            &:nth-child(1) {border: 1px solid var(--background); translate: 12px -12px}
                            &:nth-child(2) {background: var(--background); translate: -12px 0px}
                        }   
                    }
                }

                .image-circle {
                    width: 100%;
                    flex-shrink: 0;
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
                    .glass {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        translate: -50% -50%;
                        width: 50%;
                        height: 50%;
                        border-radius: 50%;
                        background: var(--translucent-background);
                        backdrop-filter: blur(25px);
                        z-index: 10;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0px 2px 5px 4px rgba(0,0,0,0.1);
                        transition: var(--hover-transition);
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
                        .image-circle .glass {
                            scale: 0.96;
                        }
                    }
                }
            }
        }
    }
    // .cards {
    //     flex: auto;
    //     width: 100%;
    //     display: grid;
    //     grid-template-columns: 1fr 1fr 1fr;
    //     gap: 25px;
    //     place-items: end;
    //     padding: 25px;
    //     box-sizing: border-box;

    //     @media (max-width: 560px) {
    //         grid-template-columns: 1fr;
    //         place-items: center;
    //         gap: 50px;
    //     }

    //     --hover-transition: 1s cubic-bezier(0.77, 0, 0.175, 1);

        // .card {
        //     background-color: var(--beige);
        //     // aspect-ratio: 4/7;
        //     max-width: 100%;
        //     max-height: 100%;
        //     display: flex;
        //     flex-flow: column nowrap;
        //     width: 100%;
        //     position: relative;
        //     transition: border-radius var(--hover-transition);
        //     cursor: pointer;
        //     text-decoration: none;
        //     border-radius: 250px 250px 4px 48px;

        //     @media (max-width: 560px) {
        //         width: 90%;
        //         max-width: 90%;
        //     }


        //     .text-wrapper {
        //         color: var(--dark-text);
        //         display: flex;
        //         flex-flow: column nowrap;
        //         min-height: 225px;
        //         align-items: center;
        //         justify-content: space-between;
        //         box-sizing: border-box;
        //         padding-top: 18px;
        //         padding: 24px 0 6px 0;
        //         width: 100%;
        //         gap: 45px;
        //         .card-title {
        //             position: relative;
        //             display: flex;
        //             align-items: center;
        //             justify-content: center;
        //             width: 100%;
        //             .headline-small {
        //                 font-family: 'Playfair Display';
        //                 position: absolute;
        //                 top: 50%;
        //                 left: 50%;
        //                 translate: -50% -50%;
        //                 width: 100%;
        //                 text-align: center;
        //                 background: var(--beige);
        //                 // padding: 6px 0;
        //                 height: 32px;
        //                 font-weight: 500;
        //                 i {font-weight: 600}
        //                 div {
        //                     transition: translate var(--hover-transition);
        //                     &:nth-child(2) {font-weight: 800}
        //                 }
        //             }
        //             svg {scale: 0.97;}
        //         }
        //         .top-text, .bottom-text {
        //             text-transform: uppercase;
        //             font-weight: 800;
        //             font-size: 10px;
        //         }        
        //         .dots {
        //             position: absolute;
        //             bottom: 10px;
        //             right: 10px;
        //             display: flex;
        //             gap: 4px;
        //             .dot {
        //                 height: 8px;
        //                 width: 8px;
        //                 border-radius: 50%;
        //                 box-sizing: border-box;
        //                 transition: translate var(--hover-transition);
        //                 &:nth-child(1) {border: 1px solid var(--background)}
        //                 &:nth-child(2) {background: var(--background)}
        //             }   
        //         }
        //     }

        //     .image-circle {
        //         width: 100%;
        //         position: relative;
        //         aspect-ratio: 1;
        //         scale: 1.095; // 1.1 was the estimated match
        //         // overflow: hidden;
        //         border-radius: 50%;
        //         img {
        //             width: 100%;
        //             height: 100%;
        //             object-fit: cover;
        //             box-sizing: border-box;
        //             border-radius: 50%;
        //             border: 15px solid var(--background);
        //             position: absolute;
        //             top: 0;
        //             left: 0;
                    
        //             &:nth-child(2) {
        //                 transition: rotate var(--hover-transition);
        //                 clip-path: circle(40% at 50% 50%);
        //             }
        //         }
        //     }
            
        //     .overlay-image {
        //         position: absolute;
        //         top: 0;
        //         left: 0;
        //         width: 100%;
        //         height: 100%;
        //         mix-blend-mode: overlay;
        //         z-index: 2;
        //         opacity: 0.75;
        //         pointer-events: none;
        //         img {
        //             width: 100%;
        //             height: 100%;
        //             object-fit: cover;
        //         }
        //     }

        //     @media (pointer: fine) {
        //         &:hover {
        //             border-radius: 250px 250px 48px 48px;
        //             .text-wrapper {
        //                 .column-text-outer div {
        //                     translate: 0 -100%;
        //                 }
        //             }
        //             .dots .dot:nth-child(1) {translate: 12px -12px;}
        //             .dots .dot:nth-child(2) {translate: -12px 0px;}
        //         }
        //         &:nth-of-type(odd):hover {.image-circle img:nth-child(2) {rotate: 15deg}}
        //         &:nth-of-type(even):hover {.image-circle img:nth-child(2) {rotate: -15deg}}
        //     }
        // }
    // }
</style>