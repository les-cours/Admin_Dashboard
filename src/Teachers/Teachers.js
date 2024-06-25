import React from "react";
import styles from "./Teachers.module.css";
import PopupForm from "./PopupForm";

function Teachers() {
  return (
    <div className={styles.teachers}>
      <div className={styles.teacherHeader}>
        <h2>قائمة الأساتدة</h2>
        <PopupForm />
      </div>
    </div>
  );
}

export default Teachers;
