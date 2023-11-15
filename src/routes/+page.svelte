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
    
    onMount(() => {
        // gsap.registerPlugin(CustomEase);
        // gsap.registerPlugin(ScrollTrigger);
        // gsap.registerPlugin(ScrollToPlugin);
        // CustomEase.create("emphasized", "M0,0 C0.05,0 0.13333,0.06 0.16666,0.4 0.20833,0.82 0.25,1 1,1 ");

        // ScrollTrigger.normalizeScroll(true);
        
        // let mn = gsap.matchMedia();
    
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

        const interval = setInterval(() => {
            timeRemaining = getTimeRemaining();
        }, 1000);

        return () => clearInterval(interval);
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

<section class="container">
    <div class="top-artist">
        <a href="/artist/{data.leaderboard[0].id}" class="card">
            <div class="overlay-image">
                <img src="https://static.vecteezy.com/system/resources/previews/022/012/091/original/grunge-dots-and-points-texture-background-abstract-grainy-overlay-graphic-illustration-with-transparent-background-png.png" alt="grain">
            </div>
            <div class="image-circle">
                <img src="{data.leaderboard[0].backgroundImage}" alt="top artist">
                <div class="glass">
                    <div>
                        <span style="font-size: 48px">#</span>
                        <span style="font-size: 64px">1</span>
                    </div>
                </div>
            </div>
            <div class="text-wrapper">
                <div class="top-text label-small">Stan</div>
                <div class="card-title"> 
                    <div class="center-text-wrapper">
                        <div class="headline-small column-text-outer">
                            <div><i>{data.leaderboard[0].name}</i></div>
                            <div><i>{data.leaderboard[0].name}</i></div>
                        </div>
                        <div class="small-caps-text">{data.leaderboard[0].votes} votes</div>
                    </div>
                </div>
                <div class="bottom-text label-small">Awards</div>
                <div class="dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        </a>
        <a href="/leaderboard" class="card bottom-card">
            <div class="overlay-image">
                <img src="https://static.vecteezy.com/system/resources/previews/022/012/091/original/grunge-dots-and-points-texture-background-abstract-grainy-overlay-graphic-illustration-with-transparent-background-png.png" alt="grain">
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
    </div>
    <div class="second-column">
        <div class="countdown-container flex-center-container flex-column">
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
        <a class="card bottom-card">
            <div class="overlay-image">
                <img src="https://static.vecteezy.com/system/resources/previews/022/012/091/original/grunge-dots-and-points-texture-background-abstract-grainy-overlay-graphic-illustration-with-transparent-background-png.png" alt="grain">
            </div>
            <div class="text-wrapper">
                <div class="top-text label-small">What are the stan awards?</div>
                <div class="card-title">
                    <a href="/about" class="large-button inverse">About Stan Awards</a>
                </div>
                <div class="bottom-text label-small"><a href="/categories">Explore our categories</a></div>
                <div class="dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        </a>
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

            .card {
                background-color: var(--beige);
                max-width: 100%;
                display: flex;
                flex-flow: column nowrap;
                width: 100%;
                position: relative;
                transition: border-radius var(--hover-transition);
                cursor: pointer;
                text-decoration: none;
                border-radius: 250px 250px 4px 4px;
                color: var(--text);
                
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
                    color: var(--dark-text);
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
                &:active {
                    background: rgb(250, 239, 220);
                    .text-wrapper .card-title .headline-small {
                        background: rgb(250, 239, 220);
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
                
                .circle {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    border: 2px dashed var(--beige);
                    gap: 7px;
                }
                .text-bottom {
                    margin-top: 20px;
                }
            }

            .card {
                background-color: var(--beige);
                max-width: 100%;
                display: flex;
                flex-flow: column nowrap;
                width: 100%;
                position: relative;
                transition: border-radius var(--hover-transition);
                text-decoration: none;
                border-radius: 250px 250px 4px 48px;
                color: var(--text);
                a {color: var(--dark-text); &:hover {text-decoration: underline;}}
                
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
                    color: var(--dark-text);
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
                        font-size: 10px;
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
                &:active {
                    background: rgb(250, 239, 220);
                    .text-wrapper .card-title .headline-small {
                        background: rgb(250, 239, 220);
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
        //     &:active {
        //         background: rgb(250, 239, 220);
        //         .text-wrapper .card-title .headline-small {
        //             background: rgb(250, 239, 220);
        //         }
        //     }
        // }
    // }
</style>