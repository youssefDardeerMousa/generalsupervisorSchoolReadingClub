import React, { useEffect, useState } from 'react';
import { Container, Table, Card, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDataContext } from '../../context/context';

const StudentData = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { schoolCode } = useParams();
  const { getAllStudents } = useDataContext();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAllStudents(schoolCode);
        if (response && response.data) {
          setStudents(response.data);
        }
      } catch (err) {
        setError('حدث خطأ في تحميل بيانات الطلاب');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [schoolCode, getAllStudents]);

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
        <h4 className="mt-3 text-primary">جاري تحميل بيانات الطلاب...</h4>
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
          <h3 className="mb-0">بيانات الطلاب</h3>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            <Table striped bordered hover className="align-middle">
              <thead className="bg-light">
                <tr>
                  <th>#</th>
                  <th>اسم الطالب</th>
                  <th>البريد الإلكتروني</th>
                  <th>كود الطالب</th>
                  <th>الكود المدرسي</th>
                  <th>الصف</th>
                  <th>الدور</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student._id}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.studentCode}</td>
                    <td>{student.schoolCode}</td>
                    <td>{student.grade}</td>
                    <td>{student.role}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default StudentData;