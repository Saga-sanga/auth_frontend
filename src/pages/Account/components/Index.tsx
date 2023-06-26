import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { DatabaseSvg } from '../../../assets/Svg/Account/Account'
import { Button } from '../../../components/ui/Button'
import { useNavigate } from 'react-router-dom'
import OrgList from './OrgList'

function AccountIndex() {

    const [hasOrg, setHasOrg] = useState(true)
    const [data, setData] = useState([{}])
    const navigate = useNavigate()


    useEffect(() => {
        fetch('https://api.trustauthx.com/org/all', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwYWxsYXZuYXRoMDFAZ21haWwuY29tIiwiYWx0IjoiMDYyNjVlMGFjM2ExNDk4MjllOWVlNmFhYjMzODE0ZTctNDZiODU2MWQ5ZWNmNWFjNGJmYWQ0ZTlkODZjNmY5OTYiLCJwb29sIjp0cnVlLCJzY29wZSI6MSwiZXhwIjoxNjg3NTcxMDczfQ.oirr847bTXc4fvZAyakBQxF-zmFLfmqQxbMFkptRJUg'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data[0].name) {
                    console.log(data);
                    setData(data)
                    setHasOrg(true)
                } else {
                    setHasOrg(false)
                }
            })
            .catch(error => {
                console.error(error);
                setData([{ name: "" }])
            });
    }, [])


    const handleNavigation = () => {
        navigate("/account/add-organization")
    }

    useEffect(() => {
        if (data[0].name)
            if (data[0].name !== "") {
                setHasOrg(true)
            }
    }, [data, navigate])
    return (
        <section className='oveflow-x-auto'>
            {!hasOrg &&
                <div style={{ height: 'calc(100vh - 100px)' }} className='max-w-xl m-auto text-center flex items-center justify-center flex-col'   >
                    <div>
                        <div className='grid grid-cols-2 max-w-[280px] m-auto ' >
                            <DatabaseSvg />
                            <DatabaseSvg />
                            <DatabaseSvg />
                            <DatabaseSvg />
                        </div>
                        <p className='text-center my-5' >Represent the teams, business customers, and partner companies that access your applications as organizations in Auth0.</p>
                        <div className='hover:text-white' >
                            <Button onClick={handleNavigation} variant="primary" > <Plus />
                                Create New Organization
                            </Button>
                        </div>
                    </div>
                </div>
            }

            {hasOrg && <OrgList data={data} />}

        </section>
    )
}

export default AccountIndex