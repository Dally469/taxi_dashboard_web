<template>
  <UContainer
    class="flex bg-gradient-to-r from-slate-100 dark:from-slate-900 from-15% to-white to-90% dark:to-slate-800  justify-between mx-0 items-center h-lvh max-w-8xl ">
    <UContainer class="hidden sm:block  mx-0  dark:bg-slate-900	 bg-slate-50 h-lvh w-2/3  ">
      <div class="grid content-center  lg:h-[700px]">
        <UCarousel :items="items" :ui="{
          item: 'basis-full',
          container: 'rounded-lg',
          indicators: {
            wrapper: 'relative bottom-0 mt-4'
          }
        }" indicators class="w-[1000px] mx-auto">

          <template #default="{ item }">
            <div class="flex-col  w-full  mx-4 items-center px-12 space-y-4 py-6">
              <img src="assets/images/adds_one.png"
                class="h-[450px] w-auto mx-auto mt-12 items-center flex justify-center" draggable="false">
              <div class="space-y-3">
                <div class="text-green-500 font-extrabold text-3xl">One app for everything, everyone</div>
                <div class="text-slate-700">Create a project according service you need by powerful tool help you to
                  manage day-by-day </div>
              </div>
            </div>

          </template>

          <template #indicator="{ onClick, page, active }">
            <div :class="active ? 'w-6 bg-green-500' : 'w-3 bg-green-500/30'" class="rounded-full h-3 justify-center"
              @click="onClick(page)">
            </div>
          </template>
        </UCarousel>
      </div>
    </UContainer>
    <UContainer class=" dark:bg-slate-800 bg-white h-lvh lg:w-1/3 w-full ">

      <div class="flex lg:mx-8 items-center">
        <img src="assets/images/swift.png" class="h-14  lg:my-4" />
        <div class="font-extrabold text-2xl hidden text-green-600">SwiftQom</div>
      </div>

      <div class="grid content-center lg:h-[700px]">
        <div class="lg:mx-12 my-2">
          <div class="text-2xl font-bold py-0 text-primary ">Create your account</div>
          <div class="text-sm font-light  py-2 ">Please, create an account to continue using our service</div>
        </div>


        <UForm :schema="schema" :state="state" class="space-y-4 lg:mx-12 my-6" @submit="createAccount">
          <UAlert v-if="showAlertError" icon="i-heroicons-information-circle" color="red" variant="subtle"
            title="Invalid login" description="Incorrext username/email or password " />

          <UFormGroup size="lg" v-slot="{ error }" label="Names" name="names">
            <UInput v-model="state.names"
              :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : 'i-heroicons-heck-16-solid'" />
          </UFormGroup>

          <UFormGroup size="lg" v-slot="{ error }" label="Email" name="email">
            <UInput v-model="state.email"
              :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : 'i-heroicons-heck-16-solid'" />
          </UFormGroup>
          <UFormGroup size="lg" v-slot="{ error }" label="Password" name="password">
            <UInput v-model="state.password" type="password"
              :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : 'i-heroicons-heck-16-solid'" />
          </UFormGroup>

          <UFormGroup size="lg" v-slot="{ error }" label="Confirm Password" name="confirmPassword">
            <UInput v-model="state.confirmPassword" type="password"
              :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : 'i-heroicons-heck-16-solid'" />
          </UFormGroup>

          <URadio v-slot="{ error }" v-model="state.agreeTerms"
            help="Please check this to   agree to the Terms and Privacy Policy" label=" Terms & Conditions " required />


          <UButton :disabled="!validateEmail(state.email)" :loading="isLoading" size="lg" type="submit" color="primary"
            variant="solid" label="Create Account" :trailing="false" block />

          <UDivider label="OR" type="dashed" :ui="{ label: 'text-primary-500 dark:text-primary-400' }" />
          <div class="flex space-x-2  ">
            <div class=" font-light text-sm">Already have an
              account? </div>
            <NuxtLink to="/auth/login"
              class="text-primary text-sm font-bold dark:text-green-500 hover:text-green-700 dark:hover:text-gray-200">
              Sign in
            </NuxtLink>
          </div>


        </UForm>
      </div>


    </UContainer>
  </UContainer>
</template>

<script setup lang="ts">
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { reactive } from 'vue';
import * as Yup from 'yup';


definePageMeta({
  layout: "auth",
  title: "Account Registration",

})
const showForm = ref(false)
const showAlertError = ref(false)
const isLoading = ref(false)
const isCheck = ref(false)
const schema = object({
  email: string().email('Invalid email').required('Email required'),
  names: string().required("Names is required"),
  agreeTerms: Yup.boolean().required(),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: string().when('password', (password, field) =>
    password ? field.required("Confirm password is required").oneOf([Yup.ref('password')], 'Please make your passwords match') : field
  ),
})

type Schema = InferType<typeof schema>

const state = reactive({
  email: undefined,
  names: undefined,
  password: undefined,
  confirmPassword: undefined,
  agreeTerms: false
})



function validateEmail(email: any) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true
  } else {
    return false
  }
}

function createAccount(event: FormSubmitEvent<Schema>) {
  console.log(event.data)

  isLoading.value = true
  setTimeout(() => (isLoading.value = false, showForm.value = true), 3000)
  if (state.password == "12345678") {

    setTimeout(() => {
      navigateTo("/projects")
    }, 3000)

  } else {
    showAlertError.value = true;
  }
}
const items = [
  '~/assets/images/adds_one.png',
  '~/assets/images/adds_one.png',
  '~/assets/images/adds_one.png',
  '~/assets/images/adds_one.png',

]
</script>

<style></style>