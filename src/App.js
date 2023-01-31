import React, {useState, useEffect, useRef} from 'react';
import {generateUpcomingDates} from 'aws-cron-expression-validator'
import {Button, Space, Input, List, Card, Row, Col, Alert} from 'antd'
import {GithubOutlined} from '@ant-design/icons'
import 'antd/dist/reset.css';
import './App.css';

function App() {
    const minuteRef = useRef()
    const hourRef = useRef()
    const dayOfMonth = useRef()
    const monthRef = useRef()
    const dayOfWeekRef = useRef()
    const yearRef = useRef()
    const inputs = [{
        name: 'Minutes',
        ref: minuteRef
    }, {
        name: 'Hours',
        ref: hourRef
    }, {
        name: 'Day of month',
        ref: dayOfMonth
    }, {
        name: 'Month',
        ref: monthRef
    }, {
        name: 'Day of week',
        ref: dayOfWeekRef
    }, {
        name: 'Year',
        ref: yearRef
    }]
    const [cronExpression, setCronExpression] = useState('')
    const [results, setResults] = useState([])
    const [error, setError] = useState('')
    useEffect(() => {
        if (!cronExpression) return
        setError('')
        try {
            const dates = generateUpcomingDates(cronExpression)
            setResults(dates.map(d => d.toString()))
        } catch (error) {
            setError(error.message)
        }
    }, [cronExpression])

    return (
        <div className="App">
            <Space size={'large'} align={'center'}>
                <Card title={
                    <>
                        <h3>Cron Expression</h3>
                        <h5>Define the cron expression for validation</h5>
                    </>
                } actions={[
                    <Button type="primary" onClick={() => {
                        const result = inputs.map(i => i.ref.current.input.value.trim()).join(' ')
                        setCronExpression(result)
                    }}>
                        Submit
                    </Button>,
                    <Button type={'link'} href={'https://github.com/gharibyan/aws-cron-events-show'}
                            icon={<GithubOutlined/>}/>
                ]}>
                    <Input.Group size="large">
                        <Row gutter={12} align={'center'}>
                            {inputs.map((val, key) => {
                                return (
                                    <Col key={key} span={2}>
                                        <Input ref={val.ref} placeholder={val.name}/>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Input.Group>
                    <br/>
                    {error && <Alert message={error} type="error"/>}
                    {results.length > 0 && <List
                        header={<h3>Next 10 scheduled dates</h3>}
                        bordered
                        dataSource={results}
                        renderItem={(item) => (
                            <List.Item>
                                {item}
                            </List.Item>
                        )}
                    />}
                </Card>
            </Space>
        </div>
    );
}

export default App;
