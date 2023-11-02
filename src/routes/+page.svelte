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
        // mn.add('(pointer: coarse)', () => {
        //     ScrollTrigger.defaults({
        //         scroller: ".image-list-container",
        //         scrub: true,
        //         invalidateOnRefresh: true
        //     });
        // })
        // mn.add('(pointer: fine)', () => {
        //     ScrollTrigger.defaults({
        //         scrub: true,
        //         invalidateOnRefresh: true
        //     });
        // })

          
        gsap.set('#scrollDist', {
            width: '100%',
            height: gsap.getProperty('#app', 'height'), // apply the height of the image stack
            onComplete:()=>{
            gsap.set('#app, #imgGroup', {opacity:1, position:'fixed', width:'100%', height:'100%', top:0, left:0, perspective:300}) 
            gsap.set('#app img', {
                position: 'absolute',
                attr:{ id:(i,t,a)=>{ //use GSAP's built-in loop to setup each image
                initImg(i,t);
                return 'img'+i;
                }}
            })
            // window.scroll()
            gsap.timeline({
                defaults:{ duration:1 },
                onUpdate:()=>{ if (gsap.getProperty('#cursorClose','opacity')==1) closeDetail() }, //close detail view on scroll
                scrollTrigger:{
                trigger: '#scrollDist',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true
            }})
            // .fromTo('#txt1', {scale:0.6, transformOrigin:'50%'}, {scale:2, ease:'power1.in'}, 0)
            // .to('#txt1 path', {duration:0.3, drawSVG:0, stagger:0.05, ease:'power1.in'}, 0)
            .fromTo('.imgBox', {z:-5000}, {z:350, stagger:-0.3, ease:'none'}, 0)
            .fromTo('.imgBox img', {scale:3}, {scale:1.15, stagger:-0.3, ease:'none'}, 0)      
            .to('.imgBox', {duration:0, pointerEvents:'auto', stagger:-0.3}, 0.2)
            .from('.imgBox img', {duration:0.3, opacity:0, stagger:-0.3, ease:'power1.inOut'}, 0)
            .to('.imgBox img', {duration:0.1, opacity:0, stagger:-0.3, ease:'expo.inOut'}, 0.9)      
            .to('.imgBox', {duration:0, pointerEvents:'none', stagger:-0.3}, 0.97)
            .add('end')
            // .fromTo('#txt2', {scale:0.1, transformOrigin:'50%'},{scale:0.6, ease:'power3'}, 'end-=0.2')
            // .from('#txt2 path', {duration:0.4, drawSVG:0, ease:'sine.inOut', stagger:0.15}, 'end-=0.2')      
                    
            // intro animation
            gsap.from(window, {duration:1.4, scrollTo:gsap.getProperty('#scrollDist', 'height'), ease:'power2.in'});
            gsap.from('.imgBox', {duration:0.2, opacity:0, stagger:0.06, ease:'power1.inOut'})
            }  

        })  
        
        function initImg(i,t){
            const box = document.createElement('div') // make a container div
            box.appendChild(t) // move the target image into the container
            document.getElementById('imgGroup').appendChild(box) // put the container into the imgGroup div
            gsap.set(box, {
                pointerEvents:'none',
                position:'absolute',
                attr:{ id:'box'+i, class:'imgBox' },
                width:t.width,
                height:t.height,
                overflow:'hidden',
                top:'50%',
                left:'50%',
                x:t.dataset.x,
                y:t.dataset.y,
                xPercent:-50,
                yPercent:-50,
                perspective:500,
                borderRadius: 25
            })

            t.onmouseover =()=> gsap.to('#cursorCircle', {duration:0.2, attr:{r:30, 'stroke-width':4}})
            
            t.onmousedown =()=> {
            gsap.to(t, {z:-25, ease:'power2'})
            gsap.to('#cursorCircle', {attr:{r:40}, ease:'power3'})
            }
            
            t.onmouseup =()=> gsap.to(t, {z:0, ease:'power1.inOut'})
            
            t.onmouseout =()=> gsap.to('#cursorCircle', {duration:0.2, attr:{r:11, 'stroke-width':3}})
            
            t.onclick =()=> showDetail(t)
        }  
        
        function showDetail(t){
            // gsap.timeline()
            //     .set('#detailTxt', {textContent:t.alt}, 0)
            //     .set('#detailImg', {background:'url('+t.src+') center no-repeat'}, 0)
            //     .fromTo('#detail', {top:'100%'}, {top:0, ease:'expo.inOut'}, 0)
            //     .fromTo('#detailImg', {y:'100%'}, {y:'0%', ease:'expo', duration:0.7}, 0.2)
            //     .fromTo('#detailTxt', {opacity:0}, {opacity:1, ease:'power2.inOut'}, 0.4)
            //     .to('#cursorCircle', {duration:0.2, opacity:0}, 0.2)
            //     .to('#cursorClose', {duration:0.2, opacity:1}, 0.4)
        }
        
        function closeDetail(){
            // gsap.timeline()
            //     .to('#detailTxt', {duration:0.3, opacity:0}, 0)    
            //     .to('#detailImg', {duration:0.3, y:'-100%', ease:'power1.in'}, 0)
            //     .to('#detail', {duration:0.3, top:'-100%', ease:'expo.in'}, 0.1)
            //     .to('#cursorClose', {duration:0.1, opacity:0}, 0)
            //     .to('#cursorCircle', {duration:0.2, opacity:1}, 0.1)
        }
        // document.getElementById('detail').onclick = closeDetail;
        
        if (ScrollTrigger.isTouch==1) { // on mobile, hide mouse follower + remove the x/y positioning from the images
            gsap.set('#cursor', {opacity:0}) 
            gsap.set('.imgBox', {x:0, y:0})
        } else {
            
            // quickTo can be used to optimize x/y movement on the cursor...but it doesn't work on fancier props like 'xPercent'
            let cursorX = gsap.quickTo('#cursor', 'x', {duration:0.3, ease:'power2'})
            let cursorY = gsap.quickTo('#cursor', 'y', {duration:0.3, ease:'power2'})
            
            window.onmousemove =(e)=> {      
                gsap.to('.imgBox', { // move + rotate imgBoxes relative to mouse position
                    xPercent:-e.clientX/innerWidth*100,
                    yPercent:-25-e.clientY/innerHeight*50,
                    rotateX:8-e.clientY/innerHeight*16,
                    rotateY:-8+e.clientX/innerWidth*16
                })
                
                gsap.to('.imgBox img', { // move images inside each imgBox, creates additional parallax effect
                    xPercent:-e.clientX/innerWidth*10,
                    yPercent:-5-e.clientY/innerHeight*10
                })
                
                // mouse follower
                cursorX(e.clientX)
                cursorY(e.clientY)
            }
        }

        // ScrollTrigger.refresh(true);
        // setTimeout(() => {
        //     ScrollTrigger.refresh(true);
        // }, 150)

        const lenis = new Lenis({
            lerp: 0.07,
            infinite: true
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

<!-- <div class="navbar-filler"></div> -->

<div id="scrollDist"></div>
<div id="app">  
  <div id="imgGroup">
    <img src="https://picsum.photos/id/100/1000/800" data-x="300" data-y="0" alt="Sepia tone beach">
    <img src="https://picsum.photos/id/111/1000/800" data-x="200" data-y="250" alt="Vintage car">
    <img src="https://picsum.photos/id/140/1000/800" data-x="-100" data-y="-150" alt="Bare tree">
    <img src="https://picsum.photos/id/160/1000/800" data-x="-500" data-y="50" alt="Bottom edge of a phone">
    <img src="https://picsum.photos/id/180/1000/800" data-x="-60" data-y="-10" alt="Laptop and Moleskine">
    <img src="https://picsum.photos/id/198/1000/800" data-x="-200" data-y="-200" alt="Grassy hillside">
    <img src="https://picsum.photos/id/210/1000/800" data-x="100" data-y="-150" alt="Bricks and mortar">
    <img src="https://picsum.photos/id/220/1000/800" data-x="-300" data-y="50" alt="Foggy train tracks">
    <img src="https://picsum.photos/id/240/1000/800" data-x="-50" data-y="-200" alt="Stairs to water">
    <img src="https://picsum.photos/id/260/1000/800" data-x="-120" data-y="60" alt="Snowy mountain forest">
    <img src="https://picsum.photos/id/280/1000/800" data-x="400" data-y="-100" alt="Rocky jetty">
    <img src="https://picsum.photos/id/360/1000/800" data-x="-60" data-y="150" alt="Peachy flowers">
    <img src="https://picsum.photos/id/320/1000/800" data-x="-200" data-y="200" alt="City street">
    <img src="https://picsum.photos/id/340/1000/800" data-x="300" data-y="-120" alt="Mossy tree">
    {#each data.artists as $artist, index}
        <!-- <img src="{$artist.backgroundImage}" data-x="{() => {Math.floor(-500 + Math.random() * 500)}}" data-y="{() => {Math.floor(-500 + Math.random() * 500)}}" alt="Sepia tone beach"> -->
    {/each}
  </div>
  
  <div id="detail">
    <div id="detailImg"></div>
    <div id="detailTxt"></div>
  </div>

  <svg width="100%" height="100%" fill="none" stroke="#fff">
    <g id="cursor">
      <circle id="cursorCircle" cx="0" cy="0" r="12" stroke-width="3"/>
      <path id="cursorClose" d="M-25,-25 L25,25 M-25,25 L25,-25" opacity="0" stroke-width="3.5"/>
    </g>
  </svg>

  {#if data.bingus}
      <div class="imgBox"></div>
  {/if}
</div>


<style lang="scss">
    #app {
        width:100%;
        margin:0;
        padding:0;
        font-size:0;
        // position: relative;
        // z-index: 1;
        opacity:0;
        height: 10000px;
        // background:radial-gradient(#ccc, #999);

        img {
            display: block;
        }

        .imgBox {
            overflow: hidden;
            border-radius: 80px;

            img {
                border-radius: 80px;
            }
        }
    }
    #detail {
        position:absolute;
        width:100%;
        height:100%;
        background:#111;
        top:100%;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-evenly;
    }

    #detailImg {
        width:85%;
        height:85%;
    }

    #detailTxt {
        color:#ccc;
        font-size:20px;
        letter-spacing:1px;
    }
    // .image-list-container {
    //     width: 100%;
    //     position: relative;
    //     z-index: 1;
    //     box-sizing: border-box;
    //     user-select: none;
    //     display: grid;
    //     grid-template-columns: 1fr 1fr;
    //     place-items: center;
    //     gap: 300px 0;
    //     // flex-flow: column nowrap;
    //     // align-items: center;
    //     // justify-content: center;

    //     .title-large {
    //         font-family: 'Playfair Display', serif;
    //         grid-column: span 2;
    //         font-size: 64px;
    //         font-weight: 500;
    //         padding-top: 75px;
    //         // font-style: italic;
    //     }

    //     @media (max-width: 560px) {
    //         // gap: 100px 20px;
    //         // padding: 1rem;
    //     }

    //     @media (pointer: coarse) {
    //         height: 100%;
    //         overflow-x: hidden;
    //         overflow-y: visible;
    //         scroll-snap-type: y mandatory;
    //     }

    //     .img-container {
    //         width: 400px;
    //         height: 300px;
    //         display: flex;
    //         align-items: center;
    //         justify-content: center;
    //         text-decoration: none;
    //         color: black;
            
    //         &:nth-of-type(even) {
    //             translate: 0 250px;
    //        }

    //         .card-content {
    //             width: 100%;
    //             height: 100%;
    //             display: flex;
    //             flex-flow: column nowrap;
    //             overflow: hidden;
    //             border-radius: 8px;
    //             background: var(--md-sys-color-surface-container-blurred);
    //             // background-image: url("data:image/svg+xml,%3C!-- svg: first layer --%3E%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    //             transition: 0.6s cubic-bezier(0.86, 0, 0.07, 1);
    //             .image-wrapper {
    //                 width: 100%;
    //                 height: 100%;
    //                 flex: 1;
    //                 position: relative;
    //                 img {
    //                     width: 100%;
    //                     height: 102%;
    //                     object-fit: cover;
    //                     border-radius: 8px;
    //                     transition: 0.6s cubic-bezier(0.86, 0, 0.07, 1) filter;
    //                 }
    //                 .line1, .line2 {
    //                     position: absolute;
    //                     top: 50%;
    //                     left: 50%;
    //                     translate: -50% -50%;
    //                     background: rgb(255, 255, 255);
    //                     box-sizing: border-box;
    //                     scale: 0;
    //                     transition: 0.6s cubic-bezier(0.86, 0, 0.07, 1);
    //                 }
    //                 .line1 {height: 1px; width: 45px; transition-delay: 0.1s;}
    //                 .line2 {height: 45px; width: 1px; transition-delay: 0.15s;}
    //             }
    //             .text {
    //                 height: 0px;
    //                 flex: 0 0 0;
    //                 transition: 0.6s cubic-bezier(0.86, 0, 0.07, 1) height, 0.6s cubic-bezier(0.86, 0, 0.07, 1) padding;
    //                 box-sizing: border-box;
    //                 padding: 0 15px;
    //                 display: flex;
    //                 align-items: center;
    //                 gap: 15px;
    //                 justify-content: space-between;
    //                 padding-left: 15px;
    //                 h2 {
    //                     margin: 0;
    //                     font-family: 'Playfair Display', sans-serif;
    //                     font-style: italic;
    //                     font-weight: 500;
    //                     font-size: 20px;
    //                 }
    //             }

    //             &:hover {
    //                 padding: 10px 10px 0 10px;
    //                 height: 107.5%;
    //                 img {
    //                     filter: contrast(0.65);
    //                 }
    //                 .text {
    //                     height: 56px;
    //                     padding: 12px 12px 12px 0;
    //                 }
    //                 .line1, .line2 {scale: 1; rotate: 90deg;}
    //             }
    //         }
    //     }
    // }
</style>