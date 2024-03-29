<script setup script="ts">
    import { metadataRouter } from '../router/RoutesConfig.ts';
</script>
<template>
    <nav class="flex gap-6">
        <img class="max-h-24" src="../assets/logo.png" alt="logo-quackhub"/>
        <section class="mt-3">
            <a 
                class="flex flex-col items-center text-xl hover:text-orange-400" 
                v-bind:href="metadataRouter.HOME.path
                ">
                <p>Home</p>
            </a>
            <a
                class="flex flex-col items-center text-xl hover:text-orange-400"
                v-bind:href="metadataRouter.SIGNUP.path"
                ><p>Sign Up</p>
            </a>
            <a
                class="flex flex-col items-center text-xl hover:text-orange-400"
                v-bind:href="metadataRouter.SIGNIN.path"
                ><p>Sign In</p>
            </a>
            <a v-if="true">Log Out</a>
            <a><CircleUser /></a>
        </section>
    </nav>
</template>
<style></style>
