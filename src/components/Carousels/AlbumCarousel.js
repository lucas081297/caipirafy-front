import { useState, useRef, useEffect } from 'react';
import { Navigation, Pagination, A11y, EffectCoverflow, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import { AddDialog } from '../Dialogs/AddDialog';
import { AlbumsDeleteDialog } from '../Dialogs/AlbumsDeleteDialog';
import { SearchDialog } from '../Dialogs/SearchDialog';

export const AlbumCarousel = (props) => {

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };
  const swiper = useRef(null)
  const [swiperSlides, setSwiperSlides] = useState([])
  const [targetSlide,setTargetSlides] = useState(null)
  const [target,setTarget] = useState(true)
  const [currentAlbum, setCurrentAlbum] = useState(0)
  const [open,setOpen] = useState(false)
  const [editTrigger, setEditTrigger] = useState(false)
  const [addTrigger, setAddTrigger] = useState(false)
  const [deleteTrigger, setDeleteTrigger] = useState(false)



  const goToSlide = (index) => {
    swiperSlides.map((slide,i) => {
      if(slide.id.toString() === index.toString()){
        return i === 0 ? targetSlide.slideToLoop((3)%swiperSlides.length) :  targetSlide.slideToLoop((i-1)%swiperSlides.length)
      }
    })
  }

  const getImg = (album_name) => {
    try{
      return require(`../../assets/AlbumCovers/${album_name.toString().trim().toLowerCase().replace(/\s/g, '')}.png`)
    } catch(e){
      return require('../../assets/AlbumCovers/default.webp')
    }
  }


  useEffect(() => {
    if (currentAlbum === 0 || currentAlbum === undefined) {
      setSwiperSlides(swiper.current['swiper']['slides'])
      setCurrentAlbum(swiper.current['swiper']['slides'][1]?.id)
      props.handleAlbum(swiper.current['swiper']['slides'][1]?.id)
    }
    props.handleAlbum(currentAlbum)
  },[props,currentAlbum,open])
  
  return (
    <>
      <div  className= 'flex justify-end w-full pe-6 pb-5'>
          <svg onClick={() => setDeleteTrigger(true)}  className='w-[5%] me-5 cursor-pointer border rounded hover:bg-deep-orange-400' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path  d="M10 12V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path  d="M14 12V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path  d="M4 7H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path  d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path  d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          <svg onClick={() => setAddTrigger(true)} className='w-[5%] me-5 cursor-pointer border rounded hover:bg-deep-orange-400' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>

          <svg onClick={() => setEditTrigger(true)} className='w-[5%] p-1 cursor-pointer border rounded hover:bg-deep-orange-400' fill="#000000" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.027 9.92L16 13.95 14 16l-4.075-3.976A6.465 6.465 0 0 1 6.5 13C2.91 13 0 10.083 0 6.5 0 2.91 2.917 0 6.5 0 10.09 0 13 2.917 13 6.5a6.463 6.463 0 0 1-.973 3.42zM1.997 6.452c0 2.48 2.014 4.5 4.5 4.5 2.48 0 4.5-2.015 4.5-4.5 0-2.48-2.015-4.5-4.5-4.5-2.48 0-4.5 2.014-4.5 4.5z" fillRule="evenodd"/>
          </svg>

      </div>
      <AlbumsDeleteDialog handleOpen={setDeleteTrigger} handleUpdate={props.handleUpdate} open={deleteTrigger} albums={props.albums} targetAlbum={props.targetAlbum}></AlbumsDeleteDialog>
      <AddDialog update={props.update} handleOpen={setAddTrigger} handleUpdate ={props.handleUpdate} open={addTrigger} albums={props.albums}></AddDialog>
      <SearchDialog handleOpen={setEditTrigger} goToSlide={goToSlide} open={editTrigger}  albums={props.albums} tracks={props.tracks}></SearchDialog>
      <Swiper
          modules={[Navigation, Pagination, A11y, EffectCoverflow, Keyboard]}
          spaceBetween={30}
          slidesPerView={3}
          effect={'coverflow'}
          keyboard={{
            enabled: true
          }}
          onSwiper={setTargetSlides}
          coverflowEffect={{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:true}}
          loop="true"
          fadeEffect="true"
          mousewheel={{forceToAxis: true}}
          navigation
          pagination={pagination}
          normalizeSlideIndex = {true}
          onRealIndexChange={e =>
            {
              setCurrentAlbum(swiperSlides[(e.realIndex+1)%swiperSlides.length].id);
              props.handleAlbum(currentAlbum)
              }
            }
          ref={swiper}
          className='albumcarousel'
          >
            {props.albums.map(albums => {
              return (
                <SwiperSlide key={albums.id} id={albums.id}>
                  <div id={albums.id} onMouseEnter={e => setTarget(albums.id)} onMouseLeave={ e => setTarget('0')} className={target.toString() === albums.id.toString() ? 'absolute top-[20%] left-[-15%] translate-x-1/2 translate-y-1/2 text-white font-bold' : 'hidden'}>
                  <p>{albums.name}</p>
                  <p>{'Lançamento: '+ albums.release_date}</p>
                  <p>{'Preço: '+ albums.price}</p>
                  </div>
                  <div onMouseEnter={e => setTarget(e.target.className)} onMouseLeave={ e => setTarget('0')} className={albums.id}>
                    <img className={albums.id } src={getImg(albums.name)}
                          alt=''>
                    </img>
                  </div>
                    </SwiperSlide>
              )
            })}
      </Swiper>
    </>
  )
}