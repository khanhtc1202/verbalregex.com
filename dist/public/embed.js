if (!window.hasOwnProperty('_codefund_theme')) {
  window._codefund_theme = '#cf_ad {  font-family: system, &quot;Helvetica Neue&quot;, Helvetica, Arial;  font-size: 13px;}#cf_ad .cf-wrapper {  box-sizing: border-box;  position: absolute;  bottom: 0;  z-index: 5;  padding: .5em 1em;  width: 100%;  border-top: solid 1px #bfbfbf;  background-color: #eeeeee;  text-align: center;  line-height: 1.5;}#cf_ad .cf-text {  color: inherit;  text-decoration: none;}#cf_ad .cf-text:before {  margin-right: 4px;  padding: 2px 6px;  border-radius: 3px;  background-color: #4caf50;  color: #fff;  content: &quot;Supporter&quot;;}#cf_ad .cf-powered-by {    font-size: 12px;    text-decoration: none;    color: #999;}';
}

if (!window.hasOwnProperty('_codefund_template')) {
  window._codefund_template = '&lt;div id=&quot;cf_ad&quot;&gt;  &lt;span class=&quot;cf-wrapper&quot;&gt;    &lt;a href=&quot;{{link}}&quot; class=&quot;cf-text&quot; target=&quot;_blank&quot;&gt;      {{description}}    &lt;/a&gt;    &lt;a href=&quot;{{poweredByLink}}&quot; class=&quot;cf-powered-by&quot; target=&quot;_blank&quot; rel=&quot;noopener&quot;&gt;      ads via codefund.io      &lt;img src=&quot;{{pixel}}&quot; width=&quot;1&quot; height=&quot;1&quot; style=&quot;width: 1px; height: 1px;&quot; /&gt;    &lt;/a&gt;  &lt;/span&gt;&lt;/div&gt;';
}

var _codefund = {
  init: function(config) {
    this.render = this.render.bind(this);
    this.targetId = config.targetId;
    this.jsonUrl = 'https://codefund.io/t/s/1d661b49-1dee-40d6-b9e3-0b36cb7f8f86/details.json';
  },

  serve: function() {
    this.loadJSON(this.jsonUrl, this.render);
  },

  render: function(ad) {
    this.addTheme();
    this.insertAd(ad);
  },

  addTheme: function() {
    var css = this.decodeHtml(window._codefund_theme);
    var head = document.getElementsByTagName('head')[0];
    var s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    if (s.styleSheet) { // IE
      s.styleSheet.cssText = css;
    } else {
      s.appendChild(document.createTextNode(css));
    }
    head.appendChild(s);
  },

  insertAd: function (ad) {
    var rawHtml = this.decodeHtml(window._codefund_template);
    var html = this.injectVariableIntoTemplate(rawHtml, ad);
    var el = document.createElement("span");
    el.innerHTML = html;

    const script = document.getElementById(this.targetId);
    if (ad.link === "") {
      console.log('CodeFund does not have a advertiser for you at this time.');
    } else {
      if (script && ad.link !== "") {
        script.appendChild(el);
      } else {
        console.log('CodeFund target does not exist. You must create an element in the DOM with id="' + this.targetId + '"');
      }
    }
  },

  decodeHtml: function (text) {
    var entities = [
      ['amp', '&'],
      ['apos', '\''],
      ['#x27', '\''],
      ['#x2F', '/'],
      ['#39', '\''],
      ['#47', '/'],
      ['lt', '<'],
      ['gt', '>'],
      ['nbsp', ' '],
      ['quot', '"']
    ];

    for (var i = 0, max = entities.length; i < max; ++i)
      text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);

    return text;
  },

  injectVariableIntoTemplate: function (template, data) {
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        var re = new RegExp('{{' + key + '}}', 'g');
        template = template.replace(re, data[key]);
      }
    }
    return template;
  },

  loadJSON: function(url, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", url, true);
    xobj.onreadystatechange = () => {
      if (xobj.readyState === 4 && xobj.status === 200) {
        const json = JSON.parse(xobj.responseText);
        callback(json);
      }
    };
    xobj.send(null);
  }
}

_codefund.init({
  targetId: 'codefund_ad'
});
_codefund.serve();