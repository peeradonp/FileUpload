import { UploadOutlined } from "@ant-design/icons"
import { Button, Card, Divider, Form, Input, Upload } from "antd"
import React, { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import management from "./service/management.service"

const App = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [fileListData, setFileListData] = useState([])

    const handleFormSubmit = async (values) => {
        setLoading(true)
        try {
            let formData = new FormData()
            formData.append("email", values.email)
            formData.append("file", values.fileUploadList[0].originFileObj ?? [])

            let result = await management.uploadFile(formData)
            if (result?.data) {
                toast.success("File uploaded successfully")
            } else {
                toast.error("File upload failed")
            }
        } catch (error) {
            console.log(error)
            toast.error("File upload failed")
        }
        setLoading(false)
    }

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e
        }
        return e?.fileList
    }

    useEffect(() => {
        const getFileUploadList = async () => {
            let res = await management.getFileUploadList()
            if (res.data) {
                setFileListData(res.data.files)
            }
        }
        getFileUploadList()
    }, [loading])

    const dlFile = async (filename) => {
        const link = document.createElement("a")
        link.href = management.downloadFile(filename)
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className='p-8'>
            <Form onFinish={handleFormSubmit} layout='vertical' form={form}>
                <Form.Item
                    name='fileUploadList'
                    rules={[{ required: true, message: "Please upload a file" }]}
                    valuePropName='fileList'
                    getValueFromEvent={normFile}
                >
                    <Upload.Dragger
                        listType='picture'
                        maxCount={1}
                        beforeUpload={(file) => {
                            const reader = new FileReader()
                            reader.readAsDataURL(file)
                            return false
                        }}
                        onPreview={() => false}
                    >
                        <div>
                            <p className='ant-upload-drag-icon'>
                                <UploadOutlined />
                            </p>
                            <p className='ant-upload-text'>
                                Click or drag file to this area to upload <b>File</b>
                            </p>
                            <p className='ant-upload-hint'>
                                Support for a single file to upload. Strictly prohibited from
                                uploading company data or other banned files.
                            </p>
                        </div>
                    </Upload.Dragger>
                </Form.Item>
                <Form.Item
                    name='email'
                    className='md:col-span-2 col-span-1 justify-center items-center flex'
                    label='Send to E-mail'
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid E-mail!"
                        },
                        {
                            required: true,
                            message: "Please input your E-mail!"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item className='md:col-span-2 col-span-1 justify-center items-center flex'>
                    <Button loading={loading} type='primary' htmlType='submit'>
                        Send
                    </Button>
                </Form.Item>
            </Form>
            <Divider />
            <div>
                <p>Exist Files in server</p>
                <div className='grid gap-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
                    {fileListData?.map((e, index) => {
                        return (
                            <Card
                                key={index}
                                className='hover:opacity-80 cursor-pointer'
                                onClick={() => {
                                    dlFile(e)
                                }}
                            >
                                <div className='truncate'>FileName: {e}</div>
                            </Card>
                        )
                    })}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default App
