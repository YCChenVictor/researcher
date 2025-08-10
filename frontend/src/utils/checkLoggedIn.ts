// import axios from 'axios';

// export async function checkLoggedIn() {
//   const url = 'http://localhost:5000/authentication';
//   const token = localStorage['blog logged in'];
//   const headers = {
//     Authorization: `Bearer ${token}`
//   };

//   try {
//     const response = await axios.get(url, { headers });
//     return {
//       name: '',
//       loggedIn: response.data.loggedIn
//     };
//   } catch (error) {
//     // console.error("Error:", error)
//     return {
//       loggedIn: false
//     };
//   }
// }
