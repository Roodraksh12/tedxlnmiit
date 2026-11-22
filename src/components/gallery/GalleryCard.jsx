const GalleryCard = ({ image1, image2, eager }) => {
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
          src={image1.src}
          alt={image1.alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
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
          src={image2.src}
          alt={image2.alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
    </>
  )
}

export default GalleryCard
