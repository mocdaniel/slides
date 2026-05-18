<template>
    <footer class="absolute bottom-0 left-0 right-0 m-2 h-8 flex justify-between gap-2">
        <div class="flex gap-2 justify-between items-center">
            <a href="https://twitter.com/d_bodky" target="_blank" alt="Twitter" class="icon-btn text-sky-500 !border-none">
                <CarbonLogoTwitter />
                @d_bodky
            </a>
        </div>

        <LightOrDark>
            <template #dark><img class="pb-2 pr-2" src="/netways-white.png" /></template>
            <template #light><img class="pb-2 pr-2" src="/netways-black.png" /></template>
        </LightOrDark>
    </footer>
</template>