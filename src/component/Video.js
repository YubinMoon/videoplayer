import ReactPlayer from 'react-player/lazy';
import useStore from '../lib/store';
import { useEffect, useState } from 'react';
import './Video.css'

function Button({ preurl, nexturl, list }) {

    return (
        <div className='control_box'>
            <ul className='control_list'>
                <li className='control_line'>
                    {preurl ?
                        <a className='control_link' href={preurl}>
                            <span className='control_text'>이전화</span>
                        </a>
                        :
                        <span className='control_text'>이전화가 없습니다.</span>
                    }
                </li>
                <li className='control_line'>
                    <a className='control_link' href={list}>
                        <span className='control_text'>목록</span>
                    </a>
                </li>
                <li className='control_line'>
                    {nexturl ?
                        <a className='control_link' href={nexturl}>
                            <span className='control_text'>다음화</span>
                        </a>
                        :
                        <span className='control_text'>다음화가 없습니다.</span>
                    }
                </li>
            </ul>
        </div>
    )
}

export default function Video() {
    const { path } = useStore()
    const [url, setUrl] = useState("")
    const [baseurl, setBaseUrl] = useState("")
    const [videos, setVideos] = useState("")
    const [name, setName] = useState("")
    const [preurl, setPreurl] = useState("")
    const [nexturl, setNexturl] = useState("")
    const [size,setSize]=useState(80)
    const [list, setList] = useState([])

    useEffect(() => {
        setUrl(process.env.REACT_APP_FILE_URL + path)
        const lastIndex = path.lastIndexOf('/');
        setName(path.substring(lastIndex + 1));
        setBaseUrl(path.substring(0, lastIndex + 1));

    }, [path])

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
        (async () => {
            try {
                const url = process.env.REACT_APP_FILE_URL + baseurl;
                const response = await fetch(url, { signal });
                const text = await response.text();
                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(text, 'text/html');
                const collection = htmlDoc.body.getElementsByTagName('a');
                const textList = [];
                const allowedExtensions = [".mp4", ".avi", ".mov"];
                for (let i = 1; i < collection.length; i++) {
                    const name = collection.item(i).innerText;
                    if (allowedExtensions.some(ext => name.endsWith(ext))) {
                        textList.push(name);
                    }
                }
                setVideos(textList);
            } catch (error) {
                console.debug(error);
            }
        })();
        const size = localStorage.getItem("size")
        if(size){
            setSize(localStorage.getItem("size"))
        }

        return () => controller.abort();
    }, [baseurl])

    useEffect(() => {
        const index = videos.indexOf(name)
        if (index == -1) {
            console.warn("비디오 인덱스 에러")
        }
        setPreurl(index > 0 ? baseurl + videos[index - 1] : "")
        setNexturl(index < videos.length - 1 ? baseurl + videos[index + 1] : "")
        setList(baseurl)
    }, [videos])
    console.log(toString(size)+'vh')
    return (
        <div className='video_page'>
            <h2 className='video_title'>{name}</h2>
            <div className='player-wrapper'>
                <ReactPlayer
                    className='react-player'
                    url={url}
                    width={size.toString()+'vw'}
                    height="auto"
                    playing={false}
                    muted={false}
                    controls={true}
                    light={false}
                    pip={true}
                />
            </div>
            <input
            type='range'
            min="0"
            max="100"
            step="1"
            value={size}
            onChange={e=>{
                setSize(e.target.value)
                localStorage.setItem("size",e.target.value)
            }}
            />

            <Button preurl={preurl} nexturl={nexturl} list={list} />
        </div>
    )
}