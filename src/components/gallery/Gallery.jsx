import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import GalleryCard from './GalleryCard.jsx'

const Gallery = () => {
  const gallery = [
    {
      image1: '/Gallery/img1.webp',
      image2: '/Gallery/img2.webp',
    },
    {
      image1: '/Gallery/img3.webp',
      image2: '/Gallery/img4.webp',
    },
    {
      image1: '/Gallery/img5.webp',
      image2: '/Gallery/img22.webp',
    },
    {
      image1: '/Gallery/img8.webp',
      image2: '/Gallery/img38.webp',
    },
    {
      image1: '/Gallery/img9.webp',
      image2: '/Gallery/img10.webp',
    },
    {
      image1: '/Gallery/img11.webp',
      image2: '/Gallery/img12.webp',
    },
    {
      image1: '/Gallery/img13.webp',
      image2: '/Gallery/img14.webp',
    },
    {
      image1: '/Gallery/img15.webp',
      image2: '/Gallery/img16.webp',
    },
     {
      image1: '/Gallery/img17.webp',
      image2: '/Gallery/img18.webp',
    },
     {
      image1: '/Gallery/img19.webp',
      image2: '/Gallery/img21.webp',
    },
    {
      image1: '/Gallery/img23.webp',
      image2: '/Gallery/img24.webp',
    },
    {
      image1: '/Gallery/img27.webp',
      image2: '/Gallery/img28b.webp',
    },
    {
      image1: '/Gallery/img29.webp',
      image2: '/Gallery/img30.webp',
    },
    {
      image1: '/Gallery/img31.webp',
      image2: '/Gallery/img32.webp',
    },
    {
      image1: '/Gallery/img33.webp',
      image2: '/Gallery/img34d.webp',
    },
    {
      image1: '/Gallery/img36.webp',
      image2: '/Gallery/img35.webp',
    },
    {
      image1: '/Gallery/img39.webp',
      image2: '/Gallery/img444.webp',
    },
  ]

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    if (window.innerWidth >= 640) {
      gsap.from('.hero', {
        height: '100px',
        stagger: { amount: 0.4 },
        scrollTrigger: {
          trigger: '.lol',
          start: 'top 100%',
          end: 'top -150%',
          scrub: true,
        },
      })
    }

    if (window.innerWidth < 640) {
      gsap.from('.hero', {
        opacity: 0,
        y: 100,
        stagger: 0.3,
        duration: 1,
        scrollTrigger: {
          trigger: '.lol',
          start: 'top 90%',
          end: 'top 10%',
          toggleActions: 'play none none reverse',
        },
      })
    }
  })

  return (
    <div className='lg:p-4 p-2 mb-[70vh]'>
      <div className=" pt-[15vw] w-full relative overflow-hidden">
 <h1
  className="
    text-white
    font-extrabold
    text-[11vw]
    sm:text-[9vw]  
    text-center
    lg:-mt-20 mt-2
  "
>
  Gallery
</h1>
</div>

      {/*  group/gallery controls global dimming */}
      <div className="lol group/gallery">
        {gallery.map((elem, idx) => (
          <div
            key={idx}
            className="hero w-full lg:h-[80vh] mb-4 flex lg:flex-row flex-col lg:gap-4 gap-2"
          >
            <GalleryCard image1={elem.image1} image2={elem.image2} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery
