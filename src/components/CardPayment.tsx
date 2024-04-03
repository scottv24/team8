export default function CardPayment({ total }: { total: number }) {
  return (
    <div className='h-full w-full flex flex-col items-center'>
      <h1 className='font-bold text-2xl self-start mb-16'>Payment</h1>
      <div className='w-1/2'>
        <p className='font-semibold'>Card Number</p>
        <input
          className='border-2 border-black p-2 rounded-md w-full'
          placeholder='4242 4242 4242 4242'
        />
      </div>
      <div className='w-1/2'>
        <p className='font-semibold'>Name on card</p>
        <input
          className='border-2 border-black p-2 rounded-md w-full'
          placeholder='4242 4242 4242 4242'
        />
      </div>
      <div className='w-1/2'>
        <p className='font-semibold'>Card Exiry</p>
        <div className='flex'>
          <input
            className='border-2 border-black p-2 rounded-md w-full'
            placeholder='03'
            type='number'
            min={1}
            max={12}
          />
          <p className='w-auto p-2 font-semibold'>/</p>
          <input
            className='border-2 border-black p-2 rounded-md w-full'
            placeholder='24'
            type='number'
            min={24}
            max={40}
          />
        </div>
      </div>
      <div className='w-1/2'>
        <p className='font-semibold'>CVC</p>
        <div className='flex'>
          <input
            className='border-2 border-black p-2 rounded-md w-1/2'
            placeholder='03'
            type='number'
            min={1}
            max={12}
          />
        </div>
      </div>
      <p className='py-8 text-lg font-bold text-blue-900'>Total: £{total}</p>
    </div>
  )
}
