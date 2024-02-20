import { defineStore } from "pinia";
import type { MemberData } from "~/types/member";
import type { Project } from "~/types/project";
import type { ProjectSizeData } from "~/types/project_size";
import type { Services } from "~/types/services";

export const useProjectStore = defineStore("projects", {
  state: () => ({
    projects: <Project[]>[],
    services: <Services[]>[],
    people: <MemberData[]>[],
    projectSize: <ProjectSizeData[]>[],
    activeProject: <Project>{},
  }),
  getters: {
    getProjects(state) {
      return state.projects;
    },
    getActiveProject(state) {
      return state.activeProject;
    },
    getAllServices(state) {
      return state.services;
    },
    getAllMembers(state) {
      return state.people;
    },
    getAllProjectSizes(state) {
      return state.projectSize;
    },
  },
  actions: {
    async fetchAllProjects() {
      const http = useHttpRequest();
      http
        .request("projects")
        .then((data: any) => {
          this.projects = data;
        })
        .catch((error: any) => {
          console.log(error);
        });
    },
    fetchActiveProject(id: any) {
      const http = useHttpRequest();
      http
        .request("projects/" + id)
        .then((data: any) => {
          this.activeProject = data;
        })
        .catch((error: any) => {
          console.log(error);
        });
    },
    fetchServices() {
      const http = useHttpRequest();
      http
        .request("services")
        .then((data: any) => {
          this.services = data;
        })
        .catch((error: any) => {
          console.log(error);
        });
    },
    fetchMembers() {
      const http = useHttpRequest();
      http
        .request("fetch_all_members")
        .then((data: any) => {
          this.people = data.member_data;
        })
        .catch((error: any) => {
          console.log(error);
        });
    },
    fetchProjectSize() {
      const http = useHttpRequest();
      http
        .request("project_size")
        .then((data: any) => {
          this.projectSize = data.project_size_data;
        })
        .catch((error: any) => {
          console.log(error);
        });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProjectStore, import.meta.hot));
}
