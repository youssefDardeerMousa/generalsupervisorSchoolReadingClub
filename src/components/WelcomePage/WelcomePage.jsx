import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDataContext } from '../../context/context.js';
import './WelcomePage.css';

export default function WelcomePage() {
  const { schools, loading, error, fetchSchools, selectSchool } = useDataContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSchools();
  }, []);

  const handleSchoolSelect = (school) => {
    selectSchool(school);
    navigate(`/OneSchoolTeacherEvaluations/${school.code}`);
  };

  if (loading) {
    return (
      <div className="welcome-loading">
        <Spinner animation="border" variant="primary" />
        <p>جاري تحميل بيانات المدارس...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="welcome-error">
        <i className="fas fa-exclamation-circle"></i>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="welcome-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6} className="text-center mb-4">
            <h1 className="welcome-title">مرحباً بك في نظام أندية القراءة المدرسية</h1>
            <p className="welcome-subtitle">الرجاء اختيار المدرسة للمتابعة</p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {schools.map((school) => (
            <Col key={school._id} xs={12} sm={6} md={4} lg={3}>
              <Card 
                className="school-card" 
                onClick={() => handleSchoolSelect(school)}
              >
                <Card.Body>
                  <div className="school-icon">
                    <i className="fas fa-school"></i>
                  </div>
                  <Card.Title>{school.name}</Card.Title>
                  <Card.Text>
                    كود المدرسة: {school.code}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      
    </div>
  );
}