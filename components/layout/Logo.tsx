import Link from 'next/link'
import Image from 'next/image'
import { LOGOS } from '@/lib/data/assets'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-3">
      <Image 
        src={LOGOS.primary}
        alt="Atikis Minnesota Aviation Catering"
        width={60}
        height={60}
        className="object-contain"
        priority
      />
      <span className="font-montserrat font-bold text-2xl text-white">
        <span className="text-[#D4AF37]">ATIKIS</span>
      </span>
    </Link>
  )
}

export default Logo