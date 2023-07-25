import { useEffect, useState } from 'react'
import useRefreshToken from '../hooks/useRefreshToken'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentToken, setCredentials } from '../manager/auth/authSlice'

const PersistLogin = ({ persist }) => {

    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const token = useSelector(selectCurrentToken)
    const dispatch = useDispatch()
    useEffect(() => {
        const verifyRefreshToken = async () => {

            try {
                const refreshToken = await refresh()

                console.log("from Persist", refreshToken)
                dispatch(setCredentials(refreshToken))



            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        !token ? verifyRefreshToken() : setIsLoading(false)

    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`Token: ${JSON.stringify(token)}`)

    }, [isLoading])

    return (
        <>
            {!persist ? <Outlet />
                : isLoading ? <div className="loading-div">
                    <AiOutlineLoading3Quarters className="loading-effect" />
                </div>
                    : <Outlet />
            }
        </>
    )


}

export default PersistLogin