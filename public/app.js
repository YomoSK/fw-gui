Vue.createApp({
   data() {
      return {
         ports: []
      }
   },
   methods: {
      async deleteRules(numbers) {
         numbers = numbers.reverse();
         for(let i = 0; i < numbers.length; i++) {
            // const http = await axios.post(window.location.href + 'delete', { rules: numbers });
            const http = await axios.post('http://89.203.248.161:5959/delete/' + numbers[i]);
            const { data } = await http;
            alert(data.success || data.error);
            if(data?.success) {
               this.ports = this.ports.filter(({ number }) => number !== numbers[i]);
            }
         }
      }
   },
   async mounted() {
      // const http = await axios.get(window.location.href + 'ports');
      const http = await axios.get('http://89.203.248.161:5959/ports');
      const { data } = await http;
      if(data.error) alert(data.error);
      else {
         const _splitted = data.success.split('\n').filter(row => row.startsWith('[ ')).map(row => row.split(' ')).map(_ => _.filter(item => item.length > 0));
         console.log(_splitted);
         _splitted.forEach(splitted => {
            const isIPv6 = splitted.some(_ => _.includes('v6'));
            const status = isIPv6 ? [splitted[4], splitted[5], splitted[6]].join(' ') : [splitted[3], splitted[4], splitted[5]].join(' ');
            this.ports.push({ number: +splitted[1].replace(']', ''), port: splitted[2], ipv: isIPv6 ? 'v6' : 'v4', status, selected: false });
         });
      }
   }
}).mount('#app');