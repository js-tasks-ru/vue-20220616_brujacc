import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

createApp({
  data() {
    return {
      meetId: null,
      meetTitle: '',
    };
  },
  watch: {
    meetId(newId, oldId) {
      this.getMeetingTitle();
    },
  },
  methods: {
    async getMeetingTitle() {
      const res = await fetchMeetupById(this.meetId);
      this.meetTitle = res.title;
    },
  },
}).mount('#app');
