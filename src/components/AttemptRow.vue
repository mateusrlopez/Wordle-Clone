<script setup lang="ts">
import { State } from '@/composables/enums';

defineProps({
    attempt: {
        type: Array<string>,
        required: true,
    },
    state: {
        type: Array<State>,
        required: true,
    },
});

function backgroundColorByState(state: State): Array<string> {
    switch (state) {
        case State.Unknown:
            return ['border-neutral-600', 'bg-transparent'];
        case State.Wrong:
            return ['border-neutral-600', 'bg-neutral-600'];
        case State.Misplaced:
            return ['border-yellow-500', 'bg-yellow-500'];
        case State.Correct:
            return ['border-green-600', 'bg-green-600'];
    }
}
</script>

<template>
    <div class="grid grid-cols-5 gap-x-1">
        <div
            v-for="idx in [0, 1, 2, 3, 4]"
            :key="idx"
            :class="backgroundColorByState(state[idx])"
            class="flex justify-center items-center uppercase text-neutral-100 text-3xl border font-extrabold rounded">
            {{ attempt[idx] }}
        </div>
    </div>
</template>
