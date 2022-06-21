import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../06-MeetupView/MeetupView.js';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },
  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      meetupData: null,
      gotError: false,
      isLoading: false,
      errorMsg: null,
    };
  },
  watch: {
    meetupId(newId) {
      this.getMeetups(newId);
    },
  },
  mounted() {
    this.getMeetups(this.meetupId);
  },
  methods: {
    getMeetups(id) {
      this.gotError = false;
      this.isLoading = true;
      fetchMeetupById(id)
        .then((meetups) => {
          this.meetupData = meetups;
        })
        .catch((err) => {
          this.gotError = true;
          this.errorMsg = err.message;
        })
        .finally(() => (this.isLoading = false));
    },
  },

  template: `
    <div class="page-meetup">
    <meetup-view :meetup="meetupData" v-if="meetupData && !isLoading && !gotError"></meetup-view>

      <ui-container v-else-if="isLoading && !gotError">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-else>
        <ui-alert>{{ errorMsg }}</ui-alert>
      </ui-container>
    </div>`,
});
