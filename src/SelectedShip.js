import { Typography, Row, Col } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default ({ selectedShip, setSelectedShip }) => {
  if (!selectedShip) {
    return null;
  }
  return (
    <div className="selected-ship">
      <div style={{ width: 300, textAlign: "left" }}>
        <Row justify="space-between">
          <Col>
            <Title level={4}>Selected Ship</Title>
          </Col>
          <Col>
            <CloseOutlined
              width="2em"
              height="2em"
              onClick={() => setSelectedShip(null)}
            />
          </Col>
        </Row>
        <div>MMSI: {selectedShip.MMSI}</div>
        <div>date: {selectedShip.date}</div>
        <div>name: {selectedShip.name}</div>
        <div>type: {selectedShip.type}</div>
        <div>dest: {selectedShip.dest}</div>
        <div>ETA: {selectedShip.ETA}</div>
        <div>idle: {selectedShip.idle.toString()}</div>
        <div>
          Dest Port: {selectedShip.Port ? selectedShip.Port.portName : "-"}
        </div>
      </div>
    </div>
  );
};
