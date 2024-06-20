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
