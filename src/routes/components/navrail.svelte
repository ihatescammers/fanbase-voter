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
  onMount(async () => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("emphasized", "M0,0 C0.05,0 0.13333,0.06 0.16666,0.4 0.20833,0.82 0.25,1 1,1 ");
    
    const navtl = gsap.timeline();
    navtl.set('.navrail', {height: 88, scale: 0, y: window.innerHeight / 2 - 44 - 20, borderRight: '2px solid var(--md-sys-color-primary)', rotate: 420});
    navtl.set('.nav-search-button, .navrail-button, .profile-button', {scale: 0, opacity: 0});
    navtl.to('.navrail', {
      scale: 1,
      ease: "elastic.out(1, 0.5)",
      duration: 0.85,
      delay: 1
    });
    navtl.to('.navrail', {
      rotate: 0,
      ease: "cubic.inOut",
      duration: 1
    }, "<")
    navtl.to('.navrail', {
      borderColor: 'rgba(0,0,0,0)',
      duration: 0.25,
    }, ">-=0.15")
    navtl.to('.navrail', {
      y: 0,
      height: 'calc(100% - 40px)',
      ease: "emphasized",
      duration: 1
    },"<+=0.1")
    navtl.to('.nav-search-button, .navrail-button, .profile-button', {
      opacity: 1,
      scale: 1,
      stagger: 0.1,
      duration: 0.75,
      ease: "elastic.out(1, 0.5)"
    }, "<+=0.25");
    
    const auth = getAuth(app);
    onAuthStateChanged(auth, (newUser) => {
			user.set(newUser)
      newUser === null ? loggedIn = false : loggedIn = true;
      $user ? console.log($user.photoURL) : console.log(null);
    });
  })

  const handleSignIn = () => {
      if (loggedIn) return;
      const auth = getAuth(app);
      signInWithRedirect(auth, new GoogleAuthProvider())
      .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = provider.credentialFromResult(auth, result);
          const token = credential.accessToken;

          // the signed in user info
          // IdP data available using getAdditionalUserInfo(result)
          const user = result.user;
          console.log(user)
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          // const email = error.customData;
          // const credential = GoogleAuthProvider.credentialFromError(error);

          console.log(`Error ${errorCode}: ${errorMessage}`);
      })
    }

  const logout = async () => {
		const auth = getAuth(app);
		signOut(auth);
	};

  setTimeout(() => {
    console.log($user);
  }, 3000);
</script>

<!-- <div style="height: 1px; width: 100%; background-color: black; position: fixed; top: 50%;"></div> -->

<nav class="navrail">
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
      <div class="text label-medium">Artists</div>
  </a>
  <a href="/concerts" data-sveltekit-noscroll class="navrail-button { $page.url.pathname.includes('/concerts') ? 'active' : '' }" aria-label="Concerts" id="Concerts">
      <span class="icon material-symbols-outlined">
        celebration
        <md-ripple for="Concerts"></md-ripple>
        <md-focus-ring for="Concerts"></md-focus-ring>
      </span>
      <div class="text label-medium">Concerts</div>
  </a>
  <a href="/contact" data-sveltekit-noscroll class="navrail-button { $page.url.pathname === '/contact' ? 'active' : '' }" aria-label="Contact" id="contact">
      <span class="icon material-symbols-outlined">
        Mail
        <md-ripple for="contact"></md-ripple>
        <md-focus-ring for="contact"></md-focus-ring>
      </span>
      <div class="text label-medium">Contact</div>
  </a>
  <div style="flex: auto"></div>
  <md-icon-button class="nav-search-button {loggedIn ? 'profile-button' : ''}" on:click={handleSignIn} role="button" tabindex=0 on:keyup={() => {}}>
  {#if !loggedIn}
    <md-icon class="material-symbols-outlined">account_circle</md-icon>
  <!-- </md-icon-button> -->
  {:else}
    <!-- <md-icon-button class="profile-button"> -->
      <img src={$user.photoURL} alt="profile">
  {/if}
  </md-icon-button>
</nav>
<div class="navrail-filler"></div>

<style lang="scss">
  // animation styles:
  .navrail {height: 88; scale: 0;}
  .nav-search-button, .navrail-button, .profile-button {scale: 0}
  .profile-button {
    // animation: scale-up 0.3s 1.85s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    img {
      border-radius: 50%;
      height: 36px;
      width: 36px;
    }
    @keyframes scale-up {
      0% {scale: 0}
      100% {scale: 1}
    }
  }

  .navrail {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      padding: 30px 0;
      gap: 30px;
      flex: 100px 0 0;
      width: 88px; 
      box-sizing: border-box;
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 2;
      background-color: var(--md-sys-color-surface-container-blurred);
      backdrop-filter: blur(var(--background-blur-value));
      height: calc(100% - 40px);
      border-radius: 44px;

      // animation: navrail-animation-1 0.75s cubic-bezier(0.2, 0, 0, 1) forwards;

      // animation-name: outward-grow, outward-shrink;
      // animation-delay: 0s,calc(var(--md-focus-ring-duration, 600ms)*.25);
      // animation-duration: calc(var(--md-focus-ring-duration, 600ms)*.25),calc(var(--md-focus-ring-duration, 600ms)*.75);
      // animation-timing-function: cubic-bezier(0.2, 0, 0, 1);



      // --md-icon-button-state-layer-size: 48px;

      .navrail-button {
          all: unset;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          position: relative;
          font-size: 12px;
          font-weight: 600;

          --md-ripple-hover-opacity: 0;

          .icon {
            border-radius: 20px;
            width: 52px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-emphasized);
            position: relative;

            &.material-symbols-outlined {transition-duration: 1s; animation-duration: 1s;}
          }
          .text {font-weight: var(--semibold-weight)}

          @media (pointer: fine) {
            &:hover {
                .icon {
                background-color: var(--md-sys-color-surface-container-blurred);
                }
                .text {
                font-weight: var(--bold-weight);
                }
            }
          }
          &.active {
            .text {font-weight: var(--bold-weight)}
            .icon {
              background-color: var(--md-sys-color-surface-container-blurred);
              font-variation-settings:
                'FILL' 1,
                'wght' 400,
                'GRAD' 0,
                'opsz' 24
            }
          }
          // &:focus-visible .icon {
          // animation: var(--md-sys-motion-duration-long4) var(--md-sys-motion-easing-emphasized-decelerate) outline-animation forwards;
          // @keyframes outline-animation {
          //   0% {outline: 0px solid var(--md-sys-color-primary)}
          //   25% {outline: 8px solid var(--md-sys-color-primary)}
          //   100% {outline: 3px solid var(--md-sys-color-primary)}
          // }
          // }
      }
  }
  .navrail-filler {
      flex: 108px 0 0;
      width: 108px;
  }

  @media (max-width: 560px) { // mobile-width
    .navrail-filler {
      display: none;
    }
    .navrail {
      top: inherit;
      bottom: 0;
      left: 0;
      height: 80px;
      border-radius: 0;
      flex-flow: row nowrap;
      width: 100%;
      justify-content: space-evenly;
      // background-color: var(--md-sys-color-surface-container);
      // background-color: rgba(241, 238, 229, 0.75);
      // backdrop-filter: blur(15px);
      gap: 0px;
      view-transition-name: navrail;

      @media (prefers-color-scheme: dark) {
        // background-color: rgba(32, 32, 26, 0.75);
      }

      .navrail-button.active {
        .text {font-weight: var(--bold-weight)}
      }
    }
  }
</style>

