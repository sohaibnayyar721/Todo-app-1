"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/navigation';
import Video from '../../component/Video';
import Loader from '../../component/Loader';
import PageNotFound from '../../component/PageNotFound';

function Modal(props) {

    //-------Variables---------
    let [showLoading, setShowLoading] = useState(true)
    let [showPage, setShowPage] = useState(true)
    const taskId = props.params.update
    let [taskInput, setTaskInput] = useState('')
    let router = useRouter()
    let [fail, setFail] = useState('')

    //-------Use Effect Calls---------
    useEffect(() => {

        //------- Get data from server---------
        async function getData() {

            try {
                let taskData = await fetch(`https://todo-app-server-eight.vercel.app/${taskId}`, {
                    method: "GET"
                })
                let data = await taskData.json()
                setTaskInput(data.taskName)
                //------- Set loader to true---------
                if (data) {
                    setShowLoading(false)
                }

                //------- Invalid route---------
                if (data._id !== taskId) {
                    setShowPage(false)
                    setFail(data)
                }
            } catch (err) {
                setFail("Server cant respond")
                setShowLoading(false)
                setShowPage(false)
            }
        }
        getData()


    }, [showLoading])

    //------- Function UpdateTask---------
    async function UpdateTask(tasks) {

        //------- Handling empty Input---------
        if (taskInput === '') {
            alert('Input field is empty')
        }
        else {
            //------- Request update method from server---------

            try {

                let update_task = await fetch(`https://todo-app-server-eight.vercel.app/${taskId}`, {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",

                    },
                    params: { updateTask: taskId },
                    body: JSON.stringify({ taskName: taskInput })
                })
                if (update_task.ok) {
                    let response = await update_task.json()
                    setFail(response)
                }
                router.push('/')
            } catch (err) {
                setFail("Server cant respond")
                setShowPage(false)

            }


            //------- Navigate to home page after update---------

        }
    }

    async function cancel() {
        setShowLoading(true)
        router.push('/')
    }

    return (
        <div className='overflow-hidden'>
            {showLoading ?
                <Loader />
                :

                <div>
                    {
                        showPage ?
                            <div className='flex justify-center w-full h-[100vh] relative'>
                                <Video />
                                <div className='absolute top-52 w-[90%] sm:w-[80%] flex items-center justify-center flex-col'>
                                    <h1 className='text-white font-medium text-2xl text-center'>Update Task</h1>

                                    <div className='w-[80%] flex flex-col mt-8 gap-2 sm:gap-3 sm:flex-row sm:items-center'>
                                        <h1 className='text-white text-lg sm:text-xl'>Enter Task: </h1>

                                        <input className='text-white  bg-black bg-opacity-0 border-[1px] border-white focus:outline-none h-12 rounded-md sm:w-[72%] sm:h-12 sm:border-[1px] p-2'
                                            value={taskInput}
                                            onChange={(e) => { setTaskInput(e.target.value) }}
                                        ></input>
                                    </div>

                                    <div className='flex gap-2 mt-6'>
                                        <button className='border-[1px] text-white border-1  h-11 p-2 rounded  '
                                            onClick={() => UpdateTask(taskInput)}
                                        >Ok</button>

                                        <button className='border-[1px] text-white border-1 h-11 p-2 rounded '
                                            onClick={cancel}
                                        >Cancel</button>
                                    </div>
                                </div>
                            </div>
                            : <PageNotFound data={fail} />
                    }
                </div>
            }
        </div>
    )
}

export default Modal