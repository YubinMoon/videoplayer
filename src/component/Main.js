import React, { useEffect } from 'react';
import Video from './Video'
import VideoList from './VideoList';
import useStore from '../lib/store';

export default function Main() {
    const { path, newPath } = useStore();
    const allowedExtensions = [".mp4", ".avi", ".mov"];

    useEffect(() => {
        newPath()
    }, [newPath])

    if (allowedExtensions.some(ext => path.endsWith(ext))) {
        return (
            <Video />
        )
    } else {
        return (
            <VideoList />
        )
    }
}