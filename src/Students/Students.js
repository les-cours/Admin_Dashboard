import React from "react";
import styles from "./Students.module.css";
function Students() {
  return (
    <div className={styles.students}>
      <table>
        <tr>
          <th>الاسم</th>
          <th>اللقب</th>
          <th>تاريخ الميلاد</th>
          <th>الجنس</th>
          <th>الوضه</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
        <tr>
          <td>Centro comercial Moctezuma</td>
          <td>Francisco Chang</td>
          <td>Mexico</td>
        </tr>
      </table>
    </div>
  );
}

export default Students;
