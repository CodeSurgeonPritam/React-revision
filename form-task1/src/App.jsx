import { useState,useEffect } from 'react';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
  });

// Initialize dataArray from localStorage or empty array
const [dataArray, setDataArray] = useState(() => {
  const savedData = localStorage.getItem('contacts');
  return savedData ? JSON.parse(savedData) : [];
});


  const [editingId, setEditingId] = useState(null);


  // Save to localStorage whenever dataArray changes
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(dataArray));
  }, [dataArray]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCardEdit = (e, id) => {
    const { name, value } = e.target;
    setDataArray((prevArray) =>
      prevArray.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newData = {
      id: Date.now(),
      ...formData,
    };
    setDataArray((prevArray) => [...prevArray, newData]);
    setFormData({
      name: '',
      email: '',
      number: '',
    });
  };

  const handleDelete = (id) => {
    setDataArray((prevArray) => prevArray.filter((item) => item.id !== id));
  };

  const toggleEdit = (id) => {
    setEditingId(editingId === id ? null : id);
  };

  return (
    <div className='w-full flex h-screen'>
      <div className='w-1/3 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center'>
        <form
          onSubmit={submitHandler}
          className='w-[80%] max-w-md p-8 bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl'>
          <h2 className='text-2xl font-bold mb-6 text-white'>Contact Form</h2>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-200 mb-1'>
                Name
              </label>
              <input
                className='w-full px-4 py-2 bg-white/20 border border-gray-300/30 rounded-lg 
                          focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none
                          transition duration-200 text-white placeholder-gray-400'
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Enter your name'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-200 mb-1'>
                Email
              </label>
              <input
                className='w-full px-4 py-2 bg-white/20 border border-gray-300/30 rounded-lg 
                          focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none
                          transition duration-200 text-white placeholder-gray-400'
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-200 mb-1'>
                Phone Number
              </label>
              <input
                className='w-full px-4 py-2 bg-white/20 border border-gray-300/30 rounded-lg 
                          focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none
                          transition duration-200 text-white placeholder-gray-400'
                type='tel'
                name='number'
                value={formData.number}
                onChange={handleChange}
                placeholder='Enter your phone number'
                required
              />
            </div>
          </div>
          <button
            type='submit'
            className='w-full px-4 py-2 mt-6 bg-cyan-500 hover:bg-cyan-600
                     text-white font-medium rounded-lg transform transition
                     duration-200 hover:scale-[1.02] active:scale-[0.98]
                     focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2'>
            Submit
          </button>
        </form>
      </div>

      <div className='w-2/3 bg-gradient-to-br from-neutral-700 to-neutral-800 p-8 overflow-y-auto'>
        <h2 className='text-3xl font-bold text-white mb-6 text-center'>
          Contact Cards
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {dataArray.map((item) => (
            <div
              key={item.id}
              className='bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl'>
              <div className='flex justify-between items-start'>
                <div className='w-full'>
                  {editingId === item.id ? (
                    // Editing Mode
                    <>
                      <input
                        className='w-full px-2 py-1 mb-2 bg-white/20 border border-gray-300/30 rounded
                                text-white text-xl font-semibold outline-none'
                        type='text'
                        name='name'
                        value={item.name}
                        onChange={(e) => handleCardEdit(e, item.id)}
                      />
                      <input
                        className='w-full px-2 py-1 mb-2 bg-white/20 border border-gray-300/30 rounded
                                text-white outline-none'
                        type='email'
                        name='email'
                        value={item.email}
                        onChange={(e) => handleCardEdit(e, item.id)}
                      />
                      <input
                        className='w-full px-2 py-1 bg-white/20 border border-gray-300/30 rounded
                                text-white outline-none'
                        type='tel'
                        name='number'
                        value={item.number}
                        onChange={(e) => handleCardEdit(e, item.id)}
                      />
                    </>
                  ) : (
                    // Display Mode
                    <>
                      <h3 className='text-xl font-semibold text-white mb-2'>
                        {item.name}
                      </h3>
                      <p className='text-gray-300 mb-1'>
                        <span className='font-medium'>Email:</span> {item.email}
                      </p>
                      <p className='text-gray-300'>
                        <span className='font-medium'>Phone:</span> {item.number}
                      </p>
                    </>
                  )}
                </div>
                <div className='flex gap-2 ml-2'>
                  <button
                    onClick={() => toggleEdit(item.id)}
                    className='text-blue-400 hover:text-blue-500 transition-colors'>
                    {editingId === item.id ? (
                      // Save Icon
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'>
                        <path d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' />
                      </svg>
                    ) : (
                      // Edit Icon
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'>
                        <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='text-red-400 hover:text-red-500 transition-colors'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
