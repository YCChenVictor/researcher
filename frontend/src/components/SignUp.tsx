// import React, { useState } from 'react';
// import Modal from 'react-modal';

// function SignUp() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [modalOpen, setModalOpen] = useState(true);

//   const PostSignUpInfo = (params: { email: string, password: string }) => {
//     fetch('http://localhost:5000/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ params })
//     })
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         localStorage.setItem('token', data.token);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   // return (
//   //   <Modal
//   //     isOpen={modalOpen}
//   //     className="rounded-lg md:h-auto fixed inset-0 flex items-center justify-center"
//   //     appElement={document.getElementById('root')}
//   //   >
//   //     <div className="p-6">
//   //       <h1 className="text-xl font-semibold text-gray-900 mb-4">Sign Up</h1>
//   //       <form className="space-y-4">
//   //         <div>
//   //           <label className="block text-sm font-medium text-gray-700">
//   //             Email
//   //             <input
//   //               type="text"
//   //               value={email}
//   //               placeholder="Email"
//   //               onChange={(e) => setEmail(e.target.value)}
//   //               className="mt-1 focus:ring-blue-300 focus:border-blue-300 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
//   //             />
//   //           </label>
//   //         </div>
//   //         <div>
//   //           <label className="block text-sm font-medium text-gray-700">
//   //             Password
//   //             <input
//   //               type="password"
//   //               value={password}
//   //               placeholder="Password"
//   //               onChange={(e) => setPassword(e.target.value)}
//   //               className="mt-1 focus:ring-blue-300 focus:border-blue-300 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600"
//   //             />
//   //           </label>
//   //         </div>
//   //         <div className="flex justify-between">
//   //           <button
//   //             onClick={() =>
//   //               PostSignUpInfo({ email: email, password: password })
//   //             }
//   //             className="btn-primary"
//   //           >
//   //             Sign Up
//   //           </button>
//   //           <button
//   //             onClick={(e) => {
//   //               e.preventDefault();
//   //               setModalOpen(!modalOpen);
//   //             }}
//   //             className="btn-secondary"
//   //           >
//   //             Close
//   //           </button>
//   //         </div>
//   //       </form>
//   //     </div>
//   //   </Modal>
//   // );
// }

// export default SignUp;
