import { onMount } from "svelte"

export function useKeyDownHandler(keyHandler: (event: KeyboardEvent) => void) {
	onMount(() => {
		window.addEventListener("keydown", keyHandler)
		return () => window.removeEventListener("keydown", keyHandler)
	})
}
