import React, { useEffect, useState } from 'react';
import useStore from '../lib/store';
import './VideoList.css'

function List({ name }) {
    const { path } = useStore();

    const allowedExtensions = [".mp4", ".avi", ".mov"];
    if (allowedExtensions.some(ext => name.endsWith(ext))) {
        return (
            <li className='list_line'>
                <a className='list_link' href={path + name}>
                    <svg className='video_svg' width="25px" height="25px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M432 356.16A32 32 0 0 0 384 384v256a32 32 0 0 0 48 27.84l224-128a32 32 0 0 0 0-55.68z m16 228.48v-145.6L576 512z" fill="#ffffff" />
                        <path d="M864 32H160a128 128 0 0 0-128 128v704a128 128 0 0 0 128 128h704a128 128 0 0 0 128-128v-128H96V288h896V160a128 128 0 0 0-128-128z m-96 768h160v64a64 64 0 0 1-64 64h-96z m-224 0h160v128h-160z m-224 0h160v128h-160z m-64 0v128H160a64 64 0 0 1-64-64v-64zM256 224H96V160a64 64 0 0 1 64-64h96z m224 0h-160V96h160z m224 0h-160V96h160z m224 0h-160V96h96a64 64 0 0 1 64 64z" fill="#ffffff" />
                        <path d="M960 384m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z" fill="#ffffff" />
                        <path d="M960 480a32 32 0 0 0-32 32v128a32 32 0 0 0 64 0v-128a32 32 0 0 0-32-32z" fill="#ffffff" />
                    </svg>
                    <span className='link_name'>{name}</span>
                </a>
            </li>
        )
    } else {
        return (
            <li className='list_line'>
                <a className='list_link' href={path + name}>
                    <svg className='video_svg' width="25px" height="25px" fill="#ffffff" version="1.1" id="Layer_1"
                        viewBox="0 0 491.52 491.52" >
                        <g>
                            <g>
                                <path d="M207.05,102.4l-53.53-51.2H0v389.12h491.52V102.4H207.05z M20.48,419.84V71.68H145.3l53.53,51.2h272.21v296.96H20.48z" />
                            </g>
                        </g>
                        <g>
                            <g>
                                <rect x="194.56" y="368.64" width="235.52" height="20.48" />
                            </g>
                        </g>
                        <g>
                            <g>
                                <rect x="296.96" y="317.44" width="133.12" height="20.48" />
                            </g>
                        </g>
                    </svg>
                    <span className='link_name'>{name}</span>
                </a>
            </li>
        )
    }
}

export default function VideoList() {
    const [list, setList] = useState([])
    const { path } = useStore();
    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        (async () => {
            try {
                const url = process.env.REACT_APP_FILE_URL + path;
                const response = await fetch(url, { signal });
                const text = await response.text();
                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(text, 'text/html');
                const collection = htmlDoc.body.getElementsByTagName('a');
                const textList = [];
                for (let i = 1; i < collection.length; i++) {
                    textList.push(collection.item(i).innerText);
                }
                setList(textList);
                console.debug(url)
                console.debug(textList)
            } catch (error) {
                console.debug(error);
            }
        })();

        return () => controller.abort();
    }, [path]);
    return (
        <div className='video_list'>
            <div id="listBox">
                <a className='back_link' href="../">
                    <svg className='gotoback' fill="#ffffff" width="25px" height="25px" version="1.1"
                        viewBox="0 0 240.877 240.877">
                        <g>
                            <g id="First_Page">
                                <path d="M113.983,120.483l98.564-99.671c4.704-4.752,4.704-12.439,0-17.191c-4.704-4.74-12.319-4.74-17.011,0L88.466,111.882
			c-4.632,4.668-4.547,12.584,0,17.179l107.07,108.261c4.704,4.74,12.319,4.74,17.011,0c4.692-4.74,4.704-12.439,0-17.179
			L113.983,120.483z"/>
                                <path d="M36.832,0c-6.641,0-12.03,5.39-12.03,12.03v216.545c0,6.641,5.39,12.03,12.03,12.03s12.03-5.39,12.03-12.03V12.03
			C48.863,5.378,43.473,0,36.832,0z"/>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                            <g>
                            </g>
                        </g>
                    </svg>
                    <span className='back'>
                        뒤로가기
                    </span>
                </a>
                <ul className='list_box'>
                    {list.map(e => <List key={e} name={e} />)}
                </ul>
            </div>
        </div>
    )
}