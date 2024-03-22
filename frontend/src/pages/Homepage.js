import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import {Form, Input, Modal ,Select, Table, message,DatePicker} from "antd"
import {AreaChartOutlined, UnorderedListOutlined,EditOutlined,DeleteOutlined} from "@ant-design/icons"
import FormItem from 'antd/es/form/FormItem'
import axios from "axios"
import moment from 'moment'
import Analytics from '../components/Analytics'

const {RangePicker} = DatePicker;
function Homepage() {
    //States
    const[showmodel,setShowmodel] = useState(false)
    const[allexpense,setAllexpense] = useState([])
    const[frequency,setFrequency] = useState("7") 
    const [date,setDate] = useState([]);
    const [category,setCategory] = useState("All");
    const[viewdata,setViewdata] = useState("table");
    const [edit,setEdit] = useState(null)
    
    //table data
    const columme = [
        {
            title:"Date",
            dataIndex:"date",
            render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>
        },
        {
            title:"Amount",
            dataIndex:"amount",
        },
        {
            title:"Category",
            dataIndex:"category",
        },
        {
            title:"Refrence",
            dataIndex:"refrence",
        },
        {
            title:"Description",
            dataIndex:"description",
        },
        {
            title:" Action",
            render: (text,record) =>(
                <div>
                    <EditOutlined className='m-3' onClick={() => { setEdit(record); setShowmodel(true)}}/>
                    
                    <DeleteOutlined onClick={() => {handleDelete(record)}}/>
                </div>
            )
            
        }

    ]

    //get Treansection 
    

    useEffect(()=>{
        const getAllTransections=async()=>{
            try {
            const user = JSON.parse(localStorage.getItem("user"))
            const res = await axios.post("transection/get-Expense",{
                userid:user._id ,
                frequency,
                date,
                category
            })
            console.log(res.data)
            setAllexpense(res.data)
            } catch (error) {
            console.log({message:`error in homepage getAllTransections = ${error}`})
            }
        }
        getAllTransections()
    }, [frequency,date,category])
    
    const handleSubmit = async(values) =>{
        console.log(values)
        try {
            const user = JSON.parse(localStorage.getItem("user"))
            if(edit){
                await axios.post("transection/edit-Expense",{
                    payload:{
                        ...values ,
                        userid: user._id
                    },
                    transectionId:edit._id
                    })
                await message.success("Edit Successfully...")
                
            }
            else{
                await axios.post("transection/add-Expense",{...values , userid: user._id})
            await message.success("Transection Added Successfully...")
            setEdit(null)
            }
            
        } catch (error) {
            console.log({message:`error in homepage HandleSubmit = ${error}`})
            message.error("Transection Failed..")
        }
    }
    
    const handleDelete = async(record) =>{
        try {
            await axios.post("transection/delete-Expense",{transectionId: record._id})
            message.success("delete Successfull")
        } catch (error) {
            console.log({message:`error in homepage hadleDelete = ${error}`})
        }
    }
    return (
        <Layout>
        
        <div className='filter'>
            <div>
                <h5>Select Frequency</h5>
                <Select value={frequency} onChange={(values) => setFrequency(values) }>
                    <Select.Option value="7">Last Week</Select.Option>
                    <Select.Option value="30">Last Month</Select.Option>
                    <Select.Option value="365">Last Year</Select.Option>
                    <Select.Option value="coustom">coustom</Select.Option>
                </Select>
                {frequency === "coustom" && <RangePicker value={date} onChange={(values) => setDate(values)}/> }
            </div>
            <div>
                <h5>Select Category</h5>
                <Select value={category} onChange={(values) => setCategory(values) }>
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="income"> Income</Select.Option>
                    <Select.Option value="expense">Expense</Select.Option>
                    
                </Select>
                {frequency === "coustom" && <RangePicker value={date} onChange={(values) => setDate(values)}/> }
            </div>
            <div className='mx-2'>
                <UnorderedListOutlined  
                className='icon mx-5' onClick={() => setViewdata("table")}/>

                <AreaChartOutlined 
                className='icon mx-5' onClick={()=> setViewdata("analytics")}/>
            </div>
            <div>
                <button className='btn btn-primary' onClick={() =>  setShowmodel(true)}>Add New</button>
            </div>
        </div>
        <div className="content">
            {viewdata === "table" ? 
            (<Table columns={columme} dataSource={allexpense}/>)
            : (<Analytics allexpenses = {allexpense}/>)}
        
        </div>

        <Modal 
        title={edit ? " Edit Transection":" Add Transection"}
        open={showmodel}
        onCancel={() =>setShowmodel(false)}
        footer={false}
        >
        <Form layout='vertical' onFinish={handleSubmit} initialValues={edit}>
            <FormItem label="Date" name="date">
                <Input type='date'/>
            </FormItem>
            <FormItem label="Amount" name="amount">
                <Input type='text'/>
            </FormItem>
            <FormItem label="Category" name="category">
                <Select >
                    <Select.Option value="income">Income</Select.Option>
                    <Select.Option value="expense">Expense</Select.Option>
                </Select>
            </FormItem>
            <FormItem label="Refrence" name="refrence">
                <Select >
                    <Select.Option value="salary">Salary</Select.Option>
                    <Select.Option value="tax">Tax</Select.Option>
                    <Select.Option value="food">Food</Select.Option>
                    <Select.Option value="medical">Medical</Select.Option>
                    <Select.Option value="otherExpense">OtherExpense</Select.Option>
                    <Select.Option value="bills">Bills</Select.Option>
                </Select>
            </FormItem>
            <FormItem label="Description" name="description">
                <Input type='text'/>
            </FormItem>
            
            <div className="d-flex justify-content-end">
                <button type='submit' className='btn btn-primary'>SAVE</button>
            </div>
        </Form>
        
        </Modal>
        
        </Layout>
    )
}

export default Homepage
