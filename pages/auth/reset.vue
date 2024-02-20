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
        <img src="assets/images/swift.png" class="h-14 hidden lg:my-4" />
        <div class="font-extrabold text-2xl hidden text-green-600">SwiftQom</div>
      </div>

      <div class="grid content-center lg:h-[700px]">
        <img src="assets/icons/icon_lock.png" class="h-32 mt-4 w-auto mx-auto my-12  items-center flex justify-center"
          draggable="false">
        <div class="lg:mx-12 my-2">
          <div class="text-2xl font-bold py-0 text-primary ">Create new password</div>
          <div class="text-sm font-light  py-2 ">Create new password for your account
          </div>
        </div>

        <UForm :schema="schema" :state="state" class="space-y-4 lg:mx-12 my-6" @submit="resetAccountPassword">
          <UAlert v-if="showAlertError" icon="i-heroicons-information-circle" color="red" variant="subtle"
            title="Invalid login" description="Incorrext username/email or password " />

          <UFormGroup size="lg" v-slot="{ error }" label="Password" name="password">
            <UInput v-model="state.password" type="password" placeholder="Min.8 character"
              :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : 'i-heroicons-heck-16-solid'" />
          </UFormGroup>

          <UFormGroup size="lg" v-slot="{ error }" label="Confirm Password" name="confirmPassword">
            <UInput v-model="state.confirmPassword" type="password" placeholder="Enter same password as above"
              :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : 'i-heroicons-heck-16-solid'" />
          </UFormGroup>

          <UCheckbox color="primary" v-slot="{ error }" v-model="state.isCheck"
            help=" Check this if you want to redirect to dashboard panel" label=" Go to Dashboard " />

          <UButton :disabled="isLoading" :loading="isLoading" size="lg" type="submit" color="primary" variant="solid"
            label="Reset password" :trailing="false" block />

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
import { useHttpRequest } from "~~/composables/useHttpRequest";

const http = useHttpRequest();

definePageMeta({
  layout: "auth",
  title: "Change password",

})
const showForm = ref(false)
const showAlertError = ref(false)
const isLoading = ref(false)
const schema = object({
  isCheck: Yup.boolean().required(),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: string().when('password', (password, field) =>
    password ? field.required("Confirm password is required").oneOf([Yup.ref('password')], 'Please make your passwords match') : field
  ),

})
type Schema = InferType<typeof schema>

const state = reactive({
  password: undefined,
  confirmPassword: undefined,
  isCheck: false
})

function resetAccountPassword(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
  isLoading.value = true
  http.request("reset_password", {
    method: "POST",
    body: {
      "newPassword": state.password,
      "confirmPassword": state.password,
    }
  }).then((data: any) => {
    isLoading.value = false
    console.log(data)

  }).catch((error: any) => {
    console.log(error)
  }).finally(() => {

  })



}

const items = ref([])

</script>

<style></style>