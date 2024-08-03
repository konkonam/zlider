import zlider from 'zlider';
import 'zlider/style.css';

import App from './App.vue';

const app = createApp(App);

app.use(zlider);

app.mount('#app');
