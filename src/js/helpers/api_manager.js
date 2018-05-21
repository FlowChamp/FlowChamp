export default class ApiManager {
   constructor() {
      this.url = 'https://dev.flowchamp.org/api/cpslo';
      this.mode = 'cors';
      this.credentials = 'include';
      this.isLoggedIn = false;
   }

   getStockCharts = () => {
      return this.makeRequest({
         url: `${this.url}/stock_charts/15-17`,
         data: {}
      });
   };

   makeRequest(options) {
      const { url, data } = options;

      return new Promise(function(resolve, reject) {
         fetch(url, data)
            .then(response => {
               response.json().then(data => {
                  if (response.status >= 300) {
                     reject(data.message);
                  }
                  resolve(data);
               });
            })
            .catch(e => {
               reject(Error(e));
            });
      });
   }
}
