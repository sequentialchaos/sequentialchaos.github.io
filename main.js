var app = new Vue({
  el: '#app',
  data: {
    site_name: 'Sequential Chaos',
    date: d3.timeFormat("%c")(d3.now()),
    blog: './blog'
  }
}) 