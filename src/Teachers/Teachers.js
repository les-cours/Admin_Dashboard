import React from "react";
import styles from "./Teachers.module.css";
import PopupForm from "./PopupForm";
import { LoadTeachers } from "../GraphQl/Queries";
import { useQuery } from "@apollo/client";

function formatDateOfBirth(dateString) {
  const dateObject = new Date(dateString);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  return dateObject.toLocaleDateString("fr-FR", options); // ajustez 'fr-FR' pour la locale souhaitée
}

function Teachers() {
  const { loading, error, data } = useQuery(LoadTeachers);
  console.log(data);
  if (loading) return <p>جارٍ التحميل...</p>;
  if (error) return <p>حدث خطأ: {error.message}</p>;
  return (
    <div className={styles.teachers}>
      <div className={styles.teacherHeader}>
        <h2>قائمة الأساتدة</h2>
        <div>
          <PopupForm />
        </div>
      </div>
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
          {data.getTeachers.map((teacher) => (
            <tr key={teacher.teacherID}>
              <td className={styles.teacherCell}>
                <div className={styles.defaultAvatar}>
                  {teacher.avatar && teacher.avatar.includes("<svg") ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: teacher.avatar,
                      }}
                    />
                  ) : (
                    <img src={teacher.avatar} alt="Avatar" />
                  )}
                </div>
                <div className={styles.teacherInfo}>
                  <div className={styles.teacherName}>
                    {teacher.firstname} {teacher.lastname}
                  </div>
                  <div className={styles.teacherUsername}>
                    {teacher.username}
                  </div>
                </div>
              </td>
              <td>{teacher.gender === "M" ? "ذكر" : "أنثى"}</td>
              <td>{formatDateOfBirth(teacher.dateOfBirth)}</td>
              <td>{teacher.cityID}</td>
             </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teachers;
