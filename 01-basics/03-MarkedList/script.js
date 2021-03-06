import { createApp } from './vendor/vue.esm-browser.js';
import { defineComponent } from './vendor/vue.esm-browser.js';
// From https://jsonplaceholder.typicode.com/comments
// const emails = [
//   'Eliseo@gardner.biz',
//   'Jayne_Kuhic@sydney.com',
//   'Nikita@garfield.biz',
//   'Lew@alysha.tv',
//   'Hayden@althea.biz',
//   'Presley.Mueller@myrl.com',
//   'Dallas@ole.me',
//   'Mallory_Kunze@marie.org',
//   'Meghan_Littel@rene.us',
//   'Carmen_Keeling@caroline.name',
//   'Veronica_Goodwin@timmothy.net',
//   'Oswald.Vandervort@leanne.org',
//   'Kariane@jadyn.tv',
//   'Nathan@solon.io',
//   'Maynard.Hodkiewicz@roberta.com',
//   'Christine@ayana.info',
//   'Preston_Hudson@blaise.tv',
//   'Vincenza_Klocko@albertha.name',
//   'Madelynn.Gorczany@darion.biz',
//   'Mariana_Orn@preston.org',
//   'Noemie@marques.me',
//   'Khalil@emile.co.uk',
//   'Sophia@arianna.co.uk',
//   'Jeffery@juwan.us',
//   'Isaias_Kuhic@jarrett.net',
// ];

let RootComponent = defineComponent({
  data() {
    return {
      emails: null,
      search: null,
    };
  },

  computed: {
    filtredEmails() {
      if (this.emails) {
        return this.emails.map((email) => {
          if (this.search === '') {
            return {
              emailAdress: email,
            };
          }

          return {
            emailAdress: email,
            classObj: {
              marked: email.includes(this.search),
            },
          };
        });
      }
      return 'undefined';
    },
  },
});

let app = createApp(RootComponent);

let vm = app.mount('#app');

async function getEmails() {
  let response = await fetch('https://jsonplaceholder.typicode.com/comments');

  let json = await response.json();

  json = json.map((e) => e.email);

  json.splice(25);

  vm.emails = json;
}

getEmails();
