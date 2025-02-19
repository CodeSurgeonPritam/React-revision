// import { useState } from 'react';
// const App = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form data:', formData);
//     setFormData('');
//   };

//   return (
//     <form className='mt=8 w-80 flex items-center justify-items-center flex-col gap-6 border' 
//     onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input
//         className='border'
//           type='text'
//           name='name'
//           value={formData.name}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Email:
//         <input
//         className='border'
//           type='email'
//           name='email'
//           value={formData.email}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Password:
//         <input
//         className='border'
//           type='password'
//           name='password'
//           value={formData.password}
//           onChange={handleChange}
//         />
//       </label>
//       <button
//       className='bg-purple-400 px-2 py-3'
//       type='submit'>Submit</button>
//     </form>
//   );
// };

// export default App;


// import { useState } from 'react';

// function App() {
//   const [selectedOption, setSelectedOption] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Selected Option: ${selectedOption}`);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Choose an option:
//         <select
//           value={selectedOption}
//           onChange={(e) => setSelectedOption(e.target.value)}
//         >
//           <option value="">Select</option>
//           <option value="option1">Option 1</option>
//           <option value="option2">Option 2</option>
//           <option value="option3">Option 3</option>
//         </select>
//       </label>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default App;


// import { useState } from 'react';

// function App() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value }); 
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form Data:', formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Name:
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Email:
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Password:
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//       </label>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default App;


// import { useState } from 'react';

// function InputField({ value, onChange }) {
//   return (
//     <input
//     className='border'
//       type="text"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//     />
//   );
// }

// function App() {
//   const [inputValue, setInputValue] = useState('');

//   return (
//     <div>
//       <InputField value={inputValue} onChange={setInputValue} />
//       <p>You typed: {inputValue}</p>
//     </div>
//   );
// }

// export default App;