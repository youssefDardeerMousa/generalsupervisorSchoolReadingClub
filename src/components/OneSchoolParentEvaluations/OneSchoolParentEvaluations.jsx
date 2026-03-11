import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useDataContext } from '../../context/context.js';
import './oneschoolparent.css';
import { useParams } from 'react-router-dom';

export default function OneSchoolParentEvaluations() {
  const { getParentAssessments } = useDataContext();
  const { schoolCode } = useParams();  //schoolCode
  const [assessments, setAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      setIsLoading(true);
      try {
        const response = await getParentAssessments(schoolCode);
        if (response?.schoolAssessments) {
          setAssessments(response.schoolAssessments);
        } else {
          console.error('Invalid data format received:', response);
          setAssessments([]);
        }
      } catch (error) {
        console.error('Error fetching assessments:', error);
        setAssessments([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (schoolCode) {
      fetchAssessments();
    }
  }, [getParentAssessments, schoolCode]);

  const ratingFields = {
    generalBehavior: 'لاحظت تحسن في سلوك ابني العام',
    readingEnthusiasm: 'زاد حماس ابني للقراءة والمطالعة',
    readingInterests: 'تنوعت اهتمامات ابني القرائية',
    communicationSkills: 'تطورت مهاراته في التواصل',
    socialSkills: 'اكتسب ابني مهارات اجتماعية بشكل ملحوظ',
    academicPerformance: 'انعكس انضمام ابني في النادي على مستواه الدراسي في بقية المواد بشكل إيجابي',
    criticalThinking: 'تطور تفكيره العام وحسه النقدي'
  };

  const calculateAverages = (schoolData) => {
    if (!schoolData || !schoolData.assessments || schoolData.assessments.length === 0) {
      return { skillAverages: {}, overallAverage: 0 };
    }

    const skillTotals = {};
    let totalSum = 0;
    let totalCount = 0;

    Object.keys(ratingFields).forEach(field => {
      let fieldSum = 0;
      let fieldCount = 0;

      schoolData.assessments.forEach(assessment => {
        if (assessment.ratings[field] !== undefined) {
          fieldSum += assessment.ratings[field];
          fieldCount++;
          totalSum += assessment.ratings[field];
          totalCount++;
        }
      });

      skillTotals[field] = fieldCount > 0 ? (fieldSum / fieldCount).toFixed(2) : 0;
    });

    return {
      skillAverages: skillTotals,
      overallAverage: totalCount > 0 ? (totalSum / totalCount).toFixed(2) : 0
    };
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-message">جاري تحميل التقييمات...</div>
      </div>
    );
  }

  if (!assessments.length) {
    return (
      <div className="parent-evaluations">
        <Container className="evaluation-container">
          <div className="no-data-message">لا توجد تقييمات متاحة</div>
        </Container>
      </div>
    );
  }

  const schoolData = assessments[0]; // Assuming we're showing one school's data
  const { skillAverages, overallAverage } = calculateAverages(schoolData);

  return (
    <div className="parent-evaluations" dir="rtl">
      <Container className="evaluation-container">
        <Table bordered className="evaluation-table">
          <thead>
            <tr>
              <th>البيان</th>
              {schoolData.assessments.map((_, index) => (
                <th key={index}>تقييم {index + 1}</th>
              ))}
              <th>متوسط التقييم</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>كود الطالب</td>
              {schoolData.assessments.map((assessment, index) => (
                <td key={index}>{assessment.studentCode || ''}</td>
              ))}
              <td></td>
            </tr>
            <tr>
              <td>اسم الطالب</td>
              {schoolData.assessments.map((assessment, index) => (
                <td key={index}>{assessment.studentName || ''}</td>
              ))}
              
            </tr>
            <tr>
              <td>اسم ولي الأمر</td>
              {schoolData.assessments.map((assessment, index) => (
                <td key={index}>{assessment.parent || ''}</td>
              ))}
              <td>متوسط التقييم</td>
            </tr>
            {Object.entries(ratingFields).map(([field, label]) => (
              <tr key={field}>
                <td>{label}</td>
                {schoolData.assessments.map((assessment, index) => (
                  <td key={index}>{assessment.ratings[field]}</td>
                ))}
                <td>{skillAverages[field]}</td>
              </tr>
            ))}
            <tr>
              <td>متوسط المهارات</td>
              {schoolData.assessments.map((assessment, index) => (
                <td key={index}>{assessment.parentAverageRating.toFixed(2)}</td>
              ))}
              <td>{overallAverage}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
