import React, { useState, useEffect, useRef } from 'react';
import { generateUpcomingDates } from 'aws-cron-expression-validator'
import { Button, Space, Input, List, Typography, Card } from "antd";
import 'antd/dist/reset.css';
import './App.css';

function App() {
  const ref = useRef()
  const [cronExpression, setCronExpression] = useState('0 12 ? * MON-FRI *')
  const [results, setResults] = useState([])
  const [error, setError] = useState('')
  useEffect(()=>{
    console.log(cronExpression)
    if(!cronExpression) return
    setError('')
    try{
      const dates = generateUpcomingDates(cronExpression)
      console.log(dates)
      setResults(dates)
    }
    catch(error){
      console.log(error)
      setError(error.message)
    }
  }, [cronExpression])

  return (
    <div className="App">
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: 'flex',
        }}
      >
        <Card>
        <p>
          <Input ref={ref} defaultValue={cronExpression} placeholder="0 12 ? * MON-FRI *" /></p>
        <p>
            <Button type="primary" onClick={(e)=>{
              setCronExpression(ref.current.input.value)
            }}>
              Submit
            </Button>
        </p>
        </Card>
        <Card>
        {error &&  <Typography.Text type="danger">{error}</Typography.Text>}
        {results.length > 0 && <List
          bordered
          dataSource={results}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />}
        </Card>
      </Space>
    </div>
  );
}

export default App;
