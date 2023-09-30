<script>
    import { page } from "$app/stores";
    import gsap from "gsap";
    import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
    import { app } from "$lib/index.js";
    import { user, voted } from "$lib/auth.js";

    export let data;

    let artist = data.leaderboard.find(artist => $page.url.pathname.includes(artist.id));
    const artistPosition = data.leaderboard.findIndex(artist => $page.url.pathname.includes(artist.id)) + 1;

    let x, y, distanceX, distanceY, artistCard;

    function handleMouseMove(e) {
        [x, y] = [e.clientX, e.clientY];
        [distanceX, distanceY] = 
            [x - artistCard.offsetLeft - artistCard.offsetWidth / 2, y - artistCard.offsetTop - artistCard.offsetHeight / 2];
        gsap.to(artistCard, {
            rotationX: distanceY / 20, 
            rotationY: distanceX / 20, 
            perspective: '10px',
            transformStyle: 'preserve-3d',
            duration: 0.5, 
            ease: "power2.out"
        })
    }

    const handleSignIn = () => {
        if ($user !== null) return;
        const auth = getAuth(app);
        signInWithRedirect(auth, new GoogleAuthProvider())
    }

    let promisePending = false;
    let promise;
    const handleSubmit = async (event) => {
        if (promisePending) {
            console.log('Promise already pending');
            return;
        };
        promisePending = true;
        
        const formData = new FormData(event.target);

        promise = await fetch("?/updateartistvotes", {
            method: "POST",
            body: formData
        })

        if (promise.ok) {
            const responseData = await promise.json();
            const parsedData = JSON.parse(responseData.data);
            // array item 0 contains the corresponding names and the rest of the items contain values of those names
            artist = {...artist, votes: parsedData[3]}
            data = data;
            promisePending = false;
            console.log(parsedData);
            if (parsedData[1] === true) {
                setVoted(formData.get("id"));
            }
        } else {
            // handle error
            console.log(promise.status);
            promisePending = false;
        }
    }


</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<section class="container">
    <div class="grid">
        <div class="back-button-container">
            <md-text-button href="/">
                <md-icon slot="icon" class="material-symbols-outlined" style="font-size: 17px;">arrow_back</md-icon>
                Back
            </md-text-button>
        </div>
        <div class="artist-card" bind:this={artistCard} id="artist-{artist.id}">
            <div class="card-content">
                <div class="image-parallax-wrapper">
                    <img src="{artist.backgroundImage}" alt="{artist.name}" draggable="false">
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
                                <div class="column-text-inner difference">{artist.name}</div>
                                <div class="column-text-inner opaque">{artist.name}</div>
                            </div>
                            <div class="lines-wrapper">
                                <div class="line-opaque"></div>
                                <div class="line-difference"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <md-ripple></md-ripple>
                <md-focus-ring for="artist-{artist.id}"></md-focus-ring>
            </div>
        </div>
        <div class="leaderboard-card surface-container-blurred">
            <div class="body-large">Leaderboard Position</div>
            <div class="display-large bold-weight">#{artistPosition}</div>
            <div class="body-large"><span class="bold-weight">{artist.votes}</span> Votes</div>
        </div>
        {#if $user !== null}
        <button class="button" on:click={handleSignIn} type="submit" form="vote-form">
            <form action="?/updateartistvotes" method="POST" id="vote-form" on:submit|preventDefault={handleSubmit}>
                <input type="hidden" name="id" value={artist.id}>
            </form>
            <span class="medium-weight label-large primary-text">Cast Your Vote!</span>
            <div style="opacity: 0"></div>
            <md-focus-ring></md-focus-ring>
            <md-ripple></md-ripple>
        </button>
        {:else}
        <button class="button" on:click={handleSignIn}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M18.1713 8.36775H17.5001V8.33317H10.0001V11.6665H14.7097C14.0226 13.6069 12.1763 14.9998 10.0001 14.9998C7.23883 14.9998 5.00008 12.7611 5.00008 9.99984C5.00008 7.23859 7.23883 4.99984 10.0001 4.99984C11.2747 4.99984 12.4342 5.48067 13.3172 6.26609L15.6742 3.909C14.1859 2.52192 12.1951 1.6665 10.0001 1.6665C5.398 1.6665 1.66675 5.39775 1.66675 9.99984C1.66675 14.6019 5.398 18.3332 10.0001 18.3332C14.6022 18.3332 18.3334 14.6019 18.3334 9.99984C18.3334 9.44109 18.2759 8.89567 18.1713 8.36775Z" fill="#FFC107"/>
                <path d="M2.62744 6.12109L5.36536 8.129C6.10619 6.29484 7.90036 4.99984 9.99994 4.99984C11.2745 4.99984 12.4341 5.48067 13.317 6.26609L15.6741 3.909C14.1858 2.52192 12.1949 1.6665 9.99994 1.6665C6.79911 1.6665 4.02327 3.47359 2.62744 6.12109Z" fill="#FF3D00"/>
                <path d="M10 18.3331C12.1525 18.3331 14.1084 17.5094 15.5871 16.1698L13.008 13.9873C12.1713 14.621 11.1313 14.9998 10 14.9998C7.83255 14.9998 5.99213 13.6177 5.2988 11.689L2.5813 13.7827C3.96047 16.4815 6.7613 18.3331 10 18.3331Z" fill="#4CAF50"/>
                <path d="M18.1712 8.36808H17.5V8.3335H10V11.6668H14.7096C14.3796 12.5989 13.78 13.4027 13.0067 13.9881L13.0079 13.9872L15.5871 16.1697C15.4046 16.3356 18.3333 14.1668 18.3333 10.0002C18.3333 9.44141 18.2758 8.896 18.1712 8.36808Z" fill="#1976D2"/>
            </svg>
            <span class="medium-weight label-large primary-text">Vote With Google</span>
            <md-focus-ring></md-focus-ring>
            <md-ripple></md-ripple>
        </button>
        {/if}
    </div>
</section>

<style lang="scss">
    .container {
        flex: 1 1 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
        padding-left: 128px;

        @media (max-width: 560px) {
            padding: 20px 20px 20px 20px;
            // box-sizing: content-box;
            align-items: flex-start;

            div.grid {
                padding-bottom: 100px;
                .artist-card, .leaderboard-card {grid-column: span 5}
                .leaderboard-card {
                    gap: 20px;
                    .display-large {font-size: var(--md-sys-typescale-display-medium-font-size)}
                    .body-large {font-size: var(--md-sys-typescale-body-medium-font-size)}
                }
                .artist-card {
                    max-width: auto;
                    width: 100%;
                    max-height: 40vh;
                    max-height: 40svh;
                }
            }
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
            
            .back-button-container {
                grid-column: span 5;
                // --md-filled-tonal-button-hover-container-elevation: 0;
            }
            .artist-card {
                grid-column: span 3;
            }
            .leaderboard-card {
                grid-column: span 2;
                display: flex;
                padding: 20px 0px;  
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                flex: 1 0 0;
                align-self: stretch;
                border-radius: 24px;
            }
            .button {
                all: unset;
                grid-column: span 5;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                height: 56px;
                border-radius: 56px;
                outline: 1px solid var(--md-sys-color-outline);
                position: relative;
                cursor: pointer;

                --md-ripple-hover-opacity: 0.025;
            }

        }
    }

    .artist-card {
        all: unset;
        position: relative;
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        gap: 10px;
        max-width: 450px;
        user-select: none;

        // animation: fade-in var(--md-sys-motion-duration-short4) var(--md-sys-motion-duration-medium4) var(--md-sys-motion-easing-emphasized) forwards;
        // opacity: 0;

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
                // scale: 1.1;
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
                    transition: var(--md-sys-motion-duration-long4) cubic-bezier(0.175, 0.885, 0.32, 1.275) rotate;
                    rotate: 90deg;
                    mix-blend-mode: difference;
                    color: var(--md-sys-color-surface);

                    &:nth-child(1) {top: 40px; left: 40px}
                    &:nth-child(2) {bottom: 40px; left: 40px}
                    &:nth-child(3) {top: 40px; right: 40px}
                    &:nth-child(4) {bottom: 40px; right: 40px}
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
                        filter: drop-shadow(0 0 0.75rem var(--md-sys-color-on-surface));
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
                                background-color: var(--md-sys-color-on-surface);
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
                                // mix-blend-mode: difference;
                                color: var(--md-sys-color-on-surface);
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
                background-color: rgba(255,255,255,0.2);
    
                @media (prefers-color-scheme: dark) {
                    background-color: rgba(0,0,0,0.225);
                }
            }

            @media (pointer: fine) {
                &:hover {
                    .image-parallax-wrapper img {
                        scale: 1.05 !important;
                        filter: blur(5px);
                    }
                    .overlay {
                        .plus-icon {
                            rotate: 0deg;
                            mix-blend-mode: normal;
                            color: var(--md-sys-color-on-surface);
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
    
                        @media (prefers-color-scheme: dark) {
                            background-color: rgba(0,0,0,0.35);
                        }
                    }
                }
            }
        }
        &:focus-visible {
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
</style>





























