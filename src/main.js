import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'solana-wallets-vue/styles.css';
import VInput from "./components/VInput.vue"
import VTextArea from "./components/inputs/VTextArea.vue"
import {VVSelect, VDatePicker, VCheckbox} from "./components/inputs"
import FileInput from "./components/inputs/FileInput.vue"
import RoundedButton from "./components/RoundedButton.vue"
import Notifications from '@kyvg/vue3-notification'
import Spinner from './components/loaders/Spinner.vue'
import PrimaryButton from './components/buttons/PrimaryButton.vue'
import CancelButton from './components/buttons/CancelButton.vue'
import { Modal } from './components'


/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import * as icons from '@fortawesome/free-solid-svg-icons'
import { faUser, faIdCard, faMagnifyingGlass, faBell, faBars, faPlus, faKey, faInfo, faChevronLeft, faFile, faPassport, faTicket, faXmark, faEyeSlash, faEye, faChartLine } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faIdCard, faMagnifyingGlass, faBell, faBars, faPlus, faKey, faInfo, faChevronLeft, faFile, faPassport, faTicket, faXmark, faEyeSlash, faEye, faChartLine)

//Vee validate all rules
import AllRules from '@vee-validate/rules';
import { defineRule, configure } from 'vee-validate';

Object.keys(AllRules).forEach(rule => {
    defineRule(rule, AllRules[rule]);
  });

import en from '@vee-validate/i18n/dist/locale/en.json';
import es from '@vee-validate/i18n/dist/locale/es.json';

import { localize, setLocale } from '@vee-validate/i18n';

configure({
  generateMessage: localize({
    es,
  }),
});

setLocale('es')

//Axios config
import axios from 'axios';
const _axios = axios.create({
  baseURL: 'https://iamverifiable.xyz/'
})

window._axios = _axios



//Css imports
import "vue-select/dist/vue-select.css";
import './index.css'
import '@vuepic/vue-datepicker/dist/main.css'

  createApp(App).component('v-input', VInput)
.component('font-awesome-icon', FontAwesomeIcon)
.component('v-rounded-btn', RoundedButton)
.component('v-primary-button', PrimaryButton)
.component('v-cancel-button', CancelButton)
.component('v-spinner', Spinner)
.component('v-file-input', FileInput)
.component('v-text-area', VTextArea)
.component("v-select", VVSelect)
.component("v-v-select", VVSelect)
.component("v-checkbox", VCheckbox)
.component("v-date-picker", VDatePicker)
.component("modal", Modal)
.use(store)
.use(router)
.use(Notifications)
.mount("#app");


