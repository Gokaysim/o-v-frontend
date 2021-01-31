import {AutoComplete, InputNumber, Row, Col, DatePicker, Typography, Button, Checkbox} from "antd";
import debounce from  'lodash.debounce';
import {useState,useCallback,useMemo} from 'react';

const { Title } = Typography;

const callback = debounce((val,onResult)=>{
    fetch(`http://localhost:3001/ports?portName=${val}`)
        .then((resp)=>resp.json())
        .then((data)=>{
        onResult(data.map(item=>{
            return {
                label:`${item.portName}(${item.facilityName})`,
                value:item.id,
            }
        }),data);
    })
},1000)

export default ({port,setPort,setShips})=>{
    const [startDate,setStartDate] = useState(null);
    const [endDate,setEndDate] = useState(null);
    const [distance,setDistance] = useState(null);
    const [includeIdleVessels,setIncludeIdleVessels] = useState(false);
    const [options,setOptions]=useState([])
    const [allValues,setAllValues] = useState([]);
    const[loading,setLoading] = useState(false);
    const [value,setValue] = useState('');
    const onSearch = useCallback((value)=>{
        callback(value,(ops,data)=>{
            setOptions(ops);
            setAllValues(data);
        })
    },[])
    const onSelect = useCallback((value,option)=>{
        setValue(option.label)
        setPort(allValues.find(item=>item.id === option.value))
    },[allValues]);
    const search = useCallback(()=>{
        if(!loading){
            setLoading(true);
            fetch(`http://localhost:3001/ais?port=${port.id}&startDate=${startDate}&endDate=${endDate}&includeIdleVessels=${includeIdleVessels}&distance=${distance}`)
                .then(resp=>resp.json())
                .then(data=>{
                    setShips(data);
                    setLoading(false);
                }).catch(()=>{
                    setLoading(false);
            });
        }
    },[loading,port,startDate,includeIdleVessels,distance,endDate]);

    const disabled = useMemo(()=>{
        return !distance||!startDate||!endDate||!port
    },[distance,startDate,endDate,port])
    return <div className="legend">
        <InputNumber
            style={{ width: 300,marginBottom:"1rem",textAlign: "left"}}
            value={distance} onChange={(e)=>setDistance(e)} placeholder={"Distance(km)"}
            precision={2}
            />

            <Row gutter={8} >
                <Col span={12}>
                    <DatePicker placeholder="Start Date" style={{ width: 146}} value={startDate} onChange={(e)=>setStartDate(e)} />
                </Col>
                <Col span={12}>
                    <DatePicker placeholder="End Date" style={{ width: 146}} value={endDate} onChange={(e)=>setEndDate(e)} />
                </Col>
            </Row>
        <AutoComplete options={options}
                      value={value}
                      onChange={(e)=>setValue(e)}
                      placeholder="Port"
                      allowClear
                      style={{ width: 300,marginTop:"1rem",textAlign: "left"}}
                      onSearch={onSearch}
                      onSelect={onSelect}
        />
        <Row>
            <Col>
                <Checkbox style={{marginTop:'1rem',marginBottom:"1rem"}} checked={includeIdleVessels} onChange={(e)=>setIncludeIdleVessels(!includeIdleVessels)}>
                    include idle vessels {includeIdleVessels}
                </Checkbox>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Button loading={loading} onClick={search} style={{width:"100%"}} type="primary" disabled={disabled}>Search</Button>
            </Col>
        </Row>
    </div>
}
