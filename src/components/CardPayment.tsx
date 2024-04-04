export default function CardPayment({
  total,
  updateCardDetails,
  error,
}: {
  total: number
  updateCardDetails: (value: {
    number?: string
    name?: string
    month?: number
    year?: number
    cvc?: string
  }) => void
  error: string
}) {
  return (
    <div className='h-full w-full flex flex-col items-center'>
      <h1 className='font-bold text-2xl self-start mb-16'>Payment</h1>
      <div className='w-2/3'>
        <p className='font-semibold'>Card Number</p>
        <input
          className={`${
            error === 'card'
              ? 'border-4 border-red-700'
              : 'border-2 border-black'
          }  p-2 rounded-md w-full`}
          placeholder='4242 4242 4242 4242'
          onChange={(e) => updateCardDetails({ number: e.target.value })}
        />
      </div>
      <div className='w-2/3'>
        <p className='font-semibold'>Name on card</p>
        <input
          className={`${
            error === 'name'
              ? 'border-4 border-red-700'
              : 'border-2 border-black'
          } p-2 rounded-md w-full`}
          placeholder='Full Name'
          onChange={(e) => updateCardDetails({ name: e.target.value })}
        />
      </div>
      <div className='w-2/3'>
        <p className='font-semibold'>Card Exiry</p>
        <div className='flex'>
          <input
            className={`${
              error === 'month'
                ? 'border-4 border-red-700'
                : 'border-2 border-black'
            } p-2 rounded-md w-full`}
            placeholder='03'
            type='number'
            min={1}
            max={12}
            onChange={(e) => updateCardDetails({ month: +e.target.value })}
          />
          <p className='w-auto p-2 font-semibold'>/</p>
          <input
            className={`${
              error === 'year'
                ? 'border-4 border-red-700'
                : 'border-2 border-black'
            } p-2 rounded-md w-full`}
            placeholder='24'
            type='number'
            min={24}
            max={40}
            onChange={(e) => updateCardDetails({ year: +e.target.value })}
          />
        </div>
      </div>
      <div className='w-2/3'>
        <p className='font-semibold'>CVC</p>
        <div className='flex'>
          <input
            className={`${
              error === 'cvc'
                ? 'border-4 border-red-700'
                : 'border-2 border-black'
            } p-2 rounded-md w-1/2`}
            placeholder='000'
            type='number'
            min={1}
            max={12}
            onChange={(e) => updateCardDetails({ cvc: e.target.value })}
          />
        </div>
      </div>
      <p className='py-8 text-lg font-bold text-blue-900'>
        Total: £{total.toFixed(2)}
      </p>
    </div>
  )
}
