import React, { useEffect, useState } from 'react'
import { Sidebar as ProSidebar, Menu, MenuItem, } from 'react-pro-sidebar';
import { NavLink as Link } from 'react-router-dom';
import { OrgnaizationSvg, SettingSvg, SupportSvg } from '../../../assets/Svg/Account/Account';
import { ChevronLeft, ChevronRight } from 'lucide-react';


export function Sidebar() {

    const [collapse, setCollapse] = useState(false)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        if (windowWidth < 800) {
            setCollapse(true)
            console.log(windowWidth)
        } else {
            setCollapse(false)
        }
    }, [windowWidth])

    return (
        <div className='' >
            <ProSidebar className='w-full flex-[15%] min-h-screen bg-black ' collapsed={collapse} >
                <Menu
                    className='bg-black hover:bg-red-500 w-full'
                    menuItemStyles={{
                        button: {
                            // the active class will be added automatically by react router
                            // so we can use it to style the active menu item
                            borderRadius: "3px",
                            padding: !collapse ? "16px" : "",
                            [`&.active`]: {
                                backgroundColor: "rgba(255,255,255,0.2)",
                            },
                            [`&:hover`]: {
                                backgroundColor: "rgba(255,255,255,0.11)"
                            },
                        },
                    }}
                >
                    <div className='text-brand-primary text-end w-4 ml-auto mr-3 pt-2 cursor-pointer' onClick={() => setCollapse(!collapse)} >
                        {
                            collapse ? <ChevronRight /> : <ChevronLeft />}
                    </div>
                    <div className={collapse ? '' : "px-4"} >
                        <div className='text-white text-center font-bold text-3xl mb-8' >
                            <h1 className={collapse ? "hidden" : ""} >Organization</h1>
                        </div>
                        <p className='mb-1 ml-4 text-xs text-gray-500 ' > MAIN MENU</p>
                        <SidebarMenu to='/account' title='Organizations' icon={<OrgnaizationSvg />} />
                        <p className='mb-1 ml-4 text-xs text-gray-500 mt-12' >OTHER</p>
                        <SidebarMenu to='/account/support' title='Support' icon={<SupportSvg />} />
                        <SidebarMenu to='/account/settings' title='Setting' icon={<SettingSvg />} />
                    </div>

                </Menu>
            </ProSidebar>
        </div>
    )
}

interface SidebarMenuType {
    icon: React.ReactNode;
    title: string;
    to: string;
}


const SidebarMenu = ({ icon, title, to }: SidebarMenuType) => {
    return (
        <MenuItem component={<Link to={to} />} icon={icon} className='text-white '  >
            {title}
        </MenuItem>
    )
}