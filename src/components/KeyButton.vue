<script setup lang="ts">
import { State } from '@/composables/enums';

defineProps({
    last: {
        type: Boolean,
        default: false,
    },
    state: {
        type: Number,
        default: State.Unknown,
    },
});

function backgroundColorByState(state: State): Array<string> {
    switch (state) {
        case State.Unknown:
            return ['bg-zinc-500', 'active:bg-zinc-600'];
        case State.Wrong:
            return ['bg-zinc-700', 'active:bg-zinc-700'];
        case State.Misplaced:
            return ['bg-yellow-500', 'active:bg-yellow-600'];
        case State.Correct:
            return ['bg-green-600', 'active:bg-green-700'];
    }
}
</script>

<template>
    <button
        type="button"
        :class="[{ 'mr-1.5': !last }, backgroundColorByState(state)]"
        class="text-neutral-100 uppercase font-extrabold h-14 flex-grow text-2xl rounded flex justify-center items-center focus:outline-none">
        <slot></slot>
    </button>
</template>
