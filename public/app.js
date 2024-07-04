Vue.createApp({
   data() {
      return {
         ports: []
      }
   },
   async mounted() {
      const http = await axios.get(window.location.href + 'ports');
      const { data } = await http;
      if(data.error) alert(data.error);
      else {
         const _splitted = data.split('\n').filter(row => row.startsWith('[ ')).map(row => row.split(' ')).map(_ => _.filter(item => item.length > 0));
         console.log(_splitted);
         _splitted.forEach(splitted => {
            const isIPv6 = splitted.some(_ => _.includes('v6'));
            const status = isIPv6 ? [splitted[4], splitted[5], splitted[6]].join(' ') : [splitted[3], splitted[4], splitted[5]].join(' ');
            this.ports.push({ number: +splitted[1].replace(']', ''), port: splitted[2], ipv: isIPv6 ? 'v6' : 'v4', status, selected: false });
         });
      }
   }
}).mount('#app');