import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex justify-center mb-8">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sola-original-logo-1-Nbzb9SJautHZPJLfdsBp446XaJ8ztv.svg"
        alt="Sola Logo"
        width={123}
        height={34}
        priority
      />
    </div>
  )
}

