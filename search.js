var app = new Vue({
  el:'#app',
  data: {

    // app state
    menu: [
      {icon: 'help', name: 'About'},
      {icon: 'zoom', name: 'Search'},
      {icon: 'setting_tools', name: 'Configure'}
    ],
    active: 'About',
    appStyle: {display: 'none'},
    query:'',
    readme: '',
    iconList: [],
    hiddenIconsCount: 0,

    // app configuration
    base: (document.location + '').replace('#', ''),
    threshold: 100,
    folder: 'FatCow_Icons32x32',
    mode:'Javascript'
  },

  ready: function() {

    // register cookies handler and read stored data
    ['active', 'threshold', 'folder', 'mode'].forEach(function(property) {
      var cookieName = 'icon-' + property;
      this.$watch(property, function(value) {
        Cookies.set(cookieName, value);
      });
      if(Cookies.get(cookieName)) {
        this[property] = Cookies.get(cookieName);
      }
    }.bind(this));

    // load icons
    superagent.get('filename-list.txt').end(function(err, res) {
      this.iconList = res.text.split("\n").map(function(el) {
        return el.replace('\r', '').replace('.png', '');
      });
    }.bind(this));

    // load readme
    superagent.get('README.md').end(function(err, res) {
      this.readme = markdown.toHTML(res.text);
      this.appStyle.display = 'block';
    }.bind(this));
  },

  computed: {
    searchResult: function() {
      var result = [], hidden = 0;
      this.iconList.forEach(function(icon) {
          if(icon.indexOf(this.query) != -1) {
            if(result.length < this.threshold) {
              result.push(icon);
            } else {
              hidden++;
            }
          }
      }.bind(this));
      this.hiddenIconsCount = hidden;
      return result;
    }
  },
  methods: {
    makeUrl: function(icon) {
      return this.base + this.folder + '/' + icon + '.png';
    },
    copyIcon: function(e) {
      var name = e.target.title, 
          result = name;
      if(this.mode == 'Javascript') {
        if(this.folder == 'FatCow_Icons32x32') {
          result = 'icon.big(\'' + name + '\')';
        } else if(this.folder == 'FatCow_Icons16x16') {
          result = 'icon.small(\'' + name + '\')';
        } 
      } else if(this.mode == 'Filename') {
        result = name + '.png';
      } else if(this.mode == 'Link') {
        result = this.makeUrl(name);
      } else if(this.mode == 'Image') {
        result = '<img src=\'' + this.makeUrl(name) + '\'/>';
      }

      // todo copy to clipboard
      alert(result);
    }
  }
});
