import React, { useEffect, useState } from 'react';
import { Container, Table, Card, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDataContext } from '../../context/context';
export default function ParentData() {
    const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { schoolCode } = useParams();
  const { getAllParents } = useDataContext();
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAllParents(schoolCode);
        if (response && response.data) {
          setParents(response.data);
        }
      } catch (err) {
        setError('حدث خطأ في تحميل بيانات اولياء الامور');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [schoolCode, getAllParents]);
  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)'
      }}>
        <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
        <h4 className="mt-3 text-primary">جاري تحميل بيانات اولياء الامور...</h4>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <h3>{error}</h3>
      </div>
    );
  }
  return (
    <Container className="mt-4" dir="rtl">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0">بيانات أولياء الامور</h3>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table striped bordered hover className="align-middle">
              <thead className="bg-light">
                <tr>
                  <th>#</th>
                  <th>اسم ولي الامر</th>
                  <th>البريد الإلكتروني</th>
                  <th>رقم الهاتف</th>
                  <th>كود الطالب</th>
                  <th>الكود المدرسي</th>
                  <th>الدور</th>
                </tr>
              </thead>
              <tbody>
                {parents.map((parents, index) => (
                  <tr key={parents._id}>
                    <td>{index + 1}</td>
                    <td>{parents.name}</td>
                    <td>{parents.email}</td>
                    <td>{parents.phone}</td>
                    <td>{parents.studentcodeinparent}</td>
                    <td>{parents.schoolCode}</td>
                    <td>{parents.role}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}