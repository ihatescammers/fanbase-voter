<script>
  import { page } from '$app/stores';
  import gsap from 'gsap';
  import CustomEase from "gsap/dist/CustomEase";
  import { onMount } from 'svelte';

  import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
  import { GoogleAuthProvider, signInWithRedirect, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
  import { app } from '$lib/index.js';
  import { user } from '$lib/auth';
  
  let loggedIn = false;
  user.subscribe((value) => {
    value === null ? loggedIn = false : loggedIn = true;
  })
  
  onMount(async () => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("emphasized", "M0,0 C0.05,0 0.13333,0.06 0.16666,0.4 0.20833,0.82 0.25,1 1,1 ");
    
    let mn = gsap.matchMedia();
    const navtl = gsap.timeline();

    // mn.add("(min-width: 560px)", () => {
    //   navtl.resume();
    //   navtl.set('.navrail', {height: 88, scale: 0, y: window.innerHeight / 2 - 44 - 20, borderRight: '2px solid var(--md-sys-color-primary)', rotate: 420});
    //   navtl.set('.nav-search-button, .navrail-button, .profile-button', {scale: 0, opacity: 0});
    //   navtl.to('.navrail', {
    //     scale: 1,
    //     ease: "elastic.out(1, 0.5)",
    //     duration: 0.85,
    //     delay: 1
    //   });
    //   navtl.to('.navrail', {
    //     rotate: 0,
    //     ease: "cubic.inOut",
    //     duration: 1
    //   }, "<")
    //   navtl.to('.navrail', {
    //     borderColor: 'rgba(0,0,0,0)',
    //     duration: 0.25,
    //   }, ">-=0.15")
    //   navtl.to('.navrail', {
    //     y: 0,
    //     height: 'calc(100% - 40px)',
    //     ease: "emphasized",
    //     duration: 1
    //   },"<+=0.1")
    //   navtl.to('.nav-search-button, .navrail-button, .profile-button', {
    //     opacity: 1,
    //     scale: 1,
    //     stagger: 0.1,
    //     duration: 0.75,
    //     ease: "elastic.out(1, 0.5)"
    //   }, "<+=0.25");
    // })

    mn.add("(max-width: 560px)", () => {
      // document.querySelector('.navrail').style = '';
      // document.querySelectorAll('.navrail-button, .navrail md-icon-button').forEach(button => {button.style = ''})
    })

  })

  const handleSignIn = () => {
      if (loggedIn) return;
      const auth = getAuth(app);
      signInWithRedirect(auth, new GoogleAuthProvider())
    }

  const logout = async () => {
		const auth = getAuth(app);
		signOut(auth);
	};
  let menuOpened;
  function openMenu() {
    menuOpened = !menuOpened;
  }
</script>

<!-- <nav class="navrail" style="position: fixed;">
  <md-icon-button class="nav-search-button"  on:click={logout} role="button" tabindex=0 on:keyup={() => {}}>
    <md-icon class="material-symbols-outlined">search</md-icon>
  </md-icon-button>
  <div class="divider"></div>
  <a href="/" data-sveltekit-noscroll class="navrail-button { $page.url.pathname === '/' ? 'active' : '' }" aria-label="artists" id="artists">
      <span class="icon material-symbols-outlined">
        library_music
        <md-ripple for="artists"></md-ripple>
        <md-focus-ring for="artists"></md-focus-ring>
      </span>
      <div class="text">Vote</div>
  </a>
  <a href="/leaderboard" data-sveltekit-noscroll class="navrail-button { $page.url.pathname === '/leaderboard' ? 'active' : '' }" aria-label="leaderboard" id="leaderboard">
      <span class="icon material-symbols-outlined">
        social_leaderboard
        <md-ripple for="leaderboard"></md-ripple>
        <md-focus-ring for="leaderboard"></md-focus-ring>
      </span>
      <div class="text">Top Artists</div>
  </a>
  <a href="/concerts" data-sveltekit-noscroll class="navrail-button { $page.url.pathname.includes('/concerts') ? 'active' : '' }" aria-label="Concerts" id="Concerts">
      <span class="icon material-symbols-outlined">
        celebration
        <md-ripple for="Concerts"></md-ripple>
        <md-focus-ring for="Concerts"></md-focus-ring>
      </span>
      <div class="text">Concerts</div>
  </a>
  <div class="filler"></div>
  <md-icon-button class="nav-search-button {loggedIn ? 'profile-button' : ''}" on:click={handleSignIn} role="button" tabindex=0 on:keyup={() => {}}>
  {#if !loggedIn}
    <md-icon class="material-symbols-outlined">account_circle</md-icon>
  {:else}
      <img src={$user.photoURL} alt="profile">
  {/if}
  </md-icon-button>

  <style global>
    ::view-transition-group(navrail) {
      z-index: 2;
    }
  </style>
</nav>
<div class="navrail-filler"></div> -->

<nav class="nav-drawer playfair {menuOpened ? 'opened' : ''}">
  <button class="close-button" on:click={openMenu}><span class="material-symbols-outlined">close</span></button>
  <div class="top">
    <a href="/" class="title playfair title-large">Stan <i>Awards</i></a>
    <div class="full-width-button  search-box">
      Search for artists...
    </div>
  </div>
  <div class="mid">
    <a href="/" class="link title-medium playfair" on:click={openMenu}>The <i>Stan Home</i></a>
    <a href="/leaderboard" class="link title-medium playfair" on:click={openMenu}>The Artist Leaderboard</a>
    <a href="/categories" class="link title-medium playfair" on:click={openMenu}>Award Categories</a>
    <a href="/concerts" class="link title-medium playfair" on:click={openMenu}>Upcoming Concerts</a>
    <a href="/about" class="link title-medium playfair" on:click={openMenu}>About <i>Stan Awards</i></a>
  </div>
  <div class="bot">
    {#if loggedIn}
    <a href="/profile" class="full-width-button profile-button">
      <img src={$user.photoURL} alt="profile">
      {$user.displayName}
      <div class="filler"></div>
      <span class="material-symbols-outlined">settings</span>
    </a>
    {:else}
    <a class="full-width-button profile-button">
      <span class="material-symbols-outlined">account_circle</span>
      Login
    </a>
    {/if}
  </div>
</nav>
<div class="nav-filler">
  <a href="/">Stan Awards</a>
  <button class="menu-button" on:click={openMenu}>Menu</button>
</div>

<style lang="scss">
  .nav-filler {
    flex: 366px 0 0;
    * {display: none;}
  }
  .nav-drawer {
    width: 350px;
    height: calc(100% - 16px);
    background: var(--translucent-background);
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    margin: 8px;
    box-sizing: border-box;
    padding: 24px 12px;
    position: fixed;
    top: 0;
    left: 0;

    .close-button {
      display: none;
    }

    .top {
      display: flex;
      flex-flow: column;
      align-items: center;
      gap: 24px;
      width: 100%;

      .title {
        font-weight: 500;
        i {
          font-weight: 700;
        }
      }
    }

    .mid {
      display: flex;
      flex-flow: column;
      align-items: center;
      gap: 30px;
    }

    .bot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .full-width-button {
      height: 52px;
      background: var(--translucent-background);
      color: var(--translucent-foreground);
      border-radius: 48px;
      padding: 0 24px;
      width: 90%;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      gap: 10px;
      cursor: pointer;

      &.profile-button {
        padding: 0 12px;
      }
      img {
        height: 32px;
        width: 32px;
        border-radius: 50%;
      }
    }
    a {color: var(--beige); text-decoration: none}
  }
  @media (max-width: 560px) {
    .nav-drawer {
      width: calc(100% - 16px);
      height: calc(100% - 16px);
      translate: -105% 0;
      transition: translate var(--md-sys-motion-duration-medium3) var(--md-sys-motion-easing-emphasized-accelerate);
      z-index: 3;
      backdrop-filter: blur(25px);
      background: rgba(0,0,0,0.25);
      
      .close-button {
        all: unset;
        position: absolute;
        top: 18px;
        right: 12px;
        color: white;
        height: 48px;
        width: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &.opened {
        translate: 0 0;
        transition: translate var(--md-sys-motion-duration-long4) var(--md-sys-motion-easing-emphasized-decelerate);
      }
    }
    .nav-filler {
      display: flex;
      width: 100%;
      // height: 45px;
      flex: 72px 0 0;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      box-sizing: border-box;
      font-family: 'Playfair Display';
      a {display: block}
      .menu-button {
        all: unset;
      }
    }
  }
</style>
