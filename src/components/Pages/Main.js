import React, {useState,useEffect} from 'react';
import { AlbumCarousel } from '../Carousels/AlbumCarousel';
import { TrackCarousel } from '../Carousels/TrackCarousel';
import { ErrorAlert } from './Alerts/InfoAlert';
import axios from 'axios';



const Main = () => {

    const fetchAlbums = async() => {
    try{
        const res = await axios.get('http://localhost:8000/api/albums')
        const {data} = res
        setAlbums(data)
        }
        catch{
            setErrors(true)
        }
      }

    const fetchTracks = async () => {
        try{
            const res = await axios.get('http://localhost:8000/api/tracks')
            const {data} = res
            setTracks(data)
        }
        catch{
            setErrors(true)
        }
        
      }
    
    const [albums, setAlbums] = useState([])
    const [tracks, setTracks] = useState([])
    const [targetAlbum, setTargetAlbum] = useState(1)
    const [update,setUpdate] = useState(false)
    const [errors, setErrors] = useState(false)

    useEffect(() => {
        fetchAlbums()
        fetchTracks()
        console.log(errors)
    },[])

    useEffect(() => {
        if(targetAlbum!==0){
            fetchAlbums()
            fetchTracks()
        }
        
      },[targetAlbum,update])

    return (
        <>
        <div className={errors ? 'h-screen w-full pt-[80px] grid grid-rows-1 bg-gray-600' : 'hidden'}>
        <ErrorAlert className=' self-center'></ErrorAlert>
        </div>
            <section className={!errors ? 'bg-[#B3541E] h-screen font-roboto' : 'hidden'}>
                <div className= ' pt-[80px] grid grid-rows-2 gap-5 justify-items-center items-center h-full w-full'>
                    <div className='bg-[#B3541E] text-center grid grid-rows-2 gap-10 justify-items-center items-center h-full w-full'>
                        <div className='w-[100%] text-white text-2xl'>Albuns
                        </div>
                        <div className='bg-[#B3541E] max-w-full'>
                            <AlbumCarousel update={update} handleUpdate={setUpdate} targetAlbum = {targetAlbum} handleAlbum={setTargetAlbum} albums={albums} tracks={tracks}></AlbumCarousel>
                        </div>
                    </div>     

                    <div className='w-full h-full justify-start flex flex-col pt-10'>
                        <div className='w-full text-center pb-[10px] pt-[20px] bg-[#ce6b39]  text-white text-xl'>Faixas no Album</div>
                        <TrackCarousel update={update} handleUpdate={setUpdate} targetAlbum = {targetAlbum} albums={albums} tracks={tracks} ></TrackCarousel>
                    </div>                        
                </div>
            </section>
        </>
    );
}

export default Main;
