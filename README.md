<p align="center">
    <a href="https://zurfjereluhmie.github.io/aframe-zen-garden/">
        <img src="./GreenGrow.svg" alt="GreenGrow Logo" align="center"/>
    </a>
        <span>X</span>
    <a href="https://github.com/Chabloz/a-frame-vite-vue-boilerplate">
        <img src="./logo.svg" alt="VAV Logo" align="center"/>
    </a>
</p>
<h1 align="center">GrenGrow</h1>
<h2 align="center">🌿 Interactive VR Garden</h2>

<div align="center">
    <img src="https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D" alt="Vue.js"/>
    <img src="https://img.shields.io/badge/A%E2%80%93Frame-1.7-brightgreen?style=for-the-badge&labelColor=%23ef2d5e&color=%23ef2d5e" alt="A-Frame"/>
    <img src="https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Threejs"/>
    <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
</div>

<br>

<a href="https://zurfjereluhmie.github.io/aframe-zen-garden/">
    <p align="center">🚀 DEMO</p>
</a>

---

A zen virtual reality environment built with A-Frame, where users can plant, water, and watch their own plants grow. An immersive and relaxing experience with VR interactions.

## 🎮 Features

- 🌱 Interactive Gardening: Dig, plant seeds, and watch them grow.
- 💧 Watering System: Use a watering can to help plants grow.
- 🧍 NPC & Trading: Give a flower to a character to receive a camera in exchange.
- 🌸 Zen Ambiance: Create your own flower shelf
- 📸 Pictures: Take pictures of your creations

## Movement modes support

- **Desktop** – Keyboard for move (_WASD_ or Arrows keys) + Mouse for look control (Drag and drop)
- **Mobile** – 1x Finger touch to go forward + 2x Fingers touch to go backward + Gaze cursor for click
- **VR/AR** – walk + Teleport (Grip for grab and laser for click) + Gaze cursor for click in AR

---

## Quickstart

### Create a folder for your project and move to it

### Clone (or fork, or download)

```sh
git clone https://github.com/zurfjereluhmie/aframe-zen-garden .
```

### Install dependencies

```sh
npm ci
```

### Dev

```sh
npm run dev
```

### Build

```sh
npm run build
```

## Notes for local dev on VR headset

1. Check that your development device and your VR headset are connected on **the same network**.

2. Expose you local development:

```sh
npm run dev-expose
```

3. In your VR headset, browse to the local development adress `[ip]:[port]`.

> [!NOTE]
> The certificate is self-signed, so you will probably have to confirm access to the resource in your browser.

---

## License

![MIT License](https://img.shields.io/badge/License-MIT-brightgreen?style=for-the-badge&color=%23262626)
