<script>
	import {goto} from "$app/navigation"
	import {Avatar} from "@skeletonlabs/skeleton"
	import Icon from "@iconify/svelte"
	import totoroLogo from "$lib/assets/totoroLogo.webp"
</script>

<section>
    <div class="flex flex-col gap-4 mt-24">
        <img class="max-w-60" src={totoroLogo} alt="totoroLogo"/>
        <h1 class="h1 text-6xl">Learn Japanese <br/>Hiragana and Katakana.</h1>
        <p class="max-w-[460px] text-xl">
            Unlock the world of Japanese with Totoro Kana! Dive into our interactive platform to learn,
            practice and truly remember Japanese characters.
        </p>
        <div>
            <button class="variant-filled-primary btn flex gap-2" on:click={() => goto("/learn/hiragana")}>
                Get Started
                <Icon icon="teenyicons:arrow-right-solid" width="1.3em" height="1.3em" style="color: black"/>
            </button>
        </div>
    </div>
    <div class="variant-soft-secondary mt-24 mb-24 p-8 text-center text-xl rounded-container-token">
        You can also try our <a href="/practice" class="anchor">practice</a> page without any account required.
    </div>
</section>
<section>
    <div class="flex flex-col gap-10 mt-24 mb-24">
        <h2 class="h2 text-center">Here are some of our features.</h2>
        <div class="grid grid-cols-3 gap-4">
            <div class="variant-glass p-6 shadow-lg space-y-4 text-center rounded-container-token">
                <span class="btn-icon btn-icon-xl variant-soft-primary">
                    <Icon icon="material-symbols:quiz-rounded" width="1.3em" height="1.3em" style="color: #119F6E"/>
                </span>
                <h3 class="h3">Interactive Quiz</h3>
                <p>Put your memory to the test with interactive quizzes and challenge yourself with a variety of
                    question types, including multiple choices and typing.</p>
            </div>
            <div class="variant-glass p-6 shadow-lg space-y-4 text-center rounded-container-token">
                <span class="btn-icon btn-icon-xl variant-soft-primary">
                    <Icon icon="ri:numbers-fill" width="1.3em" height="1.3em" style="color: #119F6E"/>
                </span>
                <h3 class="h3">Statistics</h3>
                <p>Stay motivated by tracking your learning statistics! We offer some insights into your learning
                    hiragana
                    and katakana such as how many kana you've mastered.</p>
            </div>
            <div class="variant-glass p-6 shadow-lg space-y-4 text-center rounded-container-token">
                <span class="btn-icon btn-icon-xl variant-soft-primary">
                    <Icon icon="fluent-mdl2:issue-tracking-mirrored" width="1.3em" height="1.3em"
                          style="color: #119F6E"/>
                </span>
                <h3 class="h3">Track Progress</h3>
                <p>After each lesson that is successfully completed, your progress is automatically saved. Next time you
                    can continue your learning right where you left off!</p>
            </div>
        </div>
    </div>
</section>
<section>
    <div class="flex justify-center gap-16 mt-24 mb-24">
        <div class="flex items-center">
            <a href="https://www.adambelko.com/">
                <Avatar initials="AB" background="variant-soft-primary" width="h-48"/>
            </a>
        </div>
        <div class="flex flex-col gap-4 text-left">
            <h2 class="h2">Support the project.</h2>
            <p class="max-w-[480px]">Totoro Kana is an open source that survives through your support.
                Please consider donating with <a class="anchor" href="https://ko-fi.com/totorokana">Ko-Fi</a>. The funds
                will help to cover standard costs, such as hosting and domain services. Starring or contributing to the
                <a class="anchor" href="https://github.com/adambelko/totoro-kana">GitHub</a> repository is also very
                welcome!
            </p>
            <div class="flex gap-4">
                <a href="https://ko-fi.com/totorokana">
                    <button class="btn variant-filled">Ko-Fi</button>
                </a>
                <a href="https://github.com/adambelko/totoro-kana">
                    <button class="btn variant-filled">GitHub</button>
                </a>
            </div>
        </div>
    </div>
</section>