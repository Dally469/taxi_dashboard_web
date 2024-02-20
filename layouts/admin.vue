<template>
  <div class="flex dark:bg-[#161c24]">
    <div
      class="relative h-screen flex flex-col justify-between pt-6 duration-300 border-r border-dashed border-slate-300 dark:border-slate-500"
      :class="sDrawer ? 'w-72 p-5' : 'w-20 py-3 px-2'">
      <UButton @click="sDrawer = !sDrawer" :ui="{ rounded: 'rounded-full' }" icon="i-heroicons-arrow-left-16-solid"
        size="sm" color="gray" square variant="soft" class="absolute -right-4 top-9 " :class="!sDrawer && 'rotate-180'" />

      <div>
        <div class=" inline-flex gap-2 items-center bg-slate-50 dark:bg-gray-500/10  w-full p-2 rounded">
          <img :src="project.icon" class="h-10 w-10 bg-white rounded" />
          <div class="flex-col " :class="!sDrawer ? 'scale-0' : ''">
            <div class=" truncate font-bold text-lg text-green-500 w-36"> {{ project.name }}</div>
            <div class=" truncate text-xs font-light text-muted w-32 pb-1">{{ project.type }} </div>
          </div>

        </div>
        <div :class="!sDrawer ? 'px-4 mx-2' : 'px-2 mx-1 justify-center'"
          class="flex items-center rounded-md bg-gray-400/20 mt-6 gap-2 mx-1 py-3">
          <UIcon name="i-heroicons-magnifying-glass-16-solid"
            class="h-5 w-5 text-muted text-lg block float-left cursor-pointer" />

          <input type="search" placeholder="Search" :class="!sDrawer ? `hidden` : ``"
            class="text-base bg-transparent w-full text-gray-600 focus:outline-none" />
        </div>

        <ul class="pt-2 m-1">
          <li v-for="(item, i) in project.features" :key="i" @click="activeLink(item.title)" to="/auth/login"
            v-bind:class="item.title == selectedMenu && !item.expanded ? 'bg-green-400/10 hover:bg-green-400/20' : 'hover:bg-gray-400/20'"
            :class="sDrawer ? 'pl-3 pr-1 ' : 'px-2 mx-1 '" class="flex-col items-center text-sm text-gray-500  cursor-pointer py-3  
                 rounded-md mt-2   ">
            <nuxt-link @click="item.children != null ? openSubmenu = !openSubmenu : undefined" :to="`/${item.to}`">
              <div :class="sDrawer ? ' ' : 'justify-center'" class="flex items-center  gap-x-4  cursor-pointer ">
                <UIcon name="i-heroicons-academic-cap-16-solid"
                  class="h-5 w-5 text-muted text-lg block float-left cursor-pointer"
                  :class="item.title == selectedMenu ? 'text-green-600' : ''" />



                <div class="flex-1 truncate duration-200" :class="!sDrawer ? `hidden` : ``"
                  v-bind:class="item.title == selectedMenu ? 'text-green-500 font-medium' : 'font-medium'">{{ item.title
                  }}
                </div>
                <div class="flex" :class="!sDrawer ? `hidden` : ``">
                  <UIcon name="i-heroicons-chevron-right-solid" @click="openSubmenu = !openSubmenu" v-if="item.expanded"
                    class="duration-400 h-5 w-5" v-bind:class="item.title == selectedMenu ? 'text-green-600' : ''"
                    :class="openSubmenu ? 'rotate-90' : ''" />
                  <div v-if="item.title == selectedMenu && sDrawer && !item.expanded"
                    class="flex bg-green-500 duration-300  h-5 rounded-xl w-1"></div>
                </div>

              </div>
            </nuxt-link>
            <ul v-if="item.expanded && openSubmenu && sDrawer" class="dropdown">
              <li v-for="(sub, i) in item.children" :key="i" class="flex group justify-between duration-300 items-center text-xs gap-x-4 cursor-pointer py-3  
                 hover:bg-gray-400/10 rounded-md mt-2"> <span class="pl-4 duration-200">&#x2022; {{ sub.title }}</span>
                <div class="group-hover:bg-green-500 p-1 rounded-full duration-300 mx-4 "></div>
              </li>

            </ul>
          </li>


        </ul>

      </div>
    </div>
    <div class="p-7">
      <div>
        <AuthHeader />
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProjectStore } from '~/stores/projects/project';
const isOpen = ref(false)
const sDrawer = ref(true)
const menus: any = ref([]);
const childMenu = ref([]);
const openSubmenu = ref(false)
let selectedMenu = ref('Overview')
let selectedSubMenu = ref('Faculity')
const route = useRoute()
console.log(route.query.project)

function activeLink(title: any) {
  selectedMenu.value = title
  localStorage.setItem("sidebar-active", title);
}

function activeSubLink(title: any) {
  selectedSubMenu.value = title
  localStorage.setItem("sidebar-sub-active", title);
}

const store = useProjectStore();
const project = computed(() => {
  return store.activeProject;
});

async function activateProject(id: any) {
  store.fetchActiveProject(id);

}
const projects = computed(() => {
  return store.projects;
});

function switchActiveProject() {
  console.log("SWITCHING PROJECT");
}
onMounted(() => {
  useProjectStore()
  activateProject(route.query.project)
})

const menu = ref(
  [

    {
      'title': 'Overview',
      'icon': 'i-heroicons-academic-cap-16-solid',
      'to': '/apps/pms/dashboard',

    },
    {
      'title': 'Projects',
      'icon': 'i-heroicons-academic-cap-16-solid',
      'to': '/apps/pms/detail'
    },
    {
      'title': 'Monitor',
      'icon': 'i-heroicons-academic-cap-16-solid',
      'to': '/monitoring',
      'expanded': true,
      'children': [
        {
          'title': 'Direct SMS',
          'icon': 'i-heroicons-academic-cap-16-solid',
          'to': '/sms/direct'
        },
        {
          'title': 'Direct SMS',
          'icon': 'i-heroicons-academic-cap-16-solid',
          'to': '/sms/direct'
        },
      ],
    },
    {
      'title': 'Direct SMS',
      'icon': 'i-heroicons-academic-cap-16-solid',
      'to': '/sms/direct'
    },

    {
      'title': 'Automation SMS',
      'icon': 'i-heroicons-academic-cap-16-solid',
      'to': '/sms/scheduled',

    },

    {
      'title': 'Notification SMS',
      'icon': 'i-heroicons-academic-cap-16-solid',
      'to': '/sms/reminders'
    },

    {
      'title': 'Members',
      'icon': 'i-heroicons-academic-cap-16-solid',
      'to': '/members',

    },
    {
      'title': 'Chat Room',
      'icon': 'i-heroicons-academic-cap-16-solid',
      'to': '/chat',

    },

  ])



</script>

<style></style>