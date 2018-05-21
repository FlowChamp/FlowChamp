export default class UserManager {
   constructor(config) {
      this.config = config;
      this.url = 'https://dev.flowchamp.org/api/cpslo';
      this.mode = 'cors';
      this.credentials = 'include';
      this.isLoggedIn = false;
   }

   logIn = credentials => {
      const { username, password, remember } = credentials;

      return this.makeRequest({
         url: `${this.url}/authorize`,
         data: {
            method: 'POST',
            headers: {
               Authorization: 'Basic ' + btoa(`${username}:${password}`),
               'Content-Type': 'application/json',
            },
            credentials: this.credentials,
            mode: this.mode,
            body: JSON.stringify({ username, password, remember }),
         },
      });
   };

   logOut = config => {
      console.log(config);
      const { username } = config;

      return this.makeRequest({
         url: `${this.url}/users/${username}/logout`,
         data: {
            method: 'POST',
            credentials: this.credentials,
            mode: this.mode,
         },
      });
   };

   getUserConfig = config => {
      const { username } = config;

      return this.makeRequest({
         url: `${this.url}/users/${username}/config`,
         data: {
            method: 'GET',
            credentials: this.credentials,
            mode: this.mode,
         },
      });
   };

   updateConfig(newConfig) {
      const { username } = newConfig;
      this.config = newConfig;

      return this.makeRequest({
         url: `${this.url}/users/${username}/config`,
         data: {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            credentials: this.credentials,
            mode: this.mode,
            body: JSON.stringify(newConfig),
         },
      });
   }

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

   getConfig() {
      return this.config;
   }
}
