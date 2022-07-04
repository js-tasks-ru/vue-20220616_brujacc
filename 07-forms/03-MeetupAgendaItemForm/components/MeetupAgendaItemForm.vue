<template>
  <fieldset class="agenda-item-form">
    <button type="button" class="agenda-item-form__remove-button" @click="$emit('remove')">
      <ui-icon icon="trash" />
    </button>

    <ui-form-group>
      <ui-dropdown v-model="localAgendaItem.type" title="Тип" :options="$options.agendaItemTypeOptions" name="type" />
    </ui-form-group>

    <div class="agenda-item-form__row">
      <div class="agenda-item-form__col">
        <ui-form-group label="Начало">
          <ui-input
            ref="inputStarts"
            :modelValue="localAgendaItem.startsAt"
            type="time"
            placeholder="00:00"
            name="startsAt"
            @change="updateStartTime($event)"
          />
        </ui-form-group>
      </div>
      <div class="agenda-item-form__col">
        <ui-form-group label="Окончание">
          <ui-input
            ref="inputEnds"
            :modelValue="localAgendaItem.endsAt"
            type="time"
            placeholder="00:00"
            name="endsAt"
            @change="updateEndTime($event)"
          />
        </ui-form-group>
      </div>
    </div>
    <template v-if="localAgendaItem.type === 'talk'">
      <ui-form-group label="Тема">
        <ui-input v-model="localAgendaItem.title" name="title" />
      </ui-form-group>
      <ui-form-group label="Докладчик">
        <ui-input v-model="localAgendaItem.speaker" name="speaker" />
      </ui-form-group>
      <ui-form-group label="Описание">
        <ui-input v-model="localAgendaItem.description" multiline name="description" />
      </ui-form-group>
      <ui-form-group label="Язык">
        <ui-dropdown
          v-model="localAgendaItem.language"
          title="Язык"
          :options="$options.talkLanguageOptions"
          name="language"
        />
      </ui-form-group>
    </template>
    <template v-else-if="localAgendaItem.type === 'other'">
      <ui-form-group label="Заголовок">
        <ui-input v-model="localAgendaItem.title" name="title" />
      </ui-form-group>
      <ui-form-group label="Описание">
        <ui-input v-model="localAgendaItem.description" multiline name="description" />
      </ui-form-group>
    </template>
    <template v-else>
      <ui-form-group label="Нестандартный текст (необязательно)">
        <ui-input v-model="localAgendaItem.title" name="title" />
      </ui-form-group>
    </template>
  </fieldset>
</template>

<script>
import UiIcon from './UiIcon';
import UiFormGroup from './UiFormGroup';
import UiInput from './UiInput';
import UiDropdown from './UiDropdown';
import { format, addMinutes } from 'date-fns';
const agendaItemTypeIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};
const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};
const agendaItemTypeOptions = Object.entries(agendaItemDefaultTitles).map(([type, title]) => ({
  value: type,
  text: title,
  icon: agendaItemTypeIcons[type],
}));
const talkLanguageOptions = [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];
export default {
  name: 'MeetupAgendaItemForm',
  agendaItemTypeOptions,
  talkLanguageOptions,
  components: { UiIcon, UiFormGroup, UiInput, UiDropdown },
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  emits: ['remove', 'update:agendaItem'],
  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
      start: 0,
      end: 0,
      duration: 0,
    };
  },
  watch: {
    localAgendaItem: {
      deep: true,
      handler(newValue) {
        this.$emit('update:agendaItem', { ...newValue });
      },
    },
    end: {
      handler(newValue) {
        this.duration = newValue - this.start;
      },
    },
  },
  mounted() {
    this.start = this.$refs.inputStarts.$refs.input.valueAsNumber;
    this.end = this.$refs.inputEnds.$refs.input.valueAsNumber;
  },
  methods: {
    updateStartTime(event) {
      this.localAgendaItem.startsAt = event.target.value;
      this.start = event.target.valueAsNumber;
      const date = new Date(this.start + this.duration);
      this.localAgendaItem.endsAt = format(addMinutes(date, date.getTimezoneOffset()), 'HH:mm');
    },
    updateEndTime(event) {
      this.localAgendaItem.endsAt = event.target.value;
      this.end = event.target.valueAsNumber;
    },
  },
};
</script>

<style scoped>
.agenda-item-form {
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  position: relative;
  padding: 20px 10% 0 16px;
}
.agenda-item-form__remove-button {
  position: absolute;
  top: 4px;
  right: 0;
  box-shadow: none;
  border: none;
  background-color: transparent;
  outline: none;
  padding: 4px;
  cursor: pointer;
  transition: 0.2s opacity;
}
.agenda-item-form__remove-button:hover {
  opacity: 0.6;
}
.agenda-item-form__row {
  display: flex;
  flex-direction: column;
}
.agenda-item-form__col + .agenda-item-form__col {
  margin-top: 16px;
}
.agenda-item-form__col:first-child {
  margin-left: 0;
}
@media all and (min-width: 992px) {
  .agenda-item-form {
    padding: 28px 25% 4px 24px;
  }
  .agenda-item-form__remove-button {
    top: 20px;
    right: 20px;
  }
  .agenda-item-form__row {
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -12px;
  }
  .agenda-item-form__col {
    flex: 1 1 auto;
    padding: 0 12px;
  }
  .agenda-item-form__col + .agenda-item-form__col {
    margin-top: 0;
  }
  .agenda-item-form__col:first-child {
    margin-left: 0;
  }
}
</style>
