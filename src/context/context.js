import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const DataContext = createContext();

export function DataContextFunction({ children }) {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [teacherRatings, setTeacherRatings] = useState([]);
  const [teacherRatingsLoading, setTeacherRatingsLoading] = useState(false);
  const [teacherRatingsError, setTeacherRatingsError] = useState(null);

  const fetchSchools = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://schoolreadingclubs.vercel.app/api/school');
      if (response.data.success) {
        setSchools(response.data.data);
      }
    } catch (err) {
      setError('حدث خطأ في تحميل بيانات المدارس');
      console.error('Error fetching schools:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectSchool = (school) => {
    setSelectedSchool(school);
    localStorage.setItem('selectedSchool', JSON.stringify(school));
  };

  const getTeacherRatings = useCallback(async (schoolCode) => {
    setTeacherRatingsLoading(true);
    setTeacherRatingsError(null);
    try {
      const response = await axios.get(
        `https://schoolreadingclubs.vercel.app/api/RateTeacher/oneschool/${schoolCode}/Teachersratings`
      );
      setTeacherRatings(response.data);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'حدث خطأ في تحميل تقييمات المعلمين';
      setTeacherRatingsError(errorMessage);
      console.error('Error fetching teacher ratings:', error);
      return null;
    } finally {
      setTeacherRatingsLoading(false);
    }
  }, []);

  const getStudentBookRatings = useCallback(async (schoolCode) => {
    try {
      const response = await axios.get(
        `https://schoolreadingclubs.vercel.app/api/RateingStudentBook/RateingStudentBookbyschoolcode/${schoolCode}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching student book ratings:', error);
      return null;
    }
  }, []);

  const getStudentSelfAssessments = useCallback(async (schoolCode) => {
    try {
      const response = await axios.get(
        `https://schoolreadingclubs.vercel.app/api/StudentSelfAssessment/oneschool/${schoolCode}/StudentsSelfAssessments`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching student self assessments:', error);
      return null;
    }
  }, []);

  const getReadingClubEvaluations = useCallback(async (schoolCode) => {
    try {
      const response = await axios.get(
        `https://schoolreadingclubs.vercel.app/api/ReadingClubEvaluation/oneschool/${schoolCode}/ReadingClubEvaluations`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching reading club evaluations:', error);
      return null;
    }
  }, []);

  const getParentAssessments = useCallback(async (schoolCode) => {
    try {
      const response = await axios.get(`https://schoolreadingclubs.vercel.app/api/ParentAssessment/parentAssessmentsByschoolCode/${schoolCode}/parentAssessments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching parent assessments:', error);
      return null;
    }
  }, []);

  const getSchoolAttendance = useCallback(async (schoolCode) => {
    try {
   

      const response = await axios.get(`https://schoolreadingclubs.vercel.app/api/RateTeacher/attendance/oneschool/${schoolCode}`, {
       
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching school attendance:', error);
      return null;
    }
  }, []);

  const getUniqueSchoolBooks = useCallback(async (schoolCode) => {
    try {
      const response = await axios.get(`https://schoolreadingclubs.vercel.app/api/RateingStudentBook/uniquebooksoneschool/${schoolCode}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching unique books:', error);
      return null;
    }
  }, []);

  const getAllStudents = useCallback(async (schoolCode) => {
    try {
      const response = await axios.get(`https://schoolreadingclubs.vercel.app/api/student/Allstudents/${schoolCode}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      return null;
    }
  }, []);

  const getAllParents = useCallback(async (schoolCode) => {
    try {
      const response = await axios.get(`https://schoolreadingclubs.vercel.app/api/parent/AllParents/${schoolCode}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching parents:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    // Try to get selected school from localStorage on initial load
    const savedSchool = localStorage.getItem('selectedSchool');
    if (savedSchool) {
      setSelectedSchool(JSON.parse(savedSchool));
    }
  }, []);

  return (
    <DataContext.Provider 
      value={{
        schools,
        loading,
        error,
        selectedSchool,
        fetchSchools,
        selectSchool,
        // Teacher ratings related values
        teacherRatings,
        teacherRatingsLoading,
        teacherRatingsError,
        getTeacherRatings,
        getStudentBookRatings,
        getStudentSelfAssessments,
        getReadingClubEvaluations,
        getParentAssessments,
        getSchoolAttendance,
        getUniqueSchoolBooks,
        getAllStudents,
        getAllParents
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataContextFunction');
  }
  return context;
};
