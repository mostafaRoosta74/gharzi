import Joyride from 'react-joyride';
import {useState} from "react";
import useLocales from "../../../../hooks/useLocales";


export const UserTour =() => {
    const {translate} = useLocales();
    const [state,setState]= useState([
        {
            target: '.post-list',
            content: translate("TOUR_FIRST"),
        },
        {
            target: '.add-post',
            content: translate("TOUR_SECOND"),
        },
        {
            target: '.profile',
            content: translate("TOUR_THIRD"),
        },
    ])

    return (
        <div className="app">
            <Joyride
                steps={state}
                callback={(data)=>{
                    if(data.status === "ready"){
                        window.localStorage.setItem("intro","true")
                    }
                }}
            />
        </div>
    );
}
