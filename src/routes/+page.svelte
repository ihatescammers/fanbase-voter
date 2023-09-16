<script>
    import { onMount } from "svelte";
    import gsap from "gsap";
    import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
    import CustomEase from "gsap/dist/CustomEase";
    import Lenis from '@studio-freight/lenis';
    import { fly, blur, fade } from "svelte/transition";

    export let data;

    let container;
    let lenis;
    let opened = false, selected = undefined;
    let goalPosition = 0;
    
    
    onMount(() => {
        gsap.registerPlugin(CustomEase);
        gsap.registerPlugin(ScrollToPlugin);
        CustomEase.create("emphasized", "M0,0 C0.05,0 0.13333,0.06 0.16666,0.4 0.20833,0.82 0.25,1 1,1 ");


        goalPosition = document.documentElement.scrollLeft;
        // lenis = new Lenis({
        //     orientation: 'horizontal',
        //     gestureOrientation: 'both',
        //     smoothWheel: true,
        // })

        // function raf(time) {
        //     lenis.raf(time)
        //     requestAnimationFrame(raf)
        // }

        // requestAnimationFrame(raf)
    })

    
    const closeContainer = () => {
        setTimeout(() => {opened = false}, 10)
        selected = undefined;
    }
    
    function handleclick(index) {
        if (!opened) {
            opened = true;
            selected = index;
            const xPos = (window.innerHeight * 0.4 + 20) * index + 20 + 88 + 20;
            gsap.to(window, {
                duration: 1, 
                scrollTo: {x: xPos}, 
                ease: "emphasized",
                // onStart: () => {document.documentElement.style.scrollBehavior = 'auto'},
                // onComplete: () => {document.documentElement.style.scrollBehavior = 'smooth'},
            });
            goalPosition = xPos;
        }
    }

    function scrollToZero() {
        gsap.to(window, {
            scrollTo: {x: 0},
            ease: "emphasized",
            duration: 1.5
        })
        goalPosition = 0;
    }

    function handleScroll(e) {
        if (e.shiftKey || opened) return;

        goalPosition = Math.min(Math.max(goalPosition + e.deltaX + e.deltaY, 0), e.currentTarget.scrollWidth - window.innerWidth);
        e.preventDefault();
        gsap.to(window, {
            scrollTo: {x: goalPosition},
            ease: "expo.out",
            duration: 1,
        });
    }

    function handleTouchScroll(e) {
        if (opened) {e.preventDefault()}
    }

</script>


<main class="image-list-container { opened ? 'opened' : '' }" bind:this={container} on:wheel={handleScroll} on:touchmove={handleTouchScroll} on:scroll={handleTouchScroll}>
    <section class="image-list">
        {#each data.artists as artist, index}
            <button type="button" class="img-container { selected === index ? 'selected' : '' }" on:click={() => {handleclick(index)}}>
                <img src="{artist.backgroundImage}" alt="{artist.name}" draggable="false">
                <md-focus-ring></md-focus-ring>

                {#if selected === index} 
                    <div class="content-container" out:fade={{duration: 100}}>
                        <div class="content">
                            <div class="heading-line">
                                <h1 class="display-medium semibold-weight">{artist.name}</h1>
                                <md-icon-button on:click={closeContainer} role="button" tabindex=0 on:touchend={closeContainer} on:keyup={() => {}}>
                                    <md-icon class="material-symbols-outlined">close</md-icon>
                                </md-icon-button>
                            </div>
                            <div class="content-details">
                                <div class="right">
                                    <div class="card">
                                        <!-- <div class="body-large medium-weight">Leaderboard position</div> -->
                                        <div class="body-large medium-weight">{artist.votes} votes</div>
                                        <h1 class="display-medium semibold-weight" style="font-size: 64px">N. 17</h1>
                                        <md-outlined-button>Cast your vote!</md-outlined-button>
                                    </div>
                                </div>
                                <!-- <div class="left">
                                    <div class="vote-button">
                                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><defs></defs><path class="cls-1" d="M109,146.33a38.23,38.23,0,0,1-10.71-1.56L86.09,141.2a39.47,39.47,0,0,0-22.18,0l-12.18,3.57A38.41,38.41,0,0,1,41,146.33a37.6,37.6,0,0,1-29.88-15.14,37,37,0,0,1-5.9-32.91L8.8,86.09a39.29,39.29,0,0,0,0-22.18L5.23,51.73a37,37,0,0,1,5.9-32.91A37.59,37.59,0,0,1,41,3.67,38.41,38.41,0,0,1,51.73,5.23L63.91,8.8A39.23,39.23,0,0,0,75,10.39,39.23,39.23,0,0,0,86.09,8.8L98.28,5.23A38.28,38.28,0,0,1,109,3.67a37.6,37.6,0,0,1,29.88,15.14,37.06,37.06,0,0,1,5.9,32.92L141.2,63.91a39.29,39.29,0,0,0,0,22.18l3.57,12.19a37,37,0,0,1-5.9,32.9A37.61,37.61,0,0,1,109,146.33Z"/></svg>
                                        <div class="button-content">
                                            <div class="body-large bold-weight">Applause for Andreas</div>
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                {/if}
            </button>
        {/each}

        <div class="ending-filler">
            <!-- <md-text-button on:click={scrollToZero} role="button" tabindex=0 on:touchend={scrollToZero} on:keyup={() => {}}>
                <md-icon class="material-symbols-outlined" slot="icon" style="font-size: 18px;">arrow_back</md-icon>
                Go back
            </md-text-button> -->
        </div>
    </section>
</main>

<div class="section-underneath">
    <h1 class="display-large bold-weight">Top Artists</h1>
</div>

<style lang="scss">
    :root {
        overflow-y: hidden;
        // scroll-behavior: smooth;
    }
    .image-list-container {
        height: 100vh;
        height: 100svh;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;;
        position: relative;
        z-index: 1;
        
        .image-list {
            display: flex;
            align-items: center;
            flex: auto;
            gap: 20px;
            box-sizing: border-box;
            padding-left: 20px;
            
            .img-container {
                all: unset;
                position: relative;
                height: 50vh;
                height: 50svh;
                width: 40vh;
                width: 40svh;
                transition: 1000ms var(--custom-easing) width, 1000ms var(--custom-easing) height;

                --md-focus-ring-shape: 24px;

                img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                    border-radius: 24px;
                    transition: 750ms 0ms var(--custom-easing) border-radius;
                }

                .content-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;   
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: center;
                    justify-content: flex-end;

                    .content {
                        background: var(--md-sys-color-surface-container-blurred);
                        backdrop-filter: blur(var(--background-blur-value));
                        width: 70%;
                        height: calc(80% + 50px);
                        border-radius: 36px 36px 0 0;
                        // overflow-y: scroll;
                        opacity: 0;
                        box-sizing: border-box;
                        padding: 40px 40px 90px 40px;
                        display: flex;
                        flex-flow: column nowrap;

                        animation: content-animation 750ms 750ms var(--md-sys-motion-easing-emphasized-decelerate) forwards;

                        @keyframes content-animation {
                            0% {opacity: 0; translate: 0 100px;}
                            100% {opacity: 1; translate: 0 50px;}
                        }

                        .heading-line {
                            display: flex;
                            flex-flow: row nowrap;
                            align-items: flex-start;
                            justify-content: space-between;

                            // --md-icon-button-state-layer-size: 48px;

                            h1 {
                                margin: 0;
                            }

                            md-icon-button md-icon {color: var(--md-sys-color-on-surface)}
                        }

                        .content-details {
                            flex: auto;
                            display: flex;
                            height: 100%;
                            width: 100%;

                            .right, .left {
                                // flex: 1; //50%
                                display: flex;
                                flex-flow: column nowrap;
                                // opacity: 0;

                                @keyframes scale-fade-in {
                                    // 0% {opacity: 0; scale: 0.8}
                                    // 100% {opacity: 1; scale: 1}
                                }
                            }
                            .right {
                                width: 100%;
                                padding: 20px;
                                box-sizing: border-box;
                                flex-grow: 0;
                                align-items: center;
                                justify-content: center;
                                animation: scale-fade-in var(--md-sys-motion-duration-medium3) 750ms forwards;
                                overflow-y: scroll;


                                .card {
                                    display: flex;
                                    flex-flow: column nowrap;
                                    padding: 20px;
                                    box-sizing: border-box;
                                    border-radius: 36px;
                                    // background-color: var(--md-sys-color-surface-container-blurred);
                                    align-items: center;
                                    // justify-content: center;
                                    gap: 15px;
                                    width: 100%;
                                    // height: 100%;
                                    // aspect-ratio: 1;

                                    --md-sys-color-primary: var(--md-sys-color-on-surface);
                                }

                                h1 {margin: 0;}
                            }
                            .left {
                                position: relative;
                                flex-grow: 0;
                                height: 100%;
                                flex-flow: column nowrap;
                                align-items: center;
                                justify-content: center;
                                animation: scale-fade-in var(--md-sys-motion-duration-medium3) 800ms forwards;

                                --md-text-button-container-size: 100px;

                                svg {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
                                    .cls-1:nth-child(2) {
                                        fill: var(--md-sys-color-surface-container-blurred);
                                        stroke: none;
                                        
                                    }
                                    .cls-1:first-child {opacity: 0}
                                }
                                .button-content {
                                    width: 100%;
                                    height: 100%;
                                    display: flex;
                                    flex-flow: column nowrap;
                                    gap: 20px;
                                    align-items: center;
                                    justify-content: center;
                                    position: relative;
                                    z-index: 1;
                                }
                            }
                        }
                    }
                }
            }
        }

        &.opened {
            overflow: hidden;
            .image-list {
                .selected {
                    height: 100vh;
                    height: 100svh;
                    width: 100vw;
                    width: 100svw;
                    // margin: 0 10svw;
                    
                    img {
                        border-radius: 0px;
                        transition-delay: 500ms;
                    }
                }
            }
        }

        .ending-filler {
            width: calc(100vw - 40svh - 39px);
            // width: calc(20vh - 108px);
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .section-underneath {
        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;
        box-sizing: border-box;
        padding-left: 128px;
        padding-top: 20px;
        flex: 1;
    }
</style>