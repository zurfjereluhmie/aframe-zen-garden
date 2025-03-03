<script setup>
import { ref } from 'vue';

defineProps({
    loaded: Boolean,
});

const showOnboarding = ref(true);

function enterScene() {
    showOnboarding.value = false;
    if (
        AFRAME.utils.device.checkHeadsetConnected() &&
        !AFRAME.utils.device.isMobile()
    ) {
        document.querySelector('a-scene').enterVR();
    }
    document.querySelector('a-scene').emit('enter-scene');
}
</script>

<template>
    <div id="onboarding" v-if="showOnboarding">
        <div>
            <h1>GreenGrow</h1>
            <p v-if="!loaded">loading...</p>
            <button v-if="loaded" @click="enterScene()">Enter scene</button>
            <div class="licences">
                <section>
                    <h4>Movement modes support</h4>
                    <ul>
                        <li>
                            Desktop – Keyboard for move (WASD or Arrows keys) +
                            Mouse for look control (Drag and drop)
                        </li>
                        <li>
                            Mobile – 1x Finger touch to go forward + 2x Fingers
                            touch to go backward + Gaze cursor for click
                        </li>
                        <li>
                            VR/AR – walk + Teleport (Grip for grab and laser for
                            click) + Gaze cursor for click
                        </li>
                    </ul>
                </section>
                <section>
                    <h4>Source code</h4>
                    <blockquote>
                        <a
                            href="https://github.com/zurfjereluhmie/aframe-zen-garden"
                            >Github repo</a
                        >
                    </blockquote>
                </section>
                <dl>
                    <dt>
                        <i>Included</i>
                    </dt>
                    <dt>
                        <a
                            href="https://github.com/c-frame/aframe-extras"
                            target="_blank"
                            >aframe-extras controls and animation-mixer</a
                        >
                    </dt>
                    <dd>
                        <a
                            href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE"
                            target="_blank"
                            >MIT License</a
                        >
                    </dd>

                    <dt>
                        <a
                            href="https://github.com/c-frame/physx"
                            target="_blank"
                            >aframe physx</a
                        >
                    </dt>
                    <dd>
                        <a
                            href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE"
                            target="_blank"
                            >MIT License</a
                        >
                    </dd>

                    <dt>
                        <a
                            href="https://github.com/jure/aframe-blink-controls/"
                            target="_blank"
                            >aframe-blink-controls</a
                        >
                    </dt>
                    <dd>
                        <a
                            href="https://github.com/jure/aframe-blink-controls/blob/main/LICENSE"
                            target="_blank"
                            >MIT License</a
                        >
                    </dd>

                    <dt>
                        <a
                            href="https://github.com/diarmidmackenzie/aframe-multi-camera/"
                            target="_blank"
                            >aframe-multi-camera</a
                        >
                    </dt>
                    <dd>
                        <a
                            href="https://github.com/diarmidmackenzie/aframe-multi-camera/blob/main/LICENSE"
                            target="_blank"
                            >MIT License</a
                        >
                    </dd>

                    <dt>
                        <a
                            href=" https://github.com/AdaRoseCannon/aframe-xr-boilerplate"
                            target="_blank"
                            >simple-navmesh-constraint</a
                        >
                    </dt>
                    <dd>By Ada Rose Cannon under MIT License</dd>

                    <dl>
                        <dt>
                            <a
                                href="https://poly.pizza/m/dp6b5ILj6At"
                                target="_blank"
                                >Camera</a
                            >
                        </dt>
                        <dd>
                            by Poly by Google under
                            <a
                                href="https://creativecommons.org/licenses/by/3.0/"
                                target="_blank"
                                >CC-BY</a
                            >
                            via
                            <a
                                href="https://poly.pizza/m/dp6b5ILj6At"
                                target="_blank"
                                >Poly Pizza</a
                            >
                        </dd>
                        <dt>
                            <a
                                href="https://poly.pizza/m/5COCzyz489J"
                                target="_blank"
                                >Plants - Assorted shelf plants</a
                            >
                        </dt>
                        <dd>
                            by Jakers_H under
                            <a
                                href="https://creativecommons.org/licenses/by/3.0/"
                                target="_blank"
                                >CC-BY</a
                            >
                            via
                            <a
                                href="https://poly.pizza/m/5COCzyz489J"
                                target="_blank"
                                >Poly Pizza</a
                            >
                        </dd>
                        <dt>
                            <a
                                href="https://poly.pizza/m/RP8p3h7JHJ"
                                target="_blank"
                                >Flowers</a
                            >
                        </dt>
                        <dd>
                            by CreativeTrio via
                            <a
                                href="https://poly.pizza/m/RP8p3h7JHJ"
                                target="_blank"
                                >Poly Pizza</a
                            >
                        </dd>
                        <dt>
                            <a
                                href="https://poly.pizza/m/9dubDMkAcZ5"
                                target="_blank"
                                >Flower</a
                            >
                        </dt>
                        <dd>
                            by Zoe XR under
                            <a
                                href="https://creativecommons.org/licenses/by/3.0/"
                                target="_blank"
                                >CC-BY</a
                            >
                            via
                            <a
                                href="https://poly.pizza/m/9dubDMkAcZ5"
                                target="_blank"
                                >Poly Pizza</a
                            >
                        </dd>
                        <dt>
                            <a
                                href="https://poly.pizza/m/cQ2ejiIig4n"
                                target="_blank"
                                >Tulip</a
                            >
                        </dt>
                        <dd>
                            by Hugo Gibson under
                            <a
                                href="https://creativecommons.org/licenses/by/3.0/"
                                target="_blank"
                                >CC-BY</a
                            >
                            via
                            <a
                                href="https://poly.pizza/m/cQ2ejiIig4n"
                                target="_blank"
                                >Poly Pizza</a
                            >
                        </dd>
                        <dt>
                            <a
                                href="https://poly.pizza/m/5EGWBMpuXq"
                                target="_blank"
                                >Adventurer</a
                            >
                        </dt>
                        <dd>by Quaternius</dd>
                        <dt>
                            <a
                                href="https://poly.pizza/m/dZpKQs9NgKE"
                                target="_blank"
                                >Thumbtack</a
                            >
                        </dt>
                        <dd>
                            by Kevin Lim under
                            <a
                                href="https://creativecommons.org/licenses/by/3.0/"
                                target="_blank"
                                >CC-BY</a
                            >
                            via
                            <a
                                href="https://poly.pizza/m/dZpKQs9NgKE"
                                target="_blank"
                                >Poly Pizza</a
                            >
                        </dd>
                        <dt>
                            <a
                                href="https://poly.pizza/m/SpRHK36gNl"
                                target="_blank"
                                >Wooden Sign</a
                            >
                        </dt>
                        <dd>
                            by iPoly3D under
                            <a
                                href="https://creativecommons.org/licenses/by/3.0/"
                                target="_blank"
                                >CC-BY</a
                            >
                            via
                            <a
                                href="https://poly.pizza/m/SpRHK36gNl"
                                target="_blank"
                                >Poly Pizza</a
                            >
                        </dd>
                        <dt>
                            <a
                                href="https://poly.pizza/m/dn419U6vWYx"
                                target="_blank"
                                >Wooden Stool</a
                            >
                        </dt>
                        <dd>
                            by Jarlan Perez under
                            <a
                                href="https://creativecommons.org/licenses/by/3.0/"
                                target="_blank"
                                >CC-BY</a
                            >
                            via
                            <a
                                href="https://poly.pizza/m/dn419U6vWYx"
                                target="_blank"
                                >Poly Pizza</a
                            >
                        </dd>
                        <dt>
                            <a
                                href="https://poly.pizza/m/XViKoBh2UN"
                                target="_blank"
                                >Dock</a
                            >
                        </dt>
                        <dd>by Quaternius</dd>
                        <dt>
                            <a
                                href="https://poly.pizza/m/NBUxHir6FJ"
                                target="_blank"
                                >Flowers</a
                            >
                        </dt>
                        <dd>by Quaternius</dd>
                    </dl>
                </dl>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-size: 1.5rem;
}
a {
    color: #d8ffe8;
    text-decoration: none;
}
.licences {
    margin: 2rem 0;
    padding-bottom: 1rem;
    font-size: 1rem;
    text-align: left;
}
.licences dt {
    padding-top: 0.75rem;
    font-size: 0.9rem;
    font-weight: bold;
}
.licences dd {
    margin-left: 0;
    font-size: 0.8rem;
}

#onboarding {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #0c3016;
    color: #eefff4;
    width: 100vw;
    height: 100vh;
    padding: 1rem;
    font-family: 'Poppins', monospace;
    letter-spacing: 0.05rem;
    z-index: 10000;
    overflow: auto;
}
#onboarding > * {
    margin: 0 auto;
    max-width: 50rem;
    width: calc(100vw - 10rem);
    text-align: center;
    border-radius: 0.3rem;
    padding: 1rem;
    font-size: 1.3rem;
}
#onboarding button {
    font-size: 1.3rem;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    background-color: white;
    color: black;
    border: none;
    cursor: pointer;
}
</style>
#onboarding li { #onboarding li { font-size: 1rem; text-align: left; }
