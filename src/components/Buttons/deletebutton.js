import { useEffect, useState } from 'react';
import { DeleteDialogs } from '../Dialogs/DeleteDialogs'

export function DeleteButton (props){
    
    const [deleteTrigged, setDeleteTrigged] = useState(false)

    useEffect(() => {
        props.deleteTrack.toString()===props.id.toString() ? setDeleteTrigged(true) : setDeleteTrigged(false)
    },[props.id,props.deleteTrack])
    

    return (
        <>
            <DeleteDialogs setDeleteTrigged={setDeleteTrigged} deleteTrigged={deleteTrigged} deleteTrack = {props.deleteTrack} handleUpdate={props.handleUpdate} id={props.id} trackName={props.trackName}></DeleteDialogs>
            <button onClick={e=> {props.onClick(e);setDeleteTrigged(true) }} className={props.id}>
            <svg  className={props.id} width={props.width} height={props.height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path  className={props.id} d="M10 12V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path  className={props.id} d="M14 12V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path  className={props.id} d="M4 7H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path  className={props.id} d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path  className={props.id} d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </>
    )
}