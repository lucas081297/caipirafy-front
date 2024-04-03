import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import axios from 'axios';

export function AddDialog(props) {
  
  const [open, setOpen] = useState(false)
  const [update,setUpdate] = useState(false)
  const [type,setType] = useState(0)
  const [selectedAlbum, setSelectedAlbum] = useState(0)

  const cancelButtonRef = useRef(null)

  useEffect(()=>{
    props.handleUpdate(!props.update)
  },[update])

  useEffect(() => {
    setOpen(props.open)
  },[props.open])


  const fetchNewAlbum = async(payload) => {
    await axios.post('http://localhost:8000/api/albums/new',payload)
    .then(res=> res)
    .catch(err => err)
  }
  const fetchNewTrack = async(payload) => {
    await axios.post('http://localhost:8000/api/tracks/new',payload)
    .then(res=> console.log(res))
    .catch(err => err)
  }

  const handleAlbum = (name) => {
    props.albums.map(album => {
      if (album.name === name){
        return setSelectedAlbum(album.id)
      }
    }
    )
    return 0;
  }

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
              <form onSubmit={async(e) => {
                e.preventDefault();
                if(type == 0){
                  await fetchNewAlbum({name:  e.target.elements.albumName.value, release_date:  e.target.elements.albumDate.value, price:  e.target.elements.albumPrice.value});     
                }
                else if(type == 1){
                  await fetchNewTrack({name:  e.target.elements.albumName.value, release_date:  e.target.elements.albumDate.value, album_id:  selectedAlbum})
                }
                await setUpdate(!update)
                await props.handleOpen(false)
                await window.location.reload();
                }}>
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-800 sm:mx-0 sm:h-10 sm:w-10">
                      <PlusIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Adicionar
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Tipo
                          <br></br>
                          <span className='grid grid-cols-2'>
                            <select name='type' value={type} onChange={(e)=> {setType(e.target.value)}} className='border border-solid border-black rounded'>
                              <option value={0} >Album</option>
                              <option value={1}>Faixa</option>
                            </select>
                            <span className='ms-5 h-[100%] w-[20%] flex flex-col'>
                              <svg className={type==0? '' : 'hidden'} viewBox="0 0 55.231 55.231" xmlns="http://www.w3.org/2000/svg">
                                <g id="Group_27" data-name="Group 27" transform="translate(-361.081 -1142.626)">
                                  <path id="Path_67" data-name="Path 67" d="M391.322,1164.448l5.62-17.683,7.391,4.127,6.176,7.375,2.03,4.857-17.944,4.733Z" fill="#d1d3d4"/>
                                  <path id="Path_68" data-name="Path 68" d="M383.064,1171.9l-17.667,5.67,4.147,7.379,7.393,6.155,4.862,2.016,4.683-17.957Z" fill="#d1d3d4"/>
                                  <circle id="Ellipse_11" data-name="Ellipse 11" cx="24.881" cy="24.881" r="24.881" transform="translate(363.136 1146.059) rotate(-1.588)" fill="none" stroke="#231f20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/>
                                  <path id="Path_69" data-name="Path 69" d="M395.06,1170.241a6.365,6.365,0,1,1-6.364-6.365A6.364,6.364,0,0,1,395.06,1170.241Z" fill="none" stroke="#231f20" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"/>
                                </g>
                              </svg>

                              <svg className={type==1? '' : 'hidden'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.3187 2.50498C13.0514 2.35716 11.8489 3.10033 11.4144 4.29989C11.3165 4.57023 11.2821 4.86251 11.266 5.16888C11.2539 5.40001 11.2509 5.67552 11.2503 6L11.25 6.45499C11.25 6.4598 11.25 6.4646 11.25 6.46938V14.5359C10.4003 13.7384 9.25721 13.25 8 13.25C5.37665 13.25 3.25 15.3766 3.25 18C3.25 20.6234 5.37665 22.75 8 22.75C10.6234 22.75 12.75 20.6234 12.75 18V9.21059C12.8548 9.26646 12.9683 9.32316 13.0927 9.38527L15.8002 10.739C16.2185 10.9481 16.5589 11.1183 16.8378 11.2399C17.119 11.3625 17.3958 11.4625 17.6814 11.4958C18.9486 11.6436 20.1511 10.9004 20.5856 9.70089C20.6836 9.43055 20.7179 9.13826 20.7341 8.83189C20.75 8.52806 20.75 8.14752 20.75 7.67988L20.7501 7.59705C20.7502 7.2493 20.7503 6.97726 20.701 6.71946C20.574 6.05585 20.2071 5.46223 19.6704 5.05185C19.4618 4.89242 19.2185 4.77088 18.9074 4.6155L16.1999 3.26179C15.7816 3.05264 15.4412 2.88244 15.1623 2.76086C14.8811 2.63826 14.6043 2.53829 14.3187 2.50498Z" fill="#1C274C"/>
                              </svg>
                            </span>
                          </span>
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Nome
                          <br></br>
                          <input name='albumName' className='border border-solid border-black rounded'></input>
                        </p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                        Data de Lançamento
                        <br></br>
                          <input name='albumDate' className='border border-solid border-black rounded'></input>
                        </p>
                      </div>
                      <div className={type==1 ? 'hidden' : "mt-2"}>
                        <p className="text-sm text-gray-500">
                        Preço
                        <br></br>
                          <input name='albumPrice' className='border border-solid border-black rounded' ></input>
                        </p>
                      </div>
                      <div className={type==0 ? 'hidden' : "mt-2"}>
                        <p className="text-sm text-gray-500">
                        Album
                        <br></br>
                        <input  onChange={e => handleAlbum(e.target.value)} name='trackAlbum' list='albums' className='border border-solid border-black rounded'></input>
                            <datalist id='albums'>
                              {props.albums.map(album => {
                                return(
                                  <option key={album.id}>{album.name}</option>
                                )
                              })}
                            </datalist>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-300 sm:ml-3 sm:w-auto"
                    
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    ref={cancelButtonRef}
                    onClick={e => props.handleOpen(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
              </form>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}