        var app = new Vue({
          el:'#app',
          data: {
            menu: ['About', 'Configure', 'Search'],
            active: 'About',
            iconList: [],

            base: document.location + '',
            query:'',
            threshold: 50,
            folder: 'FatCow_Icons32x32',
            mode:'Javascript'
          },
          computed: {
            resultList: function() {
              if(!this.query.length) {
                return [];
              }
              var result = [];
              this.iconList.forEach(function(icon) {
                  if(result.length < this.threshold && icon.indexOf(this.query) != -1) {
                    result.push(icon);
                  }
              }.bind(this));
              return result;
            }
          },
          methods: {
            makeUrl: function(icon) {
              return this.base + this.folder + '/' + icon;
            },
            copyIcon: function(e) {
              var name = e.target.name, 
                  result = name;
              if(this.mode == 'Javascript') {
                if(this.folder == 'FatCow_Icons32x32') {
                  result = 'icon.big("' + name + '")';
                } else if(this.folder == 'FatCow_Icons16x16') {
                  result = 'icon.small("' + name + '")';
                } 
              } else if(this.mode == 'Link') {
                result = this.makeUrl(name);
              } else if(this.mode == 'Image') {
                result = '<img src="' + this.makeUrl(name) + '" />';
              }

              // todo copy to clipboard
              alert(result);
            }
          }
        });

        superagent.get('filename-list.txt').end(function(err, res) {
          app.iconList = res.text.split("\n");
        });
