"use client";

import React from 'react'
import { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/navigation';
import PageNotFound from './PageNotFound';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import Video from './Video';
import Loader from './Loader';
export default function Todo() {

    // -----------Variable-------------

    let [task, setTask] = useState([])
    let [taskInput, setTaskInput] = useState('')
    let [check, setCheck] = useState(false)
    let [complete, setComplete] = useState(false)
    let [fail, setFail] = useState(true)
    let [showLoading, setShowLoading] = useState(true)
    let [data, setData] = useState("")
    const router = useRouter()

    // -----------Use Effect -------------
    useEffect(() => {

        async function getData() {
            try {
                 let taskData = await fetch("https://to-do-app-henna-sigma.vercel.app/")
                if (!taskData.ok) {
                    alert("api error")
                }
                else {
                    let data = await taskData.json()
                    setTask(data)
                    setCheck(false)
                    setShowLoading(false)

                }
            } catch (err) {
                setFail(false)
                setData("Server can not respond")

            }

        }
        getData()

    }, [check, complete])

    // -----------functions-------------

    async function addtask(taskId) {
        if (taskInput === "") {
            alert('please add task')
        }
        else {
            let add_task = await fetch('https://to-do-app-henna-sigma.vercel.app/addTask', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ taskName: taskInput })
            })
            setCheck(true)
        }
    }

    async function delteTask(taskId) {
        try {

            let delete_task = await fetch(`https://to-do-app-henna-sigma.vercel.app/${taskId}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
                params: { delteTask: taskId }
            })
            setCheck(true)
        } catch (err) {
            setFail(false)
            setData("Server can not respond")
        }

    }

    async function updateTask(taskId) {
        router.push(`/${taskId}`)
    }

    async function completeTask(taskId) {

        try {
            let update_task = await fetch(`https://to-do-app-henna-sigma.vercel.app/update/completetask`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify([{ taskId: taskId }, { completeTask: !complete }])
            })
            setComplete(!complete)
        } catch (err) {
            setFail(false)
            setData("Server can not respond")
        }

    }


    return (

        <div>
            {fail ?
                <div>
                    {
                        showLoading ?
                            <Loader /> :
                            <div className='flex items-center justify-center relative h-full'>
                                <Video />
                                < div className='overflow-hidden absolute top-28 flex flex-col gap-2 items-center justify-center p-4 w-[100%] sm:w-[90%] md:w-[60%]'>
                                    <h1 className='font-medium text-3xl text-white text-center'>Todo App</h1>
                                    <div className='w-full flex flex-col  mt-8 items-center justify-center gap-4 md:flex-row md:gap-3'>
                                        <input className='text-black w-full h-10 p-2 rounded focus:outline-none' placeholder='enter task' onChange={(e) => { setTaskInput(e.target.value) }}></input>
                                        <button className='rounded w-24 h-10 border-[1px] text-white' onClick={() => addtask(taskInput)}>Add</button>
                                    </div>
                                    {
                                        task.map((tasks) => (
                                            <div key={tasks._id} className='overflow-hidden w-full h-auto mt-6 p-2 rounded-md flex border-[1px] flex-wrap items-center justify-between '>
                                                <div className='break-all flex w-[65%] h-auto sm:w-[80%] md:w-[76%] '>
                                                    <p className={`text-lg text-white  ${tasks.completed && 'line-through'}`}>{tasks.taskName}</p>
                                                </div>
                                                <div className='flex gap-3 '>
                                                    <EditNoteIcon onClick={() => updateTask(tasks._id)} className='text-white scale-150 focus:hover' />
                                                    <DeleteIcon onClick={() => delteTask(tasks._id)} className='text-white scale-145' />
                                                    <DoneIcon onClick={() => completeTask(tasks._id)} className='text-white scale-145' />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                    }
                </div>


                : <PageNotFound data={data} />
            }
        </div >

    );
}
