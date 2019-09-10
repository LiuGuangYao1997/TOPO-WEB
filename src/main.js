import Vue from 'vue'
import App from './App.vue'
//导入router路由
import router from './router/index'
//导入antd
import 'ant-design-vue/dist/antd.css'
//导入页面加载进度条
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

import {
  Affix,
  Anchor,
  AutoComplete,
  Alert,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Collapse,
  Carousel,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Icon,
  Input,
  InputNumber,
  Layout,
  List,
  LocaleProvider,
  message,
  Menu,
  Modal,
  notification,
  //Pagination,
  Popconfirm,
  Popover,
  Progress,
  // Radio,
  Rate,
  Row,
  Select,
  Slider,
  Spin,
  Steps,
  Switch,
  Transfer,
  TreeSelect,
  Tree,
  Tabs,
  Tag,
  TimePicker,
  Timeline,
  Tooltip,
  // Mention,
  Upload,
  // version,
  Drawer,
  Skeleton,
  ConfigProvider,
} from 'ant-design-vue';

/* v1.1.3+ registration methods */
Vue.use(Affix);
Vue.use(Anchor);
Vue.use(AutoComplete);
Vue.use(Alert);
Vue.use(Avatar);
Vue.use(BackTop);
Vue.use(Badge);
Vue.use(Breadcrumb);
Vue.use(Button);
Vue.use(Calendar);
Vue.use(Card);
Vue.use(Collapse);
Vue.use(Carousel);
Vue.use(Cascader);
Vue.use(Checkbox);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(Divider);
Vue.use(Drawer);
Vue.use(Dropdown);
Vue.use(Form);
Vue.use(Icon);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Layout);
Vue.use(List);
Vue.use(LocaleProvider);
Vue.use(Menu);
Vue.use(Modal);
//Vue.use(Pagination);
Vue.use(Popconfirm);
Vue.use(Popover);
Vue.use(Progress);
// Vue.use(Radio);
Vue.use(Rate);
Vue.use(Row);
Vue.use(Select);
Vue.use(Slider);
Vue.use(Spin);
Vue.use(Steps);
Vue.use(Switch);
Vue.use(Transfer);
Vue.use(TreeSelect);
Vue.use(Tree);
Vue.use(Tabs);
Vue.use(Tag);
Vue.use(TimePicker);
Vue.use(Timeline);
Vue.use(Tooltip);
Vue.use(Upload);
Vue.use(Skeleton);
Vue.use(ConfigProvider);

Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
});

router.afterEach(() => {
  NProgress.done()
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
