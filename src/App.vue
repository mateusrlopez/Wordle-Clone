<script setup lang="ts">
import AttemptRow from '@/components/AttemptRow.vue';
import KeyButton from '@/components/KeyButton.vue';
import BackspaceIcon from '@/components/BackspaceIcon.vue';
import { onMounted, reactive } from 'vue';
import { State } from '@/composables/enums';
import { dictionary } from '@/composables/dictionary';

const idx = Math.floor(Math.random() * dictionary.length);
const answer = dictionary[idx];
const answerLetters = answer
    .split('')
    .reduce(
        (accumulator: Array<string>, currentValue: string) =>
            accumulator.includes(currentValue) ? accumulator : [currentValue, ...accumulator],
        []
    );

let currentColumn = 0;
let currentRow = 0;

const attempts = reactive([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
]);
const states = reactive([
    [State.Unknown, State.Unknown, State.Unknown, State.Unknown, State.Unknown],
    [State.Unknown, State.Unknown, State.Unknown, State.Unknown, State.Unknown],
    [State.Unknown, State.Unknown, State.Unknown, State.Unknown, State.Unknown],
    [State.Unknown, State.Unknown, State.Unknown, State.Unknown, State.Unknown],
    [State.Unknown, State.Unknown, State.Unknown, State.Unknown, State.Unknown],
    [State.Unknown, State.Unknown, State.Unknown, State.Unknown, State.Unknown],
]);
const letterStates = reactive<{ [key: string]: State }>({
    'a': State.Unknown,
    'b': State.Unknown,
    'c': State.Unknown,
    'd': State.Unknown,
    'e': State.Unknown,
    'f': State.Unknown,
    'g': State.Unknown,
    'h': State.Unknown,
    'i': State.Unknown,
    'j': State.Unknown,
    'k': State.Unknown,
    'l': State.Unknown,
    'm': State.Unknown,
    'n': State.Unknown,
    'o': State.Unknown,
    'p': State.Unknown,
    'q': State.Unknown,
    'r': State.Unknown,
    's': State.Unknown,
    't': State.Unknown,
    'u': State.Unknown,
    'v': State.Unknown,
    'w': State.Unknown,
    'x': State.Unknown,
    'y': State.Unknown,
    'z': State.Unknown,
});

let gameOver = false;

const toast = reactive({
    message: '',
    show: false,
});

onMounted(() => {
    window.addEventListener('keyup', (event: KeyboardEvent) => onKeyPress(event.key));
});

function displayToast(message: string, timeout = 1500) {
    toast.message = message;
    toast.show = true;
    setTimeout(() => {
        toast.show = false;
    }, timeout);
}

function onKeyPress(key: string) {
    if (!gameOver) {
        if (key === 'Enter') {
            if (currentColumn != 5) return;

            const input = attempts[currentRow].join('');

            if (!dictionary.includes(input)) {
                displayToast('Not in words list');
                return;
            }

            for (const [i, v] of attempts[currentRow].entries()) {
                states[currentRow][i] = State.Wrong;
                letterStates[v] = Math.max(letterStates[v], State.Wrong);

                if (answerLetters.includes(v)) {
                    states[currentRow][i] = State.Misplaced;
                    letterStates[v] = Math.max(letterStates[v], State.Misplaced);

                    if (answer.charAt(i) === v) {
                        states[currentRow][i] = State.Correct;
                        letterStates[v] = State.Correct;
                    }
                }
            }

            if (input === answer) {
                displayToast('🎉 Congratulations 🎉');
                gameOver = true;
                return;
            } else if (currentRow == 5) {
                displayToast(`😢 ${answer.toUpperCase()} 😢`, 2500);
                gameOver = true;
                return;
            }

            currentRow++;
            currentColumn = 0;
        } else if (key === 'Backspace') {
            if (currentColumn === 0) return;

            currentColumn--;
            attempts[currentRow][currentColumn] = '';
        } else if (new RegExp(/^[a-z]$/, 'i').test(key)) {
            if (currentColumn > 4) return;

            attempts[currentRow][currentColumn] = key.toLowerCase();
            currentColumn++;
        }
    }
}
</script>

<template>
    <div class="h-screen w-screen bg-neutral-900 font-helvetica-neue">
        <header class="h-10 md:h-16 flex justify-center items-center border-b border-neutral-600">
            <h1 class="text-2xl md:text-4xl text-neutral-50 font-extrabold">Wordle</h1>
        </header>
        <main class="flex flex-col h-[calc(100%-2.5rem)] md:h-[calc(100%-4rem)]">
            <Transition name="fade">
                <div
                    v-if="toast.show"
                    class="absolute self-center mt-4 p-4 rounded bg-neutral-200 text-black font-extrabold">
                    {{ toast.message }}
                </div>
            </Transition>
            <div class="flex flex-col justify-center items-center h-[calc(100%-13rem)]">
                <div
                    class="w-full h-full xs:w-[20rem] xs:h-[26.5rem] p-3 xs:px-0 grid grid-rows-6 gap-y-3 xs:gap-y-1.5">
                    <AttemptRow :attempt="attempts[0]" :state="states[0]" />
                    <AttemptRow :attempt="attempts[1]" :state="states[1]" />
                    <AttemptRow :attempt="attempts[2]" :state="states[2]" />
                    <AttemptRow :attempt="attempts[3]" :state="states[3]" />
                    <AttemptRow :attempt="attempts[4]" :state="states[4]" />
                    <AttemptRow :attempt="attempts[5]" :state="states[5]" />
                </div>
            </div>
            <div class="h-52 flex flex-col justify-center items-center">
                <div class="w-full sm:w-1/4 md:w-3/5 lg:w-1/2 xl:w-1/4 px-2 sm:px-0">
                    <div class="flex flex-row items-center w-full">
                        <KeyButton :state="letterStates['q']" @click="onKeyPress('q')">q</KeyButton>
                        <KeyButton :state="letterStates['w']" @click="onKeyPress('w')">w</KeyButton>
                        <KeyButton :state="letterStates['e']" @click="onKeyPress('e')">e</KeyButton>
                        <KeyButton :state="letterStates['r']" @click="onKeyPress('r')">r</KeyButton>
                        <KeyButton :state="letterStates['t']" @click="onKeyPress('t')">t</KeyButton>
                        <KeyButton :state="letterStates['y']" @click="onKeyPress('y')">y</KeyButton>
                        <KeyButton :state="letterStates['u']" @click="onKeyPress('u')">u</KeyButton>
                        <KeyButton :state="letterStates['i']" @click="onKeyPress('i')">i</KeyButton>
                        <KeyButton :state="letterStates['o']" @click="onKeyPress('o')">o</KeyButton>
                        <KeyButton :state="letterStates['p']" :last="true" @click="onKeyPress('p')"
                            >p</KeyButton
                        >
                    </div>
                    <div class="flex flex-row items-center w-full mt-2 px-3">
                        <KeyButton :state="letterStates['a']" @click="onKeyPress('a')">a</KeyButton>
                        <KeyButton :state="letterStates['s']" @click="onKeyPress('s')">s</KeyButton>
                        <KeyButton :state="letterStates['d']" @click="onKeyPress('d')">d</KeyButton>
                        <KeyButton :state="letterStates['f']" @click="onKeyPress('f')">f</KeyButton>
                        <KeyButton :state="letterStates['g']" @click="onKeyPress('g')">g</KeyButton>
                        <KeyButton :state="letterStates['h']" @click="onKeyPress('h')">h</KeyButton>
                        <KeyButton :state="letterStates['j']" @click="onKeyPress('j')">j</KeyButton>
                        <KeyButton :state="letterStates['k']" @click="onKeyPress('k')">k</KeyButton>
                        <KeyButton :state="letterStates['l']" :last="true" @click="onKeyPress('l')"
                            >l</KeyButton
                        >
                    </div>
                    <div class="flex flex-row items-center w-full mt-2">
                        <KeyButton class="text-sm" @click="onKeyPress('Enter')">Enter</KeyButton>
                        <KeyButton :state="letterStates['z']" @click="onKeyPress('z')">z</KeyButton>
                        <KeyButton :state="letterStates['x']" @click="onKeyPress('x')">x</KeyButton>
                        <KeyButton :state="letterStates['c']" @click="onKeyPress('c')">c</KeyButton>
                        <KeyButton :state="letterStates['v']" @click="onKeyPress('v')">v</KeyButton>
                        <KeyButton :state="letterStates['b']" @click="onKeyPress('b')">b</KeyButton>
                        <KeyButton :state="letterStates['n']" @click="onKeyPress('n')">n</KeyButton>
                        <KeyButton :state="letterStates['m']" @click="onKeyPress('m')">m</KeyButton>
                        <KeyButton :last="true" @click="onKeyPress('Backspace')"
                            ><BackspaceIcon
                        /></KeyButton>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
