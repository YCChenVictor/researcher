// import React, { useState } from 'react';
// import Modal from 'react-modal'; // remove react-modal and build it from scratch

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [modalOpen, setModalOpen] = useState(true);

//   const PostLoginInfo = (params: { email: string, password: string }) => {
//     fetch(`${process.env.HOST_DEV}/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(params)
//     })
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         console.log(data.token);
//         localStorage.setItem('blog logged in', data.token);
//         alert('login successfully');
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <Modal
//       isOpen={modalOpen}
//       className="rounded-lg md:h-auto fixed inset-0 flex items-center justify-center"
//       appElement={document.getElementById('root')!}
//     >
//       <div className="p-6">
//         <h1 className="text-xl font-semibold text-gray-900 mb-4">Login</h1>
//         <form className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//               <input
//                 type="text"
//                 value={email}
//                 placeholder="Email"
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="mt-1 focus:ring-blue-300 focus:border-blue-300 block w-full sm:text-sm border-gray-300 rounded-md dark:border-gray-600"
//               />
//             </label>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//               <input
//                 type="password"
//                 value={password}
//                 placeholder="Password"
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 focus:ring-blue-300 focus:border-blue-300 block w-full sm:text-sm border-gray-300 rounded-md dark:border-gray-600"
//               />
//             </label>
//           </div>
//           <div className="flex justify-between">
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 PostLoginInfo({ email: email, password: password });
//                 setModalOpen(!modalOpen);
//               }}
//               className="btn-primary"
//             >
//               Login
//             </button>
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 setModalOpen(!modalOpen);
//               }}
//               className="btn-secondary"
//             >
//               Close
//             </button>
//           </div>
//         </form>
//       </div>
//     </Modal>
//   );
// }

// export default Login;
