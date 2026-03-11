import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useDataContext } from '../../context/context';
import './Navbar.css';

export default function MainNavbar() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const { selectedSchool } = useDataContext();

  const handleLogout = () => {
    localStorage.removeItem('tokengeneralsupervisor');
    localStorage.removeItem('selectedSchool');
    navigate('/login');
    setExpanded(false);
  };

  const closeNav = () => {
    setExpanded(false);
  };

  // Don't render navbar if no school is selected
  if (!selectedSchool) return null;

  return (
    <Navbar 
      expand="lg" 
      className="custom-navbar" 
      expanded={expanded}
      onToggle={(expanded) => setExpanded(expanded)}
      dir="rtl"
    >
      <Container>
        <Navbar.Brand as={Link} className='fs-5'  onClick={closeNav}>
          {selectedSchool.name} - أندية القراءة المدرسية
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to={`/OneSchoolTeacherEvaluations/${selectedSchool.code}`} onClick={closeNav}>
              تقييم المعلمين
              <i className="fas fa-chalkboard-teacher me-2"></i>
            </Nav.Link>
            
            <Nav.Link as={Link} to={`/studentData/${selectedSchool.code}`} onClick={closeNav}>
              بيانات الطلاب
              <i className="fas fa-user-graduate me-2"></i>
            </Nav.Link>
            
            <Nav.Link as={Link} to={`/parentData/${selectedSchool.code}`} onClick={closeNav}>
              بيانات أولياء الأمور
              <i className="fas fa-users me-2"></i>
            </Nav.Link>
            
            <Nav.Link as={Link} to={`/AttendanceoneSchool/${selectedSchool.code}`} onClick={closeNav}>
              الحضور والغياب
              <i className="fas fa-clipboard-list me-2"></i>
            </Nav.Link>

            <NavDropdown title="المزيد" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={`/OneSchoolStusentEvaluations/${selectedSchool.code}`} onClick={closeNav}>
                تقييم الطلاب
                <i className="fas fa-user-graduate me-2"></i>
              </NavDropdown.Item>
              
              <NavDropdown.Item as={Link} to={`/OneSchoolParentEvaluations/${selectedSchool.code}`} onClick={closeNav}>
                تقييم أولياء الأمور
                <i className="fas fa-users me-2"></i>
              </NavDropdown.Item>
              
              <NavDropdown.Item as={Link} to={`/ReadingBooksNumberoneSchool/${selectedSchool.code}`} onClick={closeNav}>
                عدد الكتب المقروءة
                <i className="fas fa-book-reader me-2"></i>
              </NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} className="logout-link">
                تسجيل الخروج
                <i className="fas fa-sign-out-alt me-2"></i>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
