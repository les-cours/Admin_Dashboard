import React from 'react'
import styles from "./Teachers.module.css"
import PopupForm from './PopupForm'

function Teachers() {
  return (
    <div className={styles.teachers}>
       <div className={styles.teacherHeader}>
        <h1>قائمة الأساتدة</h1>
        <PopupForm/>
      </div>
    </div>
  )
}

export default Teachers