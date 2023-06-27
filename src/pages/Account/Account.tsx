import React from "react"
import { useLocation } from "react-router-dom"
import AccountLayout from "./Layout"
import Settings from "./Pages/Setting"
import Support from "./Pages/Support"
import AccountIndex from "./components/Index"
import AddOrganization from "./components/AddOrganization"
// import KeyCard from "../../components/KeyCard"


function Account() {

    const location = useLocation()

    return (
        <AccountLayout>

            {
                location.pathname === "/account/settings" ?
                    <Settings /> : location.pathname === "/account" ?
                        <AccountIndex /> : location.pathname === "/account/support" ?
                            <Support /> : location.pathname === "/account/add-organization" ?
                                <AddOrganization /> : "Not Found"
            }
        </AccountLayout>

    )
}

export default Account