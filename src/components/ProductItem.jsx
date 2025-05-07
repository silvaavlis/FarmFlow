import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import {Link} from 'react-router-dom'

const ProductItem = ({id, name, price, description, category, available}) => {
    const {currency} = useContext(ShopContext);
  
    return (
        <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
            <div className='bg-white rounded-2xl shadow-xl border border-gray-200 p-6 flex flex-col items-center justify-center min-h-[200px] hover:shadow-2xl transition-shadow relative'>
                <h2 className='text-2xl font-extrabold text-center mb-2 font-serif tracking-wide'>{name}</h2>
                <p className='text-gray-600 text-center mb-2'>{description}</p>
                <div className='flex flex-col items-center gap-1'>
                  <span className='text-lg font-semibold text-green-700'>₹{price}</span>
                  <span className='text-xs bg-green-100 text-green-800 px-2 py-1 rounded'>{category}</span>
                  <span className={`text-xs px-2 py-1 rounded ${available ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}`}>{available ? 'Available' : 'Unavailable'}</span>
                </div>
            </div>
        </Link>
    )
}

export default ProductItem
