import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Modal,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalVariant, setModalVariant] = useState("success");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // https://schoolreadingclubs.vercel.app/
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://schoolreadingclubs.vercel.app/api/GeneralSupervisor/login",
        {
          email,
          password,
        },
      );

      localStorage.setItem("tokengeneralsupervisor", response.data.token);
      setModalVariant("success");
      setModalMessage(response.data.message);
      setShowModal(true);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setModalVariant("danger");
      setModalMessage(
        error.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول",
      );
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/ChangeSupervisorPassword");
  };

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={8} lg={6} xl={5}>
            <div className="text-center mb-4">
              <h1 className="welcome-text">لوحة تحكم المشرف العام</h1>
              <h2 className="sub-text">أندية القراءة المدرسية</h2>
            </div>
            <Card className="login-card">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="login-icon">
                    <i className="fas fa-user-shield"></i>
                  </div>
                  <h3 className="login-title">تسجيل الدخول</h3>
                </div>
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-4">
                    <Form.Label>البريد الإلكتروني</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        dir="rtl"
                        className="custom-input"
                        placeholder="أدخل البريد الإلكتروني"
                      />
                      <span className="input-group-text">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>كلمة المرور</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        dir="rtl"
                        className="custom-input"
                        placeholder="أدخل كلمة المرور"
                      />
                      <span className="input-group-text">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mb-3 login-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        جاري تسجيل الدخول...
                      </>
                    ) : (
                      "تسجيل الدخول"
                    )}
                  </Button>

                  <div className="text-center">
                    <Button
                      variant="link"
                      onClick={handleForgotPassword}
                      className="forgot-password-link"
                    >
                      هل نسيت كلمة المرور؟
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modalVariant === "success" ? "نجاح" : "خطأ"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className={`text-${modalVariant}`}>{modalMessage}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>
     
    </div>
  );
}
