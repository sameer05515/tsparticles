[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# jquery-particles

[![npm](https://img.shields.io/npm/v/jquery-particles)](https://www.npmjs.com/package/jquery-particles) [![npm](https://img.shields.io/npm/dm/jquery-particles)](https://www.npmjs.com/package/jquery-particles)

Offizielles [tsParticles](https://github.com/matteobruni/tsparticles) jQuery plugin

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Installation

```shell script

npm install jquery-particles

```

oder von jsDelivr

[![jsDelivr](https://data.jsdelivr.com/v1/package/npm/jquery-particles/badge)](https://www.jsdelivr.com/package/npm/jquery-particles)

```html
<!-- füge zuerst tsParticles ein -->

<script src="https://cdn.jsdelivr.net/npm/tsparticles"></script>

<!-- füge danach den jquery-wrapper ein -->

<script src="https://cdn.jsdelivr.net/npm/jquery-particles"></script>
```

## Bedienungsanleitung

HTML

```html
<div id="tsparticles"></div>
```

```javascript
$("#tsparticles")
  .particles()

  .init(
    {
      background: {
        color: {
          value: "#0d47a1",
        },
      },

      fpsLimit: 120,

      interactivity: {
        events: {
          onClick: {
            enable: true,

            mode: "push",
          },

          onHover: {
            enable: true,

            mode: "repulse",
          },

          resize: true,
        },

        modes: {
          bubble: {
            distance: 400,

            duration: 2,

            opacity: 0.8,

            size: 40,
          },

          push: {
            quantity: 4,
          },

          repulse: {
            distance: 200,

            duration: 0.4,
          },
        },
      },

      particles: {
        color: {
          value: "#ffffff",
        },

        links: {
          color: "#ffffff",

          distance: 150,

          enable: true,

          opacity: 0.5,

          width: 1,
        },

        collisions: {
          enable: true,
        },

        move: {
          direction: "none",

          enable: true,

          outMode: "bounce",

          random: false,

          speed: 6,

          straight: false,
        },

        number: {
          density: {
            enable: true,

            area: 800,
          },

          value: 80,
        },

        opacity: {
          value: 0.5,
        },

        shape: {
          type: "circle",
        },

        size: {
          random: true,

          value: 5,
        },
      },

      detectRetina: true,
    },

    function (container) {
      // container ist der Partikel-Container wo du play/pause oder stop/start kannst.
      // der Container wurde bereits gestartet, du musst in deswegen nicht nochmals manuell starten.
    }
  );

// oder

$("#tsparticles")
  .particles()

  .ajax("particles.json", function (container) {
    // container ist der Partikel-Container wo du play/pause oder stop/start kannst.
    // der Container wurde bereits gestartet, du musst in deswegen nicht nochmals manuell starten.
  });
```

## Demos

Klicke [hier](https://particles.js.org) für die Demo-Webseite.

<https://particles.js.org>

[Hier](https://codepen.io/collection/DPOage) gibt es auch eine CodePen-Sammlung, die aktiv gepflegt und geupdated wird.

<https://codepen.io/collection/DPOage>
