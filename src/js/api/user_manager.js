export default class UserManager {
   constructor(config) {
      this.config = config;
      this.url = 'https://dev.flowchamp.org/api/cpslo';
      this.mode = 'cors';
      this.credentials = 'include';
      this.isLoggedIn = false;
   }

   logIn = credentials => {
      const { username, password } = credentials;

      return this.makeRequest({
         url: `${this.url}/authorize`,
         data: {
            method: 'POST',
            headers: {
               authorization: 'Basic ' + btoa(`${username}:${password}`),
               'Content-Type': 'application/json',
            },
            credentials: this.credentials,
            mode: this.mode,
            body: JSON.stringify(credentials),
         },
      });
   };

   logOut = config => {
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

   addChart = ({ name, major }) => {
      const { username } = this.config;

      return this.makeRequest({
         url: `${this.url}/users/${username}/import`,
         data: {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            credentials: this.credentials,
            mode: this.mode,
            body: JSON.stringify({
               target: major,
               year: '15-17',
               destination: name
            }),
         },
      });
   }

   deleteChart = (name) => {
      const { username } = this.config;

      return this.makeRequest({
         url: `${this.url}/users/${username}/charts/${name}`,
         data: {
            method: 'DELETE',
            credentials: this.credentials,
            mode: this.mode,
         },
      });
   }

   getUserConfig = () => {
      const { username } = this.config;

      return this.makeRequest({
         url: `${this.url}/users/${username}/config`,
         data: {
            method: 'GET',
            credentials: this.credentials,
            mode: this.mode,
         },
      });
   };

   getUserChart = name => {
      const { username } = this.config;

      return this.makeRequest({
         url: `${this.url}/users/${username}/charts/${name}`,
         data: {
            method: 'GET',
            credentials: this.credentials,
            mode: this.mode,
         },
      });
   }

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

   updateCourse(course) {
      const { active_chart, username } = this.config;
      const { block_metadata } = course;
      const { _id } = block_metadata;

      return this.makeRequest({
         url: `${this.url}/users/${username}/charts/${active_chart}/${_id}`,
         data: {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            credentials: this.credentials,
            mode: this.mode,
            body: JSON.stringify(block_metadata),
         },
      });
   }

   addCourse(block_metadata) {
      const { active_chart, username } = this.config;

      return this.makeRequest({
         url: `${this.url}/users/${username}/charts/${active_chart}`,
         data: {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            credentials: this.credentials,
            mode: this.mode,
            body: JSON.stringify(block_metadata),
         },
      });
   }

   deleteCourse(id) {
      const { active_chart, username } = this.config;

      return this.makeRequest({
         url: `${this.url}/users/${username}/charts/${active_chart}/${id}`,
         data: {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            },
            credentials: this.credentials,
            mode: this.mode,
            body: JSON.stringify(id),
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
               })
               .catch(e => {
                  console.error("JSON Parse Error. Response: ");
                  console.log(response);
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


