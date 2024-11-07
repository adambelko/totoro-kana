<script lang="ts">
	import Icon from "@iconify/svelte"
	import type { SupabaseClient} from "@supabase/supabase-js"
	import type { User } from "@supabase/supabase-js"

	interface Props {
		supabase: SupabaseClient
		user: User | null
		signOut: () => void
        classesActive: (href: string) => string
	}

	let { user, signOut, classesActive }: Props = $props()
</script>

<div
	class="drawer-backdrop bg-surface-backdrop-token fixed bottom-0 left-0 right-0 top-0 z-40 flex justify-end lg:hidden"
>
	<div class="drawer h-full w-[70%] overflow-y-auto bg-surface-100 shadow-xl transition-transform">
		<p class="pl-6 pt-6 text-2xl font-bold">Core</p>
		<nav>
			<ul class="space-y-1 pl-2">
				<li>
					<a href="/learn/hiragana" class="block">
						<div class="btn flex items-center justify-start text-left hover:variant-soft-primary {classesActive(
						'/learn/hiragana'
					)}">
							<span>Learn</span>
						</div>
					</a>
				</li>
				<li>
					<a href="/practice" class="block">
						<div class="btn flex items-center justify-start text-left hover:variant-soft-primary {classesActive(
						'/practice'
					)}">
							<span>Practice</span>
						</div>
					</a>
				</li>
			</ul>
		</nav>

		<hr class="!my-4 opacity-50" />
		<p class="pl-6 text-2xl font-bold">More</p>
		<nav>
			<ul class="space-y-1 pl-2">
				<li>
					<a href="/about" class="block">
						<div class="btn flex items-center justify-start text-left hover:variant-soft-primary {classesActive(
						'/about'
					)}">
							<span>About</span>
						</div>
					</a>
				</li>
				<li>
					<a href="/contribution" class="block">
						<div class="btn flex items-center justify-start text-left hover:variant-soft-primary {classesActive(
						'/contribution'
					)}">
							<span>Contribution</span>
						</div>
					</a>
				</li>
			</ul>
		</nav>

		{#if user}
			<hr class="!my-4 opacity-50" />
			<p class="pl-6 text-2xl font-bold">Profile</p>
			<nav>
				<ul class="space-y-1 pl-2">
					<li>
						<a href="/profile" class="block">
							<div class="btn flex items-center justify-start text-left hover:variant-soft-primary {classesActive(
						'/profile'
					)}">
								<span>Profile details</span>
							</div>
						</a>
					</li>
					<li>
						<button onclick={signOut} class="block w-full">
							<div class="btn flex items-center justify-start text-left hover:variant-soft-primary">
								<Icon
									icon="material-symbols:logout"
									width="1.2em"
									height="1.2em"
									style="color: black"
								/>
								<span>Log Out</span>
							</div>
						</button>
					</li>
				</ul>
			</nav>
		{/if}
	</div>
</div>
