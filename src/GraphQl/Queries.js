import { gql } from "@apollo/client";

export const LoadSubjects = gql`
  query LoadGrades($schoolID: String!) {
    school(schoolID: $schoolID) {
      arabicTitle
      grades {
        arabicTitle
        subjects {
          subjectID
          arabicTitle
        }
      }
    }
  }
`;
export const LoadStudents = gql`
  query Students($filterType: String!, $filterValue: String!) {
    students(in: { filterType: $filterType, filterValue: $filterValue }) {
      studentId
      username
      firstname
      lastname
      gender
      dateOfBirth
      defaultAvatar
      cityId
      status
    }
  }
`;
export const LoadTeachers = gql`
query{getTeachers{
  teacherID
  cityID
  firstname
  lastname
  username
  gender
  dateOfBirth
  description
  avatar
  email
}}
`
 