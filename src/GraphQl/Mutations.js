import { gql } from "@apollo/client";

export const InviteTeachers = gql`
  mutation InviteTeacher($email: String!, $subjects: [String!]!) {
    inviteTeacher(in: { email: $email, subjects: $subjects }) {
      succeeded
    }
  }
`;
