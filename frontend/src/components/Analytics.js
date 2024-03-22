import React from 'react'
import { Progress } from "antd"

const Analytics = ({allexpenses}) => {

   
    const totalTransection = allexpenses.length;
    const incomeTransection = allexpenses.filter(transaction => transaction.category === "income" )
    const expenseTransection = allexpenses.filter(transaction => transaction.category === "expense" )
    const incomepercent = (incomeTransection.length / totalTransection) * 100;
    const expensepercent =( expenseTransection.length / totalTransection) * 100

    //total Ternover...
    const totalTernover = allexpenses.reduce((acc,transaction)=> acc+transaction.amount,0)
    const incomeTernover = allexpenses.filter((transection)=> transection.category === "income").reduce((acc,transection)=> acc + transection.amount,0)
    const expenseTernover = allexpenses.filter((transection)=> transection.category ==="expense").reduce((acc,transection)=>acc + transection.amount,0)
    
    const incomeTernoverprecent = (incomeTernover / totalTernover) * 100 
    const expenseTernoverprecent = (expenseTernover / totalTernover) * 100 
    return (
        <> 
        <div className='row m-3'>
            <div className='col-md-4'>
                <div className='card'>
                    <div className="tt card-header">
                    Total Transection : {totalTransection}
                    </div>
                    <div className="card-body">
                        <h5 className='text-success'> Income :{incomeTransection.length}</h5>
                        <h5 className='text-danger'> expense :{expenseTransection.length}</h5>
                    </div>
                    <div className='d-flex'>
                    <Progress 
                        className='mx-5' 
                        type='circle' 
                        strokeColor={" green"}
                        percent={incomepercent.toFixed(0)}
                    />
                    <Progress 
                        className='mx-5' 
                        type='circle' 
                        strokeColor={"red"}
                        percent={expensepercent.toFixed(0)}
                    />
                    </div>

                </div>
            </div>
            <div className='col-md-4'>
                <div className='card'>
                    <div className="tt card-header">
                    Total Ternover : {totalTernover}
                    </div>
                    <div className="card-body">
                        <h5 className='text-success'> Income :{incomeTernover}</h5>
                        <h5 className='text-danger'> expense :{expenseTernover}</h5>
                    </div>
                    <div className='d-flex'>
                    <Progress 
                        className='mx-5' 
                        type='circle' 
                        strokeColor={" green"}
                        percent={incomeTernoverprecent.toFixed(0)}
                    />
                    <Progress 
                        className='mx-5' 
                        type='circle' 
                        strokeColor={"red"}
                        percent={expenseTernoverprecent.toFixed(0)}
                    />
                    </div>
                </div>
            </div>
        </div>
        
        
            
        
        </>
    )
}

export default Analytics
