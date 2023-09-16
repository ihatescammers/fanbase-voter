<script>
  import { page } from '$app/stores';
</script>

<nav class="navrail">
  <md-icon-button>
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
</nav>
<div class="navrail-filler"></div>

<style lang="scss">
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
      height: 100%;
      height: calc(100% - 40px);
      border-radius: 44px;

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
            transition: var(--md-sys-motion-duration-short4) var(--md-sys-motion-easing-emphasized) background-color;
            position: relative;
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
      height: 80px;
      flex-flow: row nowrap;
      width: 100%;
      justify-content: space-evenly;
      background-color: var(--md-sys-color-surface-container);
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

