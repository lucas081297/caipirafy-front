import { Navigation, Pagination, A11y, Scrollbar, Keyboard, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';

import { EditButton } from '../Buttons/editbutton.js'
import { DeleteButton } from '../Buttons/deletebutton.js'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


export const TrackCarousel = (props) => {

  const [editTrack,setEditTrack] = useState('0')
  const [deleteTrack, setDeleteTrack] = useState('0')
  const [editTrigger, setEditTrigger] = useState(false)
  const [deleteTrigger, setDeleteTrigger] = useState(false)

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };


  
  return (
    <Swiper
        modules={[Navigation, Pagination, A11y, Scrollbar, Keyboard, Mousewheel]}
        direction={'vertical'}
        slidesPerView={1}
        keyboard={{
          enabled: true
        }}
        pagination={pagination}
        mousewheel={{forceToAxis: true, enabled: true}}
        scrollbar={{enabled:true,verticalClass:'swiper-scrollbar-vertical'}}
        loop='true'
        className='trackcarousel'
        >
          {props.tracks.map(track => {            
            return track.album_id === props.targetAlbum ? (
              <SwiperSlide key={track.id}><div className='grid grid-flow-col gap-x-5 w-full justify-items-center items-center'>
                <div className='justify-self-start'>
                  <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.3187 2.50498C13.0514 2.35716 11.8489 3.10033 11.4144 4.29989C11.3165 4.57023 11.2821 4.86251 11.266 5.16888C11.2539 5.40001 11.2509 5.67552 11.2503 6L11.25 6.45499C11.25 6.4598 11.25 6.4646 11.25 6.46938V14.5359C10.4003 13.7384 9.25721 13.25 8 13.25C5.37665 13.25 3.25 15.3766 3.25 18C3.25 20.6234 5.37665 22.75 8 22.75C10.6234 22.75 12.75 20.6234 12.75 18V9.21059C12.8548 9.26646 12.9683 9.32316 13.0927 9.38527L15.8002 10.739C16.2185 10.9481 16.5589 11.1183 16.8378 11.2399C17.119 11.3625 17.3958 11.4625 17.6814 11.4958C18.9486 11.6436 20.1511 10.9004 20.5856 9.70089C20.6836 9.43055 20.7179 9.13826 20.7341 8.83189C20.75 8.52806 20.75 8.14752 20.75 7.67988L20.7501 7.59705C20.7502 7.2493 20.7503 6.97726 20.701 6.71946C20.574 6.05585 20.2071 5.46223 19.6704 5.05185C19.4618 4.89242 19.2185 4.77088 18.9074 4.6155L16.1999 3.26179C15.7816 3.05264 15.4412 2.88244 15.1623 2.76086C14.8811 2.63826 14.6043 2.53829 14.3187 2.50498Z" fill="#1C274C"/>
                  </svg>
                </div>
                <div className='justify-self-start'>{track.name}<br></br> {track.release_date}</div>
                <div className='justify-self-center grid grid-rows-2 gap-10'>
                  <div>
                    <EditButton handleUpdate={props.handleUpdate} fetchTracks={props.fetchTracks} albums={props.albums} id={track.id} editTrack={editTrack} trackName = {track.name} trackDate={track.release_date} trackAlbum={track.album_id} onClick={(e) => setEditTrack(e.target.className.baseVal)} width= {50} height= {50} fillColor = '#000000'></EditButton>
                    </div>
                  <div>
                    <DeleteButton handleUpdate={props.handleUpdate} id={track.id} deleteTrack={deleteTrack} trackName={track.name} onClick={e => setDeleteTrack(e.target.className.baseVal)} width= {50} height= {50}></DeleteButton>
                    </div>
                  </div>
                </div>
                </SwiperSlide>
            ) : ''
          })}
    </Swiper>
  )
}