<script>
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import CustomEase from "gsap/dist/CustomEase";
    import ScrollTrigger from "gsap/dist/ScrollTrigger";
    import Lenis from '@studio-freight/lenis';

    export let data;

    let currentYear = new Date().getFullYear();

    let loaded = false;

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.defaults({
            invalidateonRefresh: true
        })

        initialAnimations();
        // loaded = true;
        
        // const lenis = new Lenis({});
        // function raf(time) {
        //     lenis.raf(time)
        //     requestAnimationFrame(raf)
        // }
        // requestAnimationFrame(raf)

        let mn = gsap.matchMedia();
        mn.add("(pointer: fine)", () => {
            gsap.to('.about-container .backgroundimage', {
                scale: 1.25,
                filter: 'blur(20px) brightness(0.33)',
                scrollTrigger: {
                    trigger: '.about-container .backgroundimage',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            })
            gsap.utils.toArray('.about-container .inner-about-image').forEach((elem) => {
                gsap.fromTo(elem, {
                    scale: 1.25,
                    yPercent: -12.5
                }, {
                    scale: 1.25,
                    yPercent: 12.5,
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                })
            })

        })
        
        gsap.utils.toArray('.about-container .subheading .subheading-text').forEach((elem) => {
            gsap.to(elem, {
                y: 0,
                ease: "quint.out",
                duration: 0.75,
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 90%',
                }
            })
        })
        gsap.utils.toArray('.about-container .translate-100').forEach((elem, index) => {
            gsap.to(elem, {
                y: 0,
                ease: "quint.out",
                duration: 1,
                delay: index * 0.025,
                scrollTrigger: {
                    trigger: elem,
                    start: 'top 90%',
                }
            })
        })


        return () => {
            lenis.destroy();
            ScrollTrigger.killAll();
        }
    })

    function initialAnimations() {
        const tl = gsap.timeline();
        tl.to('.bar-container .beige-bar', {
            width: '100%',
            duration: 1,
            ease: "expo.inOut"
        })
        tl.to('.bar-container .transparent-bar', {
            width: '100%',
            duration: 1,
            ease: "expo.inOut"
        })
        tl.to('.bar-container .beige-bar', {
            width: '0%',
            duration: 1,
            ease: "expo.inOut"
        }, "<")
        tl.set('.bar-container', {display: 'none'})
        tl.set('.loader .text-container', {display: 'block'})
        tl.to('.loader .text-container h1', {
            y: 0,
            ease: "quint.out",
            duration: 1,
            onComplete: () => {
                loaded = true;
                tl.set('.loader', {display: 'none'})
            }
        })
    }
</script>

<div class="about-container w-full flex flex-col items-center relative {loaded ? '' : 'h-screen overflow-hidden'}">
    <div class="loader absolute w-full h-screen top-0 left-0 z-10 flex items-center justify-center flex-col gap-3">
        <div class="bar-container h-1 rounded-full overflow-hidden w-64 flex">
            <div class="transparent-bar"></div>
            <div class="beige-bar beige"></div>
        </div>
        <div class="text-container column-text-outer hidden">
            <h1 class="display-large playfair relative z-1 text-center" style="translate: 0 100%">{@html data.about.title}</h1>
        </div>
    </div>
    <div class="flex flex-wrap w-full h-screen flex-shrink-0 items-center justify-center relative overflow-hidden {loaded ? '' : 'opacity-0'} transition-opacity duration-500">
        <img class="backgroundimage object-cover h-screen w-full absolute top-0 left-0" 
            style="filter: blur(0px) brightness(0.33)" src="{data.about.backgroundimage}" alt="concert">
        <h1 class="display-large playfair relative z-1 drop-shadow-md text-center">{@html data.about.title}</h1>
    </div>
    <div class="flex flex-col gap-12 py-12 w-80 md:w-96 lg:w-[36rem] xl:w-[42rem]">
        {#each data.about.data as block}
            {#if block.type == "text" || block.type == "Text"}
                <p class="text-base">{@html block.content}</p>
            {:else if block.type == "image" || block.type == "Image"}
                <div class="column-text-outer w-full" style="aspect-ratio: 3/2">
                    <img class="inner-about-image w-full h-full object-cover rounded-lg" src="{block.content}" alt="about stan awards">
                </div>
            {:else if block.type == "heading" || block.type == "Heading"}
                <div class="column-text-outer subheading">
                    <div class="subheading-text display-medium playfair pt-6 text-center" style="translate: 0 100%"><i>{@html block.content}</i></div>
                </div>
            {/if}
        {/each}
        <div></div>
    </div>
    <footer class="footer w-full p-3 pr-4">
        <div class="flex flex-col w-full py-6 px-9 gap-12 translucent-background rounded-lg relative">
            <div class="absolute top-0 left-0 w-full h-full z-0 opacity-10 pointer-events-none">
                <img class="blur-2xl object-cover h-full w-full" src="https://as1.ftcdn.net/v2/jpg/01/40/12/92/1000_F_140129299_rdGmmAN13sm04eJchcULL3Szt5BJ7bVp.jpg" alt="concert background">
            </div>
            <div class="flex w-full justify-between relative z-10">
                <div class="flex flex-col gap-1.5">
                    <ul class="flex flex-col gap-1">
                        {#each data.about.footer.sponsors as sponsor, index}
                        <li class="column-text-outer {index === 0 ? 'playfair title-large pb-1.5 font-bold': 'pl-0'}">
                            <div class="translate-100">{sponsor}</div>
                        </li>
                        {/each}
                    </ul>
                </div>
                <div class="flex flex-col gap-1.5 sm:w-1/4">
                    <ul class="flex flex-col gap-1">
                        <li class="playfair column-text-outer title-large pb-1.5 font-bold"><div class="translate-100">Links:</div></li>
                        <li class="column-text-outer"><div class="translate-100"><a href="/" class="font-semibold pl-0 hover:underline">Home</a></div></li>
                        <li class="column-text-outer"><div class="translate-100"><a href="/leaderboard" class="font-semibold pl-0 hover:underline">Leaderboard</a></div></li>
                        <li class="column-text-outer"><div class="translate-100"><a href="/categories" class="font-semibold pl-0 hover:underline">Categories</a></div></li>
                        <li class="column-text-outer"><div class="translate-100"><a href="/concerts" class="font-semibold pl-0 hover:underline">Concerts</a></div></li>
                        <li class="column-text-outer"><div class="translate-100"><a href="/shop" class="font-semibold pl-0 hover:underline">Shop</a></div></li>
                    </ul>
                </div>
            </div>
            <div class="title-medium playfair relative z-10 column-text-outer">
                <div class="translate-100">Copyright &copy; <i>Stan Awards</i> {currentYear}. All Rights Reserved.</div>
            </div>
            <div class="w-full h-0.5 beige opacity-10 relative z-10"></div>
            <div class="flex gap-9 items-end hidden lg:flex">
                <div class="font-bold text-7xl lg:text-[210px]">Stan</div>
                <div class="font-bold text-7xl italic playfair">Awards</div>
            </div>
        </div>
    </footer>
</div>

<style lang="scss">
    @media (max-width: 640px) {
        .about-container {
            z-index: 0;
            translate: 0 -72px;
        }
    }
</style>