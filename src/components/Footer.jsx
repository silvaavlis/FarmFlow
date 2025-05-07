import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-small'>

        <div>
            <Link to="/" className="font-display text-2xl text-primary">
                FarmFlow
            </Link>
            <p className='w-full md:w-2/3 text-gray-600'>
            Fresh Vegetables & Fruits Delivered to Your Door
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-5 '>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5 '>Get In Touch</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+91 9919919911</li>
                <li>FreshDel@gmail.com</li>
            </ul>
        </div>
      </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>
               .
            </p>
        </div>
    </div>
  )
}

export default Footer
