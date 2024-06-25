import React from "react";
import { useQuery, gql } from "@apollo/client";
import styles from "./Students.module.css";

const GET_STUDENTS = gql`
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
    }
  }
`;
function formatDateOfBirth(dateString) {
  const dateObject = new Date(dateString);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  return dateObject.toLocaleDateString('fr-FR', options); // ajustez 'fr-FR' pour la locale souhaitée
}

function Students() {
  const { loading, error, data } = useQuery(GET_STUDENTS, {
    variables: { filterType: "all", filterValue: "" },
  });

  if (loading) return <p>جارٍ التحميل...</p>;
  if (error) return <p>حدث خطأ: {error.message}</p>;

  return (
    <div className={styles.students}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>الطالب</th>
            <th>الجنس</th>
            <th>تاريخ الميلاد</th>
            <th>معرف المدينة</th>
          </tr>
        </thead>
        <tbody>
          {data.students.map((student) => (
            <tr key={student.studentId}>
              <td className={styles.studentCell}>
                <div className={styles.defaultAvatar}>
                  {student.defaultAvatar &&
                  student.defaultAvatar.includes("<svg") ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: student.defaultAvatar,
                      }}
                    />
                  ) : (
                    <img src={student.defaultAvatar} alt="Avatar" />
                  )}
                </div>
                <div className={styles.studentInfo}>
                  <div className={styles.studentName}>
                    {student.firstname} {student.lastname}
                  </div>
                  <div className={styles.studentUsername}>
                    {student.username}
                  </div>
                </div>
              </td>
              <td>
                {student.gender =="M"? "ذكر":"أنثى"}
               </td>
              <td>{formatDateOfBirth(student.dateOfBirth)}</td>
              <td>{student.cityId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;
