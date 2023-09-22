<script>
    import { onMount } from "svelte";
    import gsap from "gsap";
    import ScrollToPlugin from "gsap/dist/ScrollToPlugin";
    import CustomEase from "gsap/dist/CustomEase";
    import Lenis from '@studio-freight/lenis';
    import { fade, slide } from "svelte/transition";
    import { enhance } from '$app/forms';
    
    import { getAuth } from 'firebase/auth';
    import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
    import { app } from '$lib/index.js';
    
    // import { preventDefault } from '@sveltejs/kit';
    // import {fetch} from '$app/environment';
    import { writable } from "svelte/store";
    
    export let data;

    let container;
    let lenis;
    let opened = false, selected = undefined;
    let goalPosition = 0;
    
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider({
        client_id: '442591407052-q2oskicagqm3sga5cptnvb110eneh5hk.apps.googleusercontent.com'
    });
    
    onMount(() => {
        gsap.registerPlugin(CustomEase);
        gsap.registerPlugin(ScrollToPlugin);
        CustomEase.create("emphasized", "M0,0 C0.05,0 0.13333,0.06 0.16666,0.4 0.20833,0.82 0.25,1 1,1 ");


        goalPosition = document.documentElement.scrollLeft;
        
        const mtl = gsap.timeline();
        // mtl.set('.img-container')
        mtl.to('.img-container', {
            // opacity: 1,
            scale: 1,
            duration: 0.5,
            // ease: CustomEase.create("custom", "M0,0 C0,0 0.101,0.003 0.166,0.016 0.242,0.03 0.401,0.072 0.451,0.248 0.496,0.404 0.498,0.505 0.531,0.721 0.54,0.783 0.545,0.816 0.558,0.875 0.567,0.917 0.574,0.942 0.586,0.982 0.59,0.995 0.595,1.003 0.601,1.016 0.606,1.024 0.61,1.03 0.616,1.037 0.622,1.042 0.628,1.046 0.635,1.049 0.642,1.051 0.65,1.051 0.657,1.049 0.688,1.038 0.711,1.021 0.745,1.009 0.764,1.002 0.778,0.998 0.798,0.997 0.873,0.994 1,1 1,1 "),
            stagger: 0.1,
            delay: 0.2,
            ease: "emphasized"
        })
        mtl.to('.section-underneath h1', {y: 0, duration: 1, ease: 'emphasized'}, "<+=0.15")

    })

    
    const closeContainer = () => {
        setTimeout(() => {opened = false}, 10)
        selected = undefined;
    }
    
    function handleItemOpen(index) {
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
        document.documentElement.scrollLeft += e.deltaY + e.deltaX; 

        // goalPosition = Math.min(Math.max(goalPosition + e.deltaX + e.deltaY, 0), e.currentTarget.scrollWidth - window.innerWidth);
        // e.preventDefault();
        // gsap.to(window, {
        //     scrollTo: {x: goalPosition},
        //     ease: "expo.out",
        //     duration: 1,
        // });
    }

    function handleTouchScroll(e) {
        if (opened) {e.preventDefault()}
    }

    const handleSignIn = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult();
            const token = credential.accessToken;

            // the signed in user info
            // IdP data available using getAdditionalUserInfo(result)
            const user = result.user;
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            const email = error.customData;
            const credential = GoogleAuthProvider.credentialFromError(error);

            console.log(`Error ${errorCode}: ${error}`);
        })
    }

    let promisePending = false, voted = false;
    let promise;
    const handleSubmit = async (event) => {
        if (promisePending) {
            console.log('Promise already pending');
            return;
        };
        promisePending = true;

        const index = selected;

        const promise = await fetch("?/updateartistvotes", {
            method: "POST",
            body: new FormData(event.target)
        })

        if (promise.ok) {
            const responseData = await promise.json();
            const parsedData = JSON.parse(responseData.data);
            // array item 0 contains the corresponding names and the rest of the items contain values of those names
            data.artists[index] = {...data.artists[index], votes: parsedData[3]};
            data = data;
            promisePending = false;
            voted = true;
        } else {
            // handle error
            console.log(response.status);
            promisePending = false;
        }
    }

</script>


<main class="image-list-container { opened ? 'opened' : '' }" bind:this={container} on:wheel={handleScroll} on:touchmove={handleTouchScroll} on:scroll={handleTouchScroll}>
    <section class="image-list">
        {#each data.artists as $artist, index}
            <button type="button" class="img-container { selected === index ? 'selected' : '' }" on:click={() => {handleItemOpen(index)}} tabindex={opened ? -1 : 0}>
                <img src="{$artist.backgroundImage}" alt="{$artist.fullName}" draggable="false">
                <md-focus-ring></md-focus-ring>
                
                {#if selected === index} 
                    <div class="content-container" out:fade={{duration: 100}}>
                        <div class="content">
                            <div class="heading-line">
                                <h1 class="display-medium semibold-weight">{$artist.fullName}</h1>
                                <md-icon-button on:click={closeContainer} role="button" tabindex=0 on:touchend={closeContainer} on:keyup={() => {}}>
                                    <md-icon class="material-symbols-outlined">close</md-icon>
                                </md-icon-button>
                            </div>
                            <div class="content-details">
                                <div class="right">
                                    <div class="card">
                                        <div class="body-large medium-weight artist-vote-count">{$artist.votes} votes</div>
                                        <h1 class="display-medium semibold-weight" style="font-size: 64px">N. 17</h1>
                                        {#if !voted}
                                            {#if !promisePending}
                                                <form action="?/updateartistvotes" method="POST" on:submit|preventDefault={handleSubmit}>
                                                    <input type="hidden" name="id" value={$artist.id}>
                                                    <button type="submit" class="vote-button label-large on-surface-text">
                                                        Cast Your Vote
                                                        <md-ripple></md-ripple>
                                                        <md-focus-ring></md-focus-ring>
                                                    </button>
                                                </form>
                                            {:else}
                                                <div>
                                                    <md-circular-progress indeterminate></md-circular-progress>
                                                </div>
                                            {/if}
                                        {:else}
                                            <p>Your vote has been cast!</p>
                                            <md-text-button href="/concerts">View leaderboards</md-text-button>
                                        {/if}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/if}
            </button>
        {/each}

        <div class="ending-filler">
            <md-text-button on:click={handleSignIn} role="button" tabindex=0 on:keyup={() => {}}>
                <!-- <md-icon slot="icon"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M500-360q42 0 71-29t29-71v-220h120v-80H560v220q-13-10-28-15t-32-5q-42 0-71 29t-29 71q0 42 29 71t71 29ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg></md-icon> -->
                <md-icon slot="icon" class="material-symbols-outlined" style="font-size: 17px;">account_circle</md-icon>
                Sign in
            </md-text-button>
        </div>
    </section>
</main>

<div class="section-underneath">
    <div class="column-text-outer" style="padding-top: 45px;">
        <h1 class="display-large bold-weight" style="translate: 0 100%; margin: 0;">Top Artists</h1>
    </div>
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
                scale: 0;
                // opacity: 0;

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
                    user-select: text;

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

                            .right {
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
                            // .left {
                            //     position: relative;
                            //     flex-grow: 0;
                            //     height: 100%;
                            //     flex-flow: column nowrap;
                            //     align-items: center;
                            //     justify-content: center;
                            //     animation: scale-fade-in var(--md-sys-motion-duration-medium3) 800ms forwards;

                            //     --md-text-button-container-size: 100px;

                            //     svg {
                            //         position: absolute;
                            //         top: 0;
                            //         left: 0;
                            //         width: 100%;
                            //         height: 100%;
                            //         .cls-1:nth-child(2) {
                            //             fill: var(--md-sys-color-surface-container-blurred);
                            //             stroke: none;
                                        
                            //         }
                            //         .cls-1:first-child {opacity: 0}
                            //     }
                            //     .button-content {
                            //         width: 100%;
                            //         height: 100%;
                            //         display: flex;
                            //         flex-flow: column nowrap;
                            //         gap: 20px;
                            //         align-items: center;
                            //         justify-content: center;
                            //         position: relative;
                            //         z-index: 1;
                            //     }
                            // }
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
            // width: calc(100vw - 40svh - 39px);
            width: calc(100vw + 88px);
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

    .vote-button {
        // all: unset;
        min-height: 48px;
        min-width: 48px;
        background: transparent;
        border-radius: 24px;
        padding: 0 16px;
        border: 1px solid var(--md-sys-color-outline);
        position: relative;
        transition: var(--md-sys-motion-duration-long1) var(--md-sys-motion-easing-emphasized);

        --md-ripple-hover-opacity: 0.05;

        md-ripple {border-radius: 24px;}

        &:focus-visible {
            outline: none;
        }
    }

    // .image-list-container, .section-underneath {
    //     animation: fade-in 0.5s 0s forwards;
    //     opacity: 0;
    // }
</style>


                                <!-- <div class="left">
                                    <div class="vote-button">
                                        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><defs></defs><path class="cls-1" d="M109,146.33a38.23,38.23,0,0,1-10.71-1.56L86.09,141.2a39.47,39.47,0,0,0-22.18,0l-12.18,3.57A38.41,38.41,0,0,1,41,146.33a37.6,37.6,0,0,1-29.88-15.14,37,37,0,0,1-5.9-32.91L8.8,86.09a39.29,39.29,0,0,0,0-22.18L5.23,51.73a37,37,0,0,1,5.9-32.91A37.59,37.59,0,0,1,41,3.67,38.41,38.41,0,0,1,51.73,5.23L63.91,8.8A39.23,39.23,0,0,0,75,10.39,39.23,39.23,0,0,0,86.09,8.8L98.28,5.23A38.28,38.28,0,0,1,109,3.67a37.6,37.6,0,0,1,29.88,15.14,37.06,37.06,0,0,1,5.9,32.92L141.2,63.91a39.29,39.29,0,0,0,0,22.18l3.57,12.19a37,37,0,0,1-5.9,32.9A37.61,37.61,0,0,1,109,146.33Z"/></svg>
                                        <div class="button-content">
                                            <div class="body-large bold-weight">Applause for Andreas</div>
                                        </div>
                                    </div>
                                </div> -->