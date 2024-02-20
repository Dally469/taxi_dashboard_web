<template>
  <UContainer
    class="flex bg-gradient-to-r from-slate-50 dark:from-slate-900 from-15% to-white to-90% dark:to-slate-800  justify-between mx-0 items-center h-lvh max-w-8xl ">
    <UContainer class="hidden sm:block  mx-0   dark:bg-slate-900	 bg-slate-50 h-lvh w-2/3  ">
      <div class="grid content-center  lg:h-[700px]">

      </div>
    </UContainer>
    <UContainer class=" dark:bg-slate-800 grid content-center  bg-white h-lvh lg:w-1/3 w-full ">
      <div class="flex justify-start">
        <div class="flex lg:ml-8 items-center">
          <img src="assets/images/speed.png" class="h-14  lg:my-4" />
          <div class="font-extrabold text-2xl hidden text-green-600">SwiftQom</div>
        </div>
        <div class="lg:mx-8 my-4">
          <div class="text-2xl font-medium py-0 ">Hi, Welcome Back!</div>
          <div class="text-sm font-light  py-2 ">Sign in to your account to continue</div>
        </div>
      </div>
      <UForm :schema="schema" :state="state" class="space-y-4 lg:mx-12 my-6" @submit="onSubmit">
        <UAlert v-if="showAlertError" icon="i-heroicons-information-circle" color="red" variant="subtle"
          title="Invalid login" description="Incorrext username/email or password " />

        <UAlert v-if="showForm" color="gray" variant="subtle" :description="state.email"
          :avatar="{ src: 'https://avatars.githubusercontent.com/u/739984?v=4' }" title="Sr Frontend developer"
          :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: true }" />

        <UFormGroup v-if="!showForm" size="lg" v-slot="{ error }" label="Email" name="email">
          <UInput v-model="state.email"
            :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : 'i-heroicons-heck-16-solid'" />
        </UFormGroup>


        <UFormGroup v-if="showForm" size="lg" v-slot="{ error }" label="Password" name="password">
          <UInput v-model="state.password" type="password"
            :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : 'i-heroicons-heck-16-solid'" />
        </UFormGroup>

        <div class="flex justify-between">
          <UCheckbox color="primary" label="Remember me" class="text-xm font-light" :model-value="true" />
          <NuxtLink to="/auth/request-reset-password"
            class="text-primary dark:text-green-500 font-medium text-sm hover:text-green-700 dark:hover:text-gray-200">
            Forgot password?
          </NuxtLink>

        </div>

        <UButton @click="login()" :disabled="!validateEmail(state.email)" :loading="isLoading" size="lg" type="submit"
          color="primary" variant="solid" label="Login" :trailing="false" block />

        <UDivider label="OR" type="dashed" :ui="{ label: 'text-primary-500 dark:text-primary-400' }" />
        <GoogleSignInButton @success="handleLoginSuccess" @error="handleLoginError"></GoogleSignInButton>
        <div class="flex space-x-2  ">
          <div class=" font-light text-sm">Don't have an
            account? </div>
          <NuxtLink to="/auth/create-account"
            class="text-primary text-sm font-bold dark:text-green-500 hover:text-green-700 dark:hover:text-gray-200">
            Create Account
          </NuxtLink>
        </div>


      </UForm>
    </UContainer>
  </UContainer>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { reactive } from 'vue';
import { GoogleSignInButton, type CredentialResponse, } from "vue3-google-signin";
import { useUserStore } from '~/stores/users/user';

definePageMeta({
  layout: "auth",
  title: "Account Login",
  middleware: "authenticated",

})

const showForm = ref(false)
const showAlertError = ref(false)
const isLoading = ref(false)

const schema = object({
  email: string().email('Invalid email').required('Username/Email reruired'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Password required')
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  password: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
}

let user: any;

// handle success event
const handleLoginSuccess = async (response: CredentialResponse) => {
  const { credential } = response;

  if (credential) {
    user = await $fetch("/api/google.auth", {
      method: 'POST',
      body: {
        token: credential
      }
    }).then((data) => {
      window.location.href = '/projects'
    })
  }

  console.log("User", user);
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};


function validateEmail(email: any) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true
  } else {
    return false
  }
}
const userStore = useUserStore();

const login = async () => {
  isLoading.value = true
  setTimeout(() => (isLoading.value = false, showForm.value = true), 3000)

  if (state.password != "123456789") {
    showAlertError.value = true;
  } else {
    await userStore.signIn({ username: "state.email", password: "state.password " }, "login");
    await navigateTo("/dashboard", { replace: true });
  }


};


</script>

<style></style>