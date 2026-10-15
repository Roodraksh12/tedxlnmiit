const GalleryCard = ({ image1, image2 }) => {
  return (
    <>
      {/* CARD 1 */}
      <div
        className="
          lg:w-1/2
          relative
          overflow-hidden
          transition-all duration-500
          rounded-none hover:rounded-[70px]
          brightness-90
          group-hover/gallery:brightness-55

          /* when THIS card hovered, brighten */
          hover:!brightness-110
          hover:z-10
        "
      >
        <img
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
          src={image1}
          alt="Gallery Image"
        />
      </div>

      {/* CARD 2 */}
      <div
        className="
          lg:w-1/2
          relative
          overflow-hidden
          transition-all duration-500
          rounded-none hover:rounded-[70px]
          brightness-90
          group-hover/gallery:brightness-75
          hover:!brightness-110
          hover:z-10
        "
      >
        <img
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
          src={image2}
          alt="Gallery Image"
        />
      </div>
    </>
  )
}

export default GalleryCard
