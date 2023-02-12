import { writable } from 'svelte/store';

export const results = writable([]);

export const warning = writable('');

export const info = writable(false);

export const chartsInfo = writable(false);