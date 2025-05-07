import Title from '../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const Contact = () => {
  // Cloudinary optimization parameters
  const cloudinaryBaseUrl = "https://res.cloudinary.com/dyj3rywju/image/upload/";
  const optimizationParams = [
    "f_auto",
    "q_auto",
    "w_480",
    "dpr_auto",
    "c_fill",
    "g_center"
  ].join(",");

  const contactImageUrl = "https://images.unsplash.com/photo-1675501344642-92d35d90fe51?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img 
          src={contactImageUrl}
          className='w-full md:max-w-[480px] rounded-2xl object-cover aspect-[4/3]' 
          alt="Fresh potatoes" 
          loading="eager"
          width="480"
          height="360"
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, 480px"
          onError={(e) => {
            console.error('Image failed to load:', e);
            e.target.src = 'https://images.unsplash.com/photo-1675501344642-92d35d90fe51?q=80&w=1974&auto=format&fit=crop';
          }}
        />
        <div className='flex flex-col justify-center items-start gap-8'>
          <div>
            <p className='font-semibold text-xl text-gray-800 mb-4'>Get In Touch</p>
            <p className='text-gray-600 max-w-md'>Have questions about our products or delivery? 
              We&apos;re here to help you get the freshest produce for your family.</p>
          </div>

          <div className='flex flex-col gap-6'>
            <div className='flex items-center gap-3 text-gray-600'>
              <MapPin className='text-primary' size={20} />
              <p>3rd main road<br />Markets Palace 603202</p>
            </div>

            <div className='flex items-center gap-3 text-gray-600'>
              <Phone className='text-primary' size={20} />
              <p>+91 85008 11805</p>
            </div>

            <div className='flex items-center gap-3 text-gray-600'>
              <Mail className='text-primary' size={20} />
              <p>farmer@gmail.com</p>
            </div>

            <div className='flex items-center gap-3 text-gray-600'>
              <Clock className='text-primary' size={20} />
              <p>Mon - Sat: 8:00 AM - 8:00 PM<br />Sunday: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Contact