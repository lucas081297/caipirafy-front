import React, {useState,useEffect} from 'react';
import { AlbumCarousel } from '../Carousels/AlbumCarousel';
import { TrackCarousel } from '../Carousels/TrackCarousel';



const Main = () => {

    const fetchAlbums = async() => {
        await fetch('http://localhost:8000/api/albums')
        .then(res => res.json())
        .then(data => setAlbums(data))
        .catch(err => err)
      }

    const fetchTracks = async () => {
        await fetch('http://localhost:8000/api/tracks')
        .then(res => res.json())
        .then(data => setTracks(data))
        .catch(err => err)
      }
    
    const [albums, setAlbums] = useState([])
    const [tracks, setTracks] = useState([])
    const [targetAlbum, setTargetAlbum] = useState(1)
    const [update,setUpdate] = useState(false)

    useEffect(() => {
        fetchAlbums()
        fetchTracks()
    },[])

    useEffect(() => {
        if(targetAlbum!==0){
            fetchAlbums()
            fetchTracks()
        }
        
      },[targetAlbum,update])

    return (
        <section className='bg-[#B3541E] h-screen font-roboto'>
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
    );
}

export default Main;
