[![banner](https://particles.js.org/images/banner3.png)](https://particles.js.org)

# inferno-particles

[![npm](https://img.shields.io/npm/v/inferno-particles)](https://www.npmjs.com/package/inferno-particles) [![npm](https://img.shields.io/npm/dm/inferno-particles)](https://www.npmjs.com/package/inferno-particles)

Албан ёсны [tsParticles](https://github.com/matteobruni/tsparticles) Inferno компонэнт

[![Slack](https://particles.js.org/images/slack.png)](https://join.slack.com/t/tsparticles/shared_invite/enQtOTcxNTQxNjQ4NzkxLWE2MTZhZWExMWRmOWI5MTMxNjczOGE1Yjk0MjViYjdkYTUzODM3OTc5MGQ5MjFlODc4MzE0N2Q1OWQxZDc1YzI) [![Discord](https://particles.js.org/images/discord.png)](https://discord.gg/hACwv45Hme) [![Telegram](https://particles.js.org/images/telegram.png)](https://t.me/tsparticles)

[![tsParticles Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=186113&theme=light)](https://www.producthunt.com/posts/tsparticles?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tsparticles") <a href="https://www.buymeacoffee.com/matteobruni"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a beer&emoji=🍺&slug=matteobruni&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00"></a>

## Татах

```shell
npm install inferno-particles inferno
```

or

```shell
yarn add inferno-particles inferno
```

## Хэрхэн ашиглах

### Код

Жишээнүүд:

_Remote url_

```javascript
import Particles from "inferno-particles";

class App extends Component {
  constructor(props) {
    super(props);

    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
  }

  particlesInit(main) {
    console.log(main);

    // та энд tsParticles instance (main) ийг эхлүүлэн дурын дүрс нэмж болно
  }

  particlesLoaded(container) {
    console.log(container);
  }

  render() {
    return (
      <Particles
        id="tsparticles"
        url="http://foo.bar/particles.json"
        init={this.particlesInit}
        loaded={this.particlesLoaded}
      />
    );
  }
}
```

_Options object_

```javascript
import Particles from "inferno-particles";

class App extends Component {
  constructor(props) {
    super(props);

    this.particlesInit = this.particlesInit.bind(this);
    this.particlesLoaded = this.particlesLoaded.bind(this);
  }

  particlesInit(main) {
    console.log(main);

    // та энд tsParticles instance (main) ийг эхлүүлэн дурын дүрс нэмж болно
  }

  particlesLoaded(container) {
    console.log(container);
  }

  render() {
    return (
      <Particles
        id="tsparticles"
        init={this.particlesInit}
        loaded={this.particlesLoaded}
        options={{
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
        }}
      />
    );
  }
}
```

### Props

| Prop    | Утга     |  Тайлбар    |
| --------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| width           | мөр   | Канвасын өргөн|
| height          | мөр   | Канвасын өндөр|
| options         | обжект   | The options of the particles instance.|
| url             | мөр   | The remote options url, called using an AJAX request                                                                                                |
| style           | обжект   | Канвасын стилл|
| className       | мөр   | Канвас агуулагчын класс|
| canvasClassName | мөр   | Канвасын класс|
| container       | обжект   | Жишээ [particles container](https://particles.js.org/docs/modules/_core_container_.html)                                              |
| init            | функц | tsParticles instance эхэлсний дараа дуудагддаг функц|
| loaded          | функц | Канвас бүрэн зөв ажилсан бол дуудагддаг функц|

Утгийн тохиргоогоо эндээс олно уу [энд](https://particles.js.org).

## Жишээ

Жишээ [энд](https://particles.js.org)

<https://particles.js.org>

CodePen -ий байнга шинэчлэгдэж байдаг цуглуулга [энд](https://codepen.io/collection/DPOage)

<https://codepen.io/collection/DPOage>
