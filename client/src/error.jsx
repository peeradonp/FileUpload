import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"

export const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className='text-white h-full'>
            <Result
                status='500'
                title='500'
                subTitle='Sorry, something went wrong.'
                extra={
                    <Button
                        onClick={() => {
                            navigate(-1)
                        }}
                        type='primary'
                    >
                        Back Home
                    </Button>
                }
            />
        </div>
    )
}
