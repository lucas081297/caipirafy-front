import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'

export function SearchDialog(props) {

    const fetchSearch =  () => {
        fetch(`http://localhost:8000/api/tracks/search/${query}`)
        .then(res => res.json())
        .then(data => {setTrackSearch(data)})
        .catch(err => console.log(err))

        fetch(`http://localhost:8000/api/albums/search/${query}`)
        .then(res => res.json())
        .then(data => {setAlbumSearch(data)})
        .catch(err => console.log(err))
    }

  const [open, setOpen] = useState(false)
  const [query,setQuery] = useState(null)
  const [trackSearch,setTrackSearch] = useState([])
  const [albumSearch,setAlbumSearch] = useState([])
  const [targetAlbum, setTargetAlbum] = useState()
  const [albums, setAlbums] = useState([])

  const cancelButtonRef = useRef(null)

  useEffect(() => {
    if(query !== null && query!== ''){
      fetchSearch()
    }
  },[targetAlbum,query])

  useEffect(() => {
    setAlbums(props.albums)
    setOpen(props.open)
  },[props.album,props.open,query,targetAlbum,open])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      </Dialog.Title>
                      <div className="mt-2">
                      <form>
                        <div className="relative text-gray-600 focus-within:text-gray-400 rounded border-gray-500 border">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type='button' onClick={e => fetchSearch()} className="p-1 focus:outline-none focus:shadow-outline">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                        </span>
                        <input onChange={e => {setQuery(e.target.value)}} type="search" name="q" className="py-2 w-full text-sm text-gray-800 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Albuns ou Faixas..."/>
                        </div>
                        </form>
                      </div>
                      <div className='grid grid-rows-3 border mt-5'>
                      {trackSearch.length > 0 ? trackSearch.map(track => {
                                return (
                                    <div key={track.id} className='grid grid-cols-3 text-center'>
                                        <div className='px-2'>{track.name}</div>
                                        <div>Faixa</div>
                                        <div className='cursor-pointer' onClick={e => {props.goToSlide(track.album_id); setOpen(false)}}><ArrowLongRightIcon width={20}/></div>
                                    </div>
                                )
                            }): ''}
                      {albumSearch.length > 0 ? albumSearch.map(album => {
                                return (
                                    <div key={album.id} className='grid grid-cols-3 text-center'>
                                        <div className='px-2'>{album.name}</div>
                                        <div>Album</div>
                                        <div className='cursor-pointer' onClick={e => {props.goToSlide(album.id); setOpen(false)}}><ArrowLongRightIcon width={20}/></div>
                                    </div>
                                )
                            }): ''}
                            
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => props.handleOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}