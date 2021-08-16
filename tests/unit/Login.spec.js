import { mount, createLocalVue, shallowMount } from "@vue/test-utils"
import Vuex from 'vuex';
import Login from "@/views/Login.vue"

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Login", () => {
  it("renders Login title", async () => {
    const wrapper = mount(Login)
    let titulo = wrapper.find('h1.titulo');
    expect(titulo.text()).toBe('Login');
  })
})


