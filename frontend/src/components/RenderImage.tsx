// import React, { useState, useEffect } from 'react';

// const RenderImage = (props: { src: string }) => {
//   const [image, setImage] = useState('');
//   useEffect(() => {
//     const fetchImage = async () => {
//       const imgModule = await import(`../${props.src}.png`);
//       setImage(imgModule.default);
//     };
//     fetchImage();
//   }, []);

//   return <img src={image}></img>;
// };

// export default RenderImage;
