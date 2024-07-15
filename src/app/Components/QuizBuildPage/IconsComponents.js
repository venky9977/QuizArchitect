'use client'
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { iconsData } from '@/app/iconsData'
import { faClose } from "@fortawesome/free-solid-svg-icons";
import useGlobalContextProvider from '@/app/ContextApi'

function IconsComponents(){
    const [ allIcons, setAllIcons ] = useState(iconsData);
    const [ openBoxToggle ] = useGlobalContextProvider();
    const [ openIconBox, setOpenIconBox ] = openBoxToggle;
    function handleClickedIcon(iconIndex){
        const updatedIcons = allIcons.map((icon, i) => {
            if(i === iconIndex){
                return { ...icon, isSelected: true};
            }

            return{ ...icon, isSelected: false};
        });

        setAllIcons(updatedIcons);
    }
}