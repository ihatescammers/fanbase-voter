<script>
    import { page } from "$app/stores";
    import gsap from "gsap";
    import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import { app } from "$lib/index.js";
    import { user, voted, setVoted } from "$lib/auth.js";

    export let data;

    let artist = data.leaderboard.find(artist => $page.url.pathname.includes(artist.id));
    const artistPosition = data.leaderboard.findIndex(artist => $page.url.pathname.includes(artist.id)) + 1;

    let x, y, distanceX, distanceY, artistCard;

    const handleSignIn = () => {
        if ($user !== null) return;
        const auth = getAuth(app);
        signInWithPopup(auth, new GoogleAuthProvider())
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
            promisePending = false;
            console.log(parsedData)
            if (parsedData[1] === true) {
                setVoted(formData.get("id"));
                voted.set(true);
            }
        } else {
            // handle error
            console.log(promise.status);
            promisePending = false;
        }
    }


</script>

<div class="container flex-col">
    <a href="/artist/{artist.id}" class="card">
        <div class="overlay-image">
            <img src="https://static.vecteezy.com/system/resources/previews/022/012/091/original/grunge-dots-and-points-texture-background-abstract-grainy-overlay-graphic-illustration-with-transparent-background-png.png" alt="grain">
        </div>
        <div class="image-circle">
            <img src="{artist.backgroundImage}" alt="{artist.name}">
            <img src="{artist.backgroundImage}" alt="{artist.name}">
        </div>
        <div class="text-wrapper">
            <div class="top-text label-small">{artist.votes} votes</div>
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
                <div class="headline-medium column-text-outer">
                    <div><i>{artist.name}</i></div>
                    <div><i>{artist.name}</i></div>
                </div>
            </div>
            <div class="bottom-text label-small">{artist.votes} votes</div>
            <div class="dots">
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        </div>
    </a>
    <a href="/categories" class="cursor-pointer translucent-background translucent-background-hover rounded-full h-12 w-full max-w-[350px] flex items-center justify-center">Vote for {artist.name}</a>
    <a on:click={() => {history.back()}} class="cursor-pointer translucent-background translucent-background-hover rounded-full h-12 w-full max-w-[350px] flex items-center justify-center">Go back</a>
    <!-- <div class="voter-card">
        <div class="votes">
            <h1 class="display-medium playfair">{artist.votes}</h1>
            <p class="playfair body-large"><i>votes</i></p>
        </div>
        <div class="filler"></div>
        <a class="large-button inverse">Vote with Google</a>
    </div> -->
</div>

<style lang="scss">
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        gap: 10px;

        --card-height: 600px;

        .card {
            max-width: 350px;
            width: 350px;
            height: var(--card-height);
            &:nth-of-type(3n - 2) {translate: 0 0}
            &:nth-of-type(3n - 1) {translate: 0 100px}
            &:nth-of-type(3n) {translate: 0 200px}

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
        }
        @media (max-width: 1200px) {
            grid-template-columns: 1fr 1fr;

            .card {
                &:nth-of-type(3n) {translate: none}
                &:nth-of-type(3n - 2) {translate: none}
                &:nth-of-type(3n - 1) {translate: none}

                &:nth-of-type(even) {translate: 0 75px}
            }
        }
        @media (max-width: 560px) {
            gap: 20px 10px;
            .card {
                .text-wrapper {
                    min-height: none;
                    gap: 15px;

                    .card-title {
                        .headline-small, .headline-medium, .title-medium, .title-large {
                            font-size: 20px;
                            height: 26.4px;
                        }
                        svg {
                            scale: 0.9;
                        }
                    }
                }
            }
        }
        
        @media (max-width: 560px) {
            padding: 20px 20px 20px 20px;
        }
    }
    .card {
            background-color: var(--translucent-background);
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

            .text-wrapper {
                color: var(--beige);
                display: flex;
                flex-flow: column nowrap;
                min-height: 225px;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                padding-top: 18px;
                padding: 0px 0 6px 0;
                width: 100%;
                gap: 45px;
                .card-title {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    .headline-small, .headline-medium, .title-medium, .title-large {
                        font-family: 'Playfair Display';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        translate: -50% -50%;
                        width: 100%;
                        text-align: center;
                        // background: var(--translucent-background);
                        // padding: 6px 0;
                        height: 42px;
                        font-weight: 500;
                        i {font-weight: 600}
                        div {
                            transition: translate var(--hover-transition);
                            &:nth-child(2) {font-weight: 800}
                        }
                    }
                    svg {scale: 0.95;}
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
                        transition: var(--hover-transition);
                        clip-path: circle(42.5% at 50% 50%);
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
                    .image-circle img:nth-child(2) {
                        clip-path: circle(0% at 50% 50%);
                        rotate: 10deg;
                        // filter: blur(2.5px);
                    }
                }
                // &:nth-of-type(odd):hover {.image-circle img:nth-child(2) {rotate: 15deg}}
                // &:nth-of-type(even):hover {.image-circle img:nth-child(2) {rotate: -15deg}}
            }
        }
</style>





























